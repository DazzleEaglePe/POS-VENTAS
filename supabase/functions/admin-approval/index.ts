// @ts-nocheck
// Supabase Edge Function: admin-approval
// - POST /admin-approval: { id_auth, email, to }
//   Creates a pending access request and sends an email to admin with approve/deny links.
// - GET  /admin-approval?token=...&action=approve|deny
//   Validates the token and updates the request status. Optionally auto-creates user on approve.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Support both SB_* and SUPABASE_* env var names for flexibility
const SB_URL = Deno.env.get("SB_URL") || Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SERVICE_ROLE_KEY") || Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
if (!SB_URL || !SERVICE_ROLE_KEY) {
  throw new Error("Missing SB_URL/SUPABASE_URL or SERVICE_ROLE_KEY/SUPABASE_SERVICE_ROLE_KEY env secrets");
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("APPROVAL_FROM_EMAIL") || "no-reply@yourdomain.com";
const APPROVAL_PUBLIC_BASE_URL = Deno.env.get("APPROVAL_PUBLIC_BASE_URL") || "http://localhost:54321/functions/v1/admin-approval";
const APPROVAL_AUTO_CREATE_USER = (Deno.env.get("APPROVAL_AUTO_CREATE_USER") || "false").toLowerCase() === "true";

const supabase = createClient(SB_URL, SERVICE_ROLE_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, x-client-info, content-type",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "content-type": "application/json",
};

type ReqBody = { id_auth?: string; email?: string; to?: string };

function json(body: unknown, status = 200, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, ...extraHeaders } });
}

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!RESEND_API_KEY) return { ok: true, skipped: true };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

serve(async (req) => {
  try {
    const { method, url } = req;
    const u = new URL(url);

    if (method === "OPTIONS") {
      return new Response("ok", { status: 200, headers: corsHeaders });
    }

    if (method === "GET") {
      const token = u.searchParams.get("token");
      const action = u.searchParams.get("action");
      if (!token || !action || !["approve", "deny"].includes(action)) {
        return json({ error: "invalid params" }, 400);
      }
      const { data, error } = await supabase
        .from("access_requests")
        .select("id, user_id, email, status, expires_at")
        .eq("token", token)
        .single();
      if (error || !data) return json({ error: "invalid token" }, 404);
      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        return json({ error: "token expired" }, 410);
      }
      const status = action === "approve" ? "approved" : "denied";
      const { error: updErr } = await supabase
        .from("access_requests")
        .update({ status })
        .eq("id", data.id);
      if (updErr) return json({ error: updErr.message }, 500);

      // Optionally auto-create row in public.usuarios when approved
      if (status === "approved" && APPROVAL_AUTO_CREATE_USER) {
        const { data: exists, error: existsErr } = await supabase
          .from("usuarios")
          .select("id_auth")
          .eq("id_auth", data.user_id)
          .maybeSingle();
        if (!existsErr && !exists) {
          const today = new Date().toISOString().slice(0, 10);
          await supabase.from("usuarios").insert({
            id_auth: data.user_id,
            correo: data.email,
            estado: "ACTIVO",
            tema: "dark",
            fecharegistro: today,
          });
        }
      }

      return new Response(`Solicitud ${status}. Ya puedes cerrar esta ventana.`, { status: 200, headers: corsHeaders });
    }

    if (method === "POST") {
      const body = (await req.json()) as ReqBody;
      const { id_auth, email, to } = body;
      if (!id_auth || !email || !to) return json({ error: "missing fields" }, 400);

      const token = crypto.randomUUID();
      const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      const { error: insErr } = await supabase.from("access_requests").insert({
        user_id: id_auth,
        email,
        token,
        status: "pending",
        expires_at,
      });
      if (insErr) return json({ error: insErr.message }, 500);

      const approveUrl = `${APPROVAL_PUBLIC_BASE_URL}?token=${token}&action=approve`;
      const denyUrl = `${APPROVAL_PUBLIC_BASE_URL}?token=${token}&action=deny`;

      const subject = `Solicitud de acceso: ${email}`;
      const html = `
        <div>
          <p>El usuario <b>${email}</b> solicita acceso.</p>
          <p>
            <a href="${approveUrl}">Aprobar</a> |
            <a href="${denyUrl}">Denegar</a>
          </p>
          <p>Token: ${token}</p>
        </div>
      `;
      const resp = await sendEmail({ to, subject, html });
      return json({ ok: true, email: resp });
    }

    return json({ error: "method not allowed" }, 405);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
