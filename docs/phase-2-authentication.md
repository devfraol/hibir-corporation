# Phase 2: authentication and administrator foundation

## Architecture

The browser uses the existing singleton Supabase client with only `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. `AuthProvider` owns the Supabase session lifecycle: it reads the initial session, subscribes to auth changes (including refresh and sign-out), and clears application state on logout. No password, token, or role is written to custom browser storage.

## Login and authorization

`/admin/login` supports email/password only and calls `supabase.auth.signInWithPassword()`. There is no registration route or browser-side user provisioning. After authentication, the provider queries `admin_profiles` by the authenticated user's `user_id`, never by email or user metadata. Access requires a profile with `active = true` and one of `super_admin`, `admin`, or `editor`; any other authenticated user is signed out immediately and remains on the login page with an authorization error.

## Roles and routes

Role capabilities are centralized in `src/lib/admin.ts`. `super_admin` has future user and content capabilities; `admin` and `editor` have future content capabilities only. The role is display/capability data, not a client-editable value.

`ProtectedAdminRoute` guards `/admin` and all nested routes for user experience. It retains the requested administrator URL through login. Active administrators visiting `/admin/login` return to `/admin`. The admin layout provides sidebar, top bar, dashboard, placeholders for future CMS sections, and Supabase `signOut()` logout. Database RLS is the authorization boundary.

## RLS change

Migration `20260921000000_phase_2_auth_and_admin_rls.sql` adds exactly one policy: authenticated users can select only their own `admin_profiles` record where `user_id = auth.uid()`. It adds no browser insert, update, or delete policy. Consequently, users cannot create profiles, self-promote, change roles, or deactivate/reactivate accounts from the application.

## First administrator provisioning

1. In **Supabase Dashboard → Authentication → Users**, create the email/password user.
2. Using a trusted server-side/admin-controlled connection (Dashboard SQL editor or a reviewed server tool using the service role), insert the matching `admin_profiles` row with that Auth user's UUID, approved email, active status, and role.
3. Do not put service-role credentials in Vite variables, source code, or Git. Do not run this insertion from the browser.

## Security considerations

- The Vite client contains only the publishable key; no secret/service-role key is added.
- Supabase manages session persistence and refresh; the application adds no custom token storage.
- Authorization uses the protected profile relationship and `auth.uid()`, not metadata, URL values, or local storage.
- Inactive and non-admin accounts are explicitly signed out, while RLS prevents them from reading admin profile data.

## Testing

Unit tests cover login rendering/validation, invalid credentials, unauthenticated route denial, active-admin route access, and logout navigation. The profile query and RLS are intentionally not tested against live credentials; validate the deployed migration with separate authorized and non-admin Supabase users before release.

## Remaining Phase 3 work

Implement the News and Projects CMS behind new, narrowly scoped role-based write policies, then add media/company modules only when their authorization and validation requirements are defined. Do not add user-management UI without a server-side trusted provisioning and role-management design.
