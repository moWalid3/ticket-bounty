import CardCompact from "@/components/card-compact";
import { Routes } from "@/constants/routes";
import Link from "next/link";

function SignUpPage() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        content="Test"
        className="w-full max-w-lg"
        footer={
          <span className="text-muted-foreground">
            Have an account?
            <Link
              href={Routes.signIn}
              className="ml-1.5 text-primary/80 hover:underline"
            >
              Sign in now.
            </Link>
          </span>
        }
      />
    </div>
  );
}

export default SignUpPage;
