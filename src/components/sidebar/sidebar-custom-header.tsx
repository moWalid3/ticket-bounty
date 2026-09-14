import { Plus } from "lucide-react";
import Link from "next/link";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Routes } from "@/constants/routes";

export default function SidebarCustomHeader() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary transition-colors"
          render={<Link href={Routes.tickets} />}
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Plus className="size-5" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold tracking-wide">
              New Ticket
            </span>
            <span className="truncate text-xs font-medium opacity-80">
              TicketBounty
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
