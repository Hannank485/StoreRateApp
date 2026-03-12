import { useState } from "react";
import { SidebarTrigger } from "./ui/sidebar";
import { Moon, Sun } from "lucide-react";
function Navbar({ auth }: { auth: boolean | null }) {
  const [dark, setDark] = useState<boolean>(false);

  const handleDark = () => {
    setDark((prev) => !prev);
    document.body.classList.toggle("dark");
  };
  return (
    <header className="w-full sticky top-0 bg-card border-b py-2.5">
      <nav className=" px-5 md:px-10 w-full flex flex-row gap-10 md:gap-0 justify-between items-center md:justify-end">
        {auth && <SidebarTrigger className="md:hidden" />}

        <p
          className="p-2 transition-colors cursor-pointer hover:bg-accent hover:text-foreground rounded-md"
          onClick={() => {
            handleDark();
          }}
        >
          {dark ? <Sun /> : <Moon />}
        </p>
      </nav>
    </header>
  );
}

export default Navbar;
