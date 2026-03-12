import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import authApi from "@/api/authApi";
import { LayoutDashboard, Settings, Store, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
function SidebarComp({
  role,
  setAuth,
}: {
  role: string;
  setAuth: React.Dispatch<React.SetStateAction<boolean | null>>;
}) {
  const handleLogout = async () => {
    await authApi.logout();
    setAuth(false);
  };
  const navigate = useNavigate();
  const sidebarNavStyle =
    " py-3  px-15 rounded-sm hover:bg-accent/80 cursor-pointer text-md flex gap-2 ";
  return (
    <Sidebar>
      <SidebarHeader className=" p-4 text-xl font-semibold">
        <span
          onClick={() => {
            console.log(role);
          }}
        >
          StoreRate
        </span>
      </SidebarHeader>
      <SidebarContent className="mt-2">
        {/* ADMIN  */}
        {role === "ADMIN" && (
          <SidebarGroup className="gap-2 flex flex-col ">
            <NavLink to="/admin/dashboard" className={sidebarNavStyle}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
            <NavLink to="/admin/stores" className={sidebarNavStyle}>
              <Store />
              Stores
            </NavLink>
            <NavLink to="/admin/users" className={sidebarNavStyle}>
              <User />
              Users
            </NavLink>
          </SidebarGroup>
        )}
        {role === "USER" && <SidebarGroup />}
        {role === "OWNER" && (
          <SidebarGroup>
            <NavLink to="/owner/dashboard" className={sidebarNavStyle}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </SidebarGroup>
        )}
        {role === "USER" && (
          <SidebarGroup>
            <NavLink to="/user/dashboard" className={sidebarNavStyle}>
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter className="border-t">
        <span className="flex">
          <Button
            className="w-full bg-destructive flex-11/12 cursor-pointer hover:bg-destructive/90 text-white"
            onClick={async () => {
              await handleLogout();
            }}
          >
            Log Out
          </Button>
          <Button
            className="w-full cursor-pointer flex-1/12 bg-background hover:bg-foreground/10 text-foreground"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <Settings />
          </Button>
        </span>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarComp;
