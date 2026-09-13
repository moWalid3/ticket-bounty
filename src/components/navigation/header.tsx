import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { LucideKanban } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ThemeSwitcher from "../theme/theme-switcher";
import { SidebarTrigger } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import AuthNavLinks from "./auth-nav-links";

function Header() {
  return (
    <nav className="flex justify-between items-center py-2.5 px-5 shrink-0 bg-sidebar border-b border-b-border/50">
      <div>
        <SidebarTrigger className="mr-4" />
        <Link
          href={Routes.home}
          className={buttonVariants({
            variant: "ghost",
            className: "active:translate-y-0!",
          })}
        >
          <LucideKanban />
          <h1 className="ml-2 text-lg font-semibold">TicketBounty</h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-2">
        <Suspense fallback={<Skeleton className="h-9 w-18.75" />}>
          <AuthNavLinks />
        </Suspense>

        <ThemeSwitcher />
      </div>
    </nav>
  );
}

export default Header;
