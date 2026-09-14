import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { PublicNav, ProtectedNav } from "./sidebar-nav-client";
import { getAuth } from "@/features/auth/queries/get-auth";

async function AuthDependentNav() {
  const { user } = await getAuth();

  if (!user) return null;

  return <ProtectedNav />;
}

export function SidebarNavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        <PublicNav />

        <Suspense
          fallback={
            <div className="flex flex-col gap-2 px-2 mt-2">
              <Skeleton className="h-6 w-full bg-sidebar-accent/50 rounded-md" />
              <Skeleton className="h-6 w-full bg-sidebar-accent/50 rounded-md" />
            </div>
          }
        >
          <AuthDependentNav />
        </Suspense>
      </SidebarMenu>
    </SidebarGroup>
  );
}
