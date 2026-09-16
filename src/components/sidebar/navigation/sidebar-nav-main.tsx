import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAuth } from "@/features/auth/queries/get-auth";
import { Suspense } from "react";
import { ProtectedNav, PublicNav } from "./sidebar-nav-client";

async function SidebarContent() {
  const { user } = await getAuth();

  return (
    <>
      <PublicNav />
      {user && <ProtectedNav />}
    </>
  );
}

function SidebarNavSkeleton() {
  return (
    <div className="mt-2 flex flex-col gap-2 px-2">
      <Skeleton className="h-6 w-full rounded-md bg-sidebar-accent/50" />
      <Skeleton className="h-6 w-full rounded-md bg-sidebar-accent/50" />
    </div>
  );
}

export function SidebarNavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        <Suspense fallback={<SidebarNavSkeleton />}>
          <SidebarContent />
        </Suspense>
      </SidebarMenu>
    </SidebarGroup>
  );
}
