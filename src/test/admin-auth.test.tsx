import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import AdminLogin from "@/pages/admin/AdminLogin";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";

const auth = {
  user: null, session: null, adminProfile: null, loading: false, isAuthenticated: false, isAdmin: false, role: null,
  signIn: vi.fn(), signOut: vi.fn(), refreshProfile: vi.fn(),
};
vi.mock("@/contexts/AuthContext", () => ({ useAuth: () => auth }));

const profile = { id: "profile", user_id: "user", full_name: "Aster Hibir", email: "aster@example.com", role: "editor" as const, avatar_url: null, active: true, created_at: "", updated_at: "" };

describe("administrator authentication routes", () => {
  it("renders the login page and validates credentials before submitting", async () => {
    auth.signIn.mockReset();
    render(<MemoryRouter><AdminLogin /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "Welcome back" })).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid email address");
    expect(auth.signIn).not.toHaveBeenCalled();
  });

  it("shows an invalid-credentials error returned by Supabase Auth", async () => {
    auth.signIn.mockResolvedValueOnce({ error: "Invalid login credentials" });
    render(<MemoryRouter><AdminLogin /></MemoryRouter>);
    await userEvent.type(screen.getByLabelText("Email"), "admin@example.com");
    await userEvent.type(screen.getByLabelText("Password"), "wrong-password");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Invalid login credentials");
  });

  it("redirects unauthenticated visitors away from /admin", async () => {
    Object.assign(auth, { loading: false, isAdmin: false });
    render(<MemoryRouter initialEntries={["/admin"]}><Routes><Route element={<ProtectedAdminRoute />}><Route path="/admin" element={<p>Private</p>} /></Route><Route path="/admin/login" element={<p>Login</p>} /></Routes></MemoryRouter>);
    expect(await screen.findByText("Login")).toBeInTheDocument();
  });

  it("allows an active administrator to access the dashboard", () => {
    Object.assign(auth, { loading: false, isAdmin: true, adminProfile: profile, session: { user: { email: profile.email } } });
    render(<MemoryRouter initialEntries={["/admin"]}><Routes><Route element={<ProtectedAdminRoute />}><Route path="/admin" element={<AdminLayout />}><Route index element={<p>Dashboard</p>} /></Route></Route></Routes></MemoryRouter>);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Aster Hibir")).toBeInTheDocument();
  });

  it("takes the user to the login page after logout", async () => {
    auth.signOut.mockResolvedValueOnce({});
    render(<MemoryRouter initialEntries={["/admin"]}><Routes><Route path="/admin" element={<AdminLayout />}><Route index element={<p>Dashboard</p>} /></Route><Route path="/admin/login" element={<p>Login</p>} /></Routes></MemoryRouter>);
    await userEvent.click(screen.getAllByRole("button", { name: "Sign out" })[0]);
    await waitFor(() => expect(screen.getByText("Login")).toBeInTheDocument());
  });
});
