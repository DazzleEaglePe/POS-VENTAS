// Helper to trigger an admin approval request via optional HTTP endpoint (currently disabled)
// export async function requestAdminApproval({ id_auth, email }) {
//   try {
//     const endpoint = import.meta?.env?.VITE_ACCESS_APPROVAL_ENDPOINT;
//     const toEmail = import.meta?.env?.VITE_ADMIN_APPROVAL_EMAIL;
//     const anonKey = import.meta?.env?.VITE_APP_SUPABASE_ANON_KEY;
//     try { localStorage.setItem('sb_approval_pending', '1'); } catch (e) { /* ignore */ }
//     if (!endpoint || !toEmail) return { ok: true, skipped: true };
//     const res = await fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         ...(anonKey ? { Authorization: `Bearer ${anonKey}`, apikey: anonKey } : {}),
//       },
//       keepalive: true,
//       body: JSON.stringify({ id_auth, email, to: toEmail }),
//     });
//     if (!res.ok) {
//       try {
//         const text = await res.text();
//         console.warn('admin-approval request failed', res.status, text);
//         return { ok: false, status: res.status, body: text };
//       } catch {
//         return { ok: false, status: res.status };
//       }
//     }
//     return { ok: true };
//   } catch (e) {
//     return { ok: false, error: e?.message };
//   }
// }
// Helper to trigger an admin approval request via optional HTTP endpoint
export async function requestAdminApproval({ id_auth, email }) {
  try {
    const endpoint = import.meta?.env?.VITE_ACCESS_APPROVAL_ENDPOINT;
    const toEmail = import.meta?.env?.VITE_ADMIN_APPROVAL_EMAIL;
  const anonKey = import.meta?.env?.VITE_APP_SUPABASE_ANON_KEY;
    // Store a local flag so UI can show a message on next render
    try { localStorage.setItem('sb_approval_pending', '1'); } catch (e) { /* ignore */ }
    if (!endpoint || !toEmail) return { ok: true, skipped: true };
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Supabase Functions require an Authorization (anon) header
        ...(anonKey ? { Authorization: `Bearer ${anonKey}`, apikey: anonKey } : {}),
      },
      // Allow request to finish even if the page navigates due to signOut
      keepalive: true,
      body: JSON.stringify({ id_auth, email, to: toEmail }),
    });
    if (!res.ok) {
      try {
        const text = await res.text();
        // eslint-disable-next-line no-console
        console.warn('admin-approval request failed', res.status, text);
        return { ok: false, status: res.status, body: text };
      } catch {
        return { ok: false, status: res.status };
      }
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e?.message };
  }
}
