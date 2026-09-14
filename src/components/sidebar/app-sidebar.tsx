import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import SidebarCustomHeader from "./sidebar-custom-header";
import { SidebarNavMain } from "./sidebar-nav-main";
import { SidebarNavUser } from "./sidebar-nav-user";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="border-r-border/50">
      <SidebarHeader>
        <SidebarCustomHeader />
      </SidebarHeader>

      <SidebarContent>
        <SidebarNavMain />
      </SidebarContent>

      <SidebarFooter>
        <Suspense>
          <SidebarNavUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
