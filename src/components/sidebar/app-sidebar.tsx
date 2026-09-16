import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import SidebarCustomHeader from "./sidebar-custom-header";
import { SidebarNavMain } from "./navigation/sidebar-nav-main";
import { SidebarUser } from "./sidebar-user";

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
          <SidebarUser />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
