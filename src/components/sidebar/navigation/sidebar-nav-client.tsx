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
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { isRouteActive } from "./is-route-active";
import { protectedNavItems, publicNavItems } from "./sidebar-nav-items";

export function PublicNav() {
  const pathname = usePathname();

  return (
    <>
      {publicNavItems.map((item) => {
        const isActive = isRouteActive(pathname, item.href);

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              render={<Link href={item.href} />}
              tooltip={item.title}
              isActive={isActive}
            >
              <item.icon />
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
}

export function ProtectedNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useSidebar();

  return (
    <>
      {protectedNavItems.map((item) => {
        const hasChildren = "items" in item;

        if (!hasChildren) {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={<Link href={item.href} />}
                tooltip={item.title}
                isActive={isActive}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }

        const isActive = item.items?.some((subItem) =>
          isRouteActive(pathname, subItem.href),
        );

        return (
          <Collapsible
            key={item.title}
            defaultOpen={isActive || true}
            render={<SidebarMenuItem />}
            className="group/collapsible"
          >
            <CollapsibleTrigger
              render={
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isActive}
                  onClick={() => {
                    if (state === "collapsed") {
                      router.push(item.href);
                    }
                  }}
                />
              }
            >
              <item.icon />
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => {
                  const isSubItemActive = isRouteActive(pathname, subItem.href);

                  return (
                    <SidebarMenuSubItem key={subItem.href}>
                      <SidebarMenuSubButton
                        render={<Link href={subItem.href} />}
                        isActive={isSubItemActive}
                      >
                        <span>{subItem.title}</span>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
        );
      })}
    </>
  );
}
