"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Routes } from "@/constants/routes";
import {
  ChevronRight,
  LucideInbox,
  LucideTicket,
  LucideUser,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PublicNav() {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        render={<Link href={Routes.home} />}
        tooltip="All Tickets"
      >
        <LucideTicket />
        <span>All Tickets</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function ProtectedNav() {
  const { state } = useSidebar();
  const router = useRouter();

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          render={<Link href={Routes.tickets} />}
          tooltip="My Tickets"
        >
          <LucideInbox />
          <span>My Tickets</span>
        </SidebarMenuButton>
      </SidebarMenuItem>

      <Collapsible
        defaultOpen={true}
        render={<SidebarMenuItem />}
        className="group/collapsible"
      >
        <CollapsibleTrigger
          render={
            <SidebarMenuButton
              tooltip="Account"
              onClick={() => {
                if (state === "collapsed") {
                  router.push(Routes.profile);
                }
              }}
            />
          }
        >
          <LucideUser />
          <span>Account</span>
          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton render={<Link href={Routes.profile} />}>
                <span>Profile</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
            <SidebarMenuSubItem>
              <SidebarMenuSubButton render={<Link href={Routes.password} />}>
                <span>Password</span>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
