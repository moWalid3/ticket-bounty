import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: LayoutProps<"/">) {
  const { user } = await getAuth();

  if (!user) redirect(Routes.signIn);

  return children;
}
