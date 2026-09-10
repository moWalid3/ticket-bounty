import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { LucideKanban } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <nav
      className="
        supports-backdrop-blur:bg-background/60 fixed top-0 left-0 right-0 z-20 border-b 
        flex justify-between bg-background/95 backdrop-blur w-full py-2.5 px-5
      "
    >
      <div>
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

      <div>
        <Link href={Routes.tickets} className={buttonVariants()}>
          Tickets
        </Link>
      </div>
    </nav>
  );
}

export default Header;
