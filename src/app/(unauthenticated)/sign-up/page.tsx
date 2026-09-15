import CardCompact from "@/components/card-compact";
import { Routes } from "@/constants/routes";
import SignUpForm from "@/features/auth/components/sign-up-form";
import Link from "next/link";

function SignUpPage() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign Up"
        description="Create an account to get started"
        content={<SignUpForm />}
        className="w-full max-w-lg animate-fade-in-from-top"
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
