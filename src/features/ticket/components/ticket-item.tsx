import { LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import CardCompact from "@/components/card-compact";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TicketWithMetadata } from "../types";
import { formatCurrency } from "../utils/currency";

type TicketItemProps = {
  ticket: TicketWithMetadata;
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
      <CardCompact
        className="flex-1"
        title={
          <div className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <h3 className="truncate font-bold text-xl">{ticket.title}</h3>
          </div>
        }
        content={
          <span
            className={cn("whitespace-break-spaces", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        }
        footer={
          <>
            <p className="text-muted-foreground text-[13px]">
              {format(ticket.createdAt, "yyy-mm-dd")} by {ticket.user.username}
            </p>
            <span className="text-accent-foreground text-[13px]">
              {formatCurrency(ticket.bounty)}
            </span>
          </>
        }
      />

      {!isDetail && (
        <div className="flex flex-col gap-y-0.5">{detailButton}</div>
      )}
    </div>
  );
}

export default TicketItem;
