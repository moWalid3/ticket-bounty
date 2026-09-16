import { Routes } from "@/constants/routes";
import { Inbox, Ticket, User } from "lucide-react";

export const publicNavItems = [
  {
    title: "All Tickets",
    href: Routes.home,
    icon: Ticket,
  },
];

export const protectedNavItems = [
  {
    title: "My Tickets",
    href: Routes.tickets,
    icon: Inbox,
  },
  {
    title: "Account",
    href: Routes.profile,
    icon: User,
    items: [
      {
        title: "Profile",
        href: Routes.profile,
      },
      {
        title: "Password",
        href: Routes.password,
      },
    ],
  },
];
