import CardCompact from "@/components/card-compact";
import { Routes } from "@/constants/routes";
import SignInForm from "@/features/auth/components/sign-in-form";
import Link from "next/link";

function SignInPage() {
  return (
    <div className="flex-1 flex justify-center items-center">
      <CardCompact
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        className="w-full max-w-lg animate-fade-in-from-top"
        footer={
          <span className="text-muted-foreground">
            No account yet?
            <Link
              href={Routes.signUp}
              className="ml-1.5 text-primary/80 hover:underline"
            >
              Sign up now.
            </Link>
          </span>
        }
      />
    </div>
  );
}

export default SignInPage;
