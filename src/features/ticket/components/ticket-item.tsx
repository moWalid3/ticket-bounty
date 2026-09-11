import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Routes } from "@/constants/routes";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { cn } from "@/lib/utils";
import { Ticket } from "../types";

type TicketItemProps = {
  ticket: Ticket;
  isDetail?: boolean;
};

function TicketItem({ ticket, isDetail }: TicketItemProps) {
  const detailButton = (
    <Link
      href={Routes.ticket(ticket.id)}
      className={buttonVariants({ size: "icon" })}
    >
      <LucideSquareArrowOutUpRight />
    </Link>
  );

  return (
    <div
      className={cn("w-full flex gap-x-1", {
        "max-w-md": !isDetail,
        "max-w-xl": isDetail,
      })}
    >
      <Card className="flex-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <h3 className="truncate font-bold text-xl">{ticket.title}</h3>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span
            className={cn("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        </CardContent>
      </Card>

      {!isDetail && (
        <div className="flex flex-col gap-y-0.5">{detailButton}</div>
      )}
    </div>
  );
}

export default TicketItem;
