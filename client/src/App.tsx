import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import authApi from "./api/authApi";
import SidebarComp from "./components/SidebarComp";
import { SidebarProvider } from "@/components/ui/sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Navbar from "./components/Navbar";
import AdminStores from "./pages/admin/AdminStores";
import AdminUsers from "./pages/admin/AdminUsers";
import Settings from "./pages/Settings";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import UserDashboard from "./pages/user/userDashboard";
function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [auth, setAuth] = useState<boolean | null>(null);
  const [role, setRole] = useState<string>("");
  const [id, setId] = useState<number>(0);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const rolecheck = await authApi.checkAuth();
        setRole(rolecheck.role);
        setId(rolecheck.id);
        console.log(rolecheck);
        setAuth(true);
        setLoading(false);
      } catch {
        setLoading(false);
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <SidebarProvider>
      <BrowserRouter>
        <main className="w-full h-dvh flex min-w-0">
          {!loading && auth === true && role && (
            <SidebarComp role={role} setAuth={setAuth} />
          )}
          <div className="h-full flex-1 min-w-0">
            <Navbar auth={auth} />
            <Routes>
              {loading && auth === null && null}

              {auth === false && (
                <>
                  <Route
                    path="/login"
                    element={
                      <Login
                        setAuth={setAuth}
                        setRole={setRole}
                        setId={setId}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={<Register setAuth={setAuth} setRole={setRole} />}
                  />
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              )}
              {auth === true && role === "ADMIN" && (
                <>
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/stores" element={<AdminStores />} />
                  <Route path="/admin/users" element={<AdminUsers />} />
                  <Route
                    path="*"
                    element={<Navigate to="/admin/dashboard" />}
                  />
                </>
              )}
              {auth === true && role == "OWNER" && (
                <>
                  <Route path="/owner/dashboard" element={<OwnerDashboard />} />
                  <Route
                    path="*"
                    element={<Navigate to="/owner/dashboard" />}
                  />
                </>
              )}
              {auth === true && role == "USER" && (
                <>
                  <Route
                    path="/user/dashboard"
                    element={<UserDashboard currentId={id} />}
                  />
                  <Route path="*" element={<Navigate to="/user/dashboard" />} />
                </>
              )}
              {!loading && auth && role && (
                <Route path="/settings" element={<Settings />} />
              )}
            </Routes>
          </div>
        </main>
      </BrowserRouter>
    </SidebarProvider>
  );
}

export default App;
