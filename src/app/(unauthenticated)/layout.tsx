import { Routes } from "@/constants/routes";
import { getAuth } from "@/features/auth/queries/get-auth";
import { redirect } from "next/navigation";

export default async function UnAuthenticatedLayout({
  children,
}: LayoutProps<"/">) {
  const { user } = await getAuth();

  if (user) redirect(Routes.home);

  return children;
}
