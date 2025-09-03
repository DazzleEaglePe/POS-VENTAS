# Admin Approval Function (Supabase Edge)

This function provides a minimal admin-approval gate for new users.

## Endpoints
- POST /admin-approval { id_auth, email, to } → creates a pending request and emails admin with approve/deny links.
- GET  /admin-approval?token=...&action=approve|deny → updates the request status.

## Deploy
1. Create table and RLS:
```sql
create table if not exists public.access_requests (
  id bigserial primary key,
  user_id text not null,
  email text not null,
  token text not null unique,
  status text not null default 'pending', -- pending | approved | denied
  expires_at timestamptz null,
  created_at timestamptz not null default now()
);
-- Optional RLS (edge function uses service role key)
alter table public.access_requests enable row level security;
```

2. Set env vars in the Edge Function (PowerShell examples)
The Supabase CLI no longer allows secret names starting with `SUPABASE_`. Use these instead:
- `SB_URL` (was SUPABASE_URL)
- `SERVICE_ROLE_KEY` (was SUPABASE_SERVICE_ROLE_KEY)
- `RESEND_API_KEY` (optional)
- `APPROVAL_FROM_EMAIL` (e.g., approvals@yourdomain.com)
- `APPROVAL_PUBLIC_BASE_URL` (e.g., https://PROJECT.functions.supabase.co/admin-approval)
 - `APPROVAL_AUTO_CREATE_USER` (optional: `true|false`) → if true, creates a row in `public.usuarios` on approve

```powershell
supabase secrets set `
  SB_URL="https://<PROJECT_REF>.supabase.co" `
  SERVICE_ROLE_KEY="<YOUR_SERVICE_ROLE_KEY>" `
  APPROVAL_PUBLIC_BASE_URL="https://<PROJECT_REF>.functions.supabase.co/admin-approval"

# Optional email sending (Resend)
supabase secrets set `
  RESEND_API_KEY="<YOUR_RESEND_API_KEY>" `
  APPROVAL_FROM_EMAIL="approvals@yourdomain.com"
 
# Optional: auto-create internal user record upon approval
supabase secrets set `
  APPROVAL_AUTO_CREATE_USER="true"
```
```

3. Deploy with Supabase CLI:
```powershell
supabase functions deploy admin-approval
```

4. Configure your frontend .env:
```env
VITE_2FA_MODE=admin_approval
VITE_ADMIN_APPROVAL_EMAIL=admin@empresa.com
VITE_ACCESS_APPROVAL_ENDPOINT=https://PROJECT.functions.supabase.co/admin-approval
```

5. Approvals
- Admin receives an email with Approve/Deny links.
- Once approved, ensure your app treats the user as existing/active so the gate allows login.

## Notes
- Email sending uses Resend API; replace with your ESP if needed.
- You may add a trigger to auto-create the user record upon approval.