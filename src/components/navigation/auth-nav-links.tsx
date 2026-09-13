import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { cn } from "cn";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

async function AuthNavLinks() {
  const { user } = await getAuth();

  if (!user) return <div>Logout</div>;

  return (
    <>
      <Link
        href={Routes.signUp}
        className={cn(
          "border-border! w-18.75",
          buttonVariants({ variant: "outline" }),
        )}
      >
        Sign Up
      </Link>
      <Link href={Routes.signIn} className={cn("w-18.75", buttonVariants())}>
        Sign In
      </Link>
    </>
  );
}

export default AuthNavLinks;
