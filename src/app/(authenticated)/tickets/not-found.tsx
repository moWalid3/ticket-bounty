import Placeholder from "@/components/placeholder";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import Link from "next/link";

function NotFound() {
  return (
    <Placeholder
      label="Ticket not found"
      button={
        <Link
          href={Routes.tickets}
          className={buttonVariants({ variant: "secondary" })}
        >
          Go to tickets
        </Link>
      }
    />
  );
}

export default NotFound;
