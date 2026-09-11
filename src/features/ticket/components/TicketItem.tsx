import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Routes } from "@/constants/routes";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
};

function TicketItem({ ticket }: TicketItemProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-x-2">
          <span>{TICKET_ICONS[ticket.status]}</span>
          <h3 className="truncate font-bold text-xl">{ticket.title}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <span className="line-clamp-3 whitespace-break-spaces">
          {ticket.content}
        </span>
      </CardContent>
      <CardFooter>
        <Link
          href={Routes.ticket(ticket.id)}
          className={buttonVariants({ variant: "ghost" })}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
}

export default TicketItem;
