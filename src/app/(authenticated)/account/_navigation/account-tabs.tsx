"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Routes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AccountTabs() {
  const pathname = usePathname();

  const value = pathname === Routes.password ? "password" : "profile";

  return (
    <Tabs value={value} className="w-[400px]a">
      <TabsList>
        <TabsTrigger
          nativeButton={false}
          render={<Link href={Routes.profile} />}
          value="profile"
        >
          Profile
        </TabsTrigger>
        <TabsTrigger
          nativeButton={false}
          render={<Link href={Routes.password} />}
          value="password"
        >
          Password
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
