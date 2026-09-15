import { LucidePencil, LucideSquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import CardCompact from "@/components/card-compact";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/routes";
import { TICKET_ICONS } from "@/features/ticket/constants";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { TicketWithMetadata } from "../types";
import { formatCurrency } from "../utils/currency";
import TicketMoreMenu from "./ticket-more-menu";

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

  const editButton = ticket.isOwner ? (
    <Link
      href={Routes.ticketEdit(ticket.id)}
      className={buttonVariants({ size: "icon" })}
    >
      <LucidePencil />
    </Link>
  ) : null;

  const moreMenu = ticket.isOwner && (
    <TicketMoreMenu ticketId={ticket.id} currentStatus={ticket.status} />
  );

  return (
    <div
      className={cn("w-full flex gap-x-1.25", {
        "max-w-md": !isDetail,
        "max-w-xl": isDetail,
      })}
    >
      <CardCompact
        className="flex-1"
        title={
          <div className="flex items-center gap-x-2">
            <span>{TICKET_ICONS[ticket.status]}</span>
            <h3 className="whitespace-break-spaces line-clamp-1 font-medium">
              {ticket.title}
            </h3>
          </div>
        }
        content={
          <span
            className={cn("whitespace-break-spaces text-sm", {
              "line-clamp-3": !isDetail,
            })}
          >
            {ticket.content}
          </span>
        }
        footer={
          <>
            <p className="text-muted-foreground text-[13px]">
              {format(ticket.deadline, "yyyy-MM-dd")} by {ticket.user.username}
            </p>
            <span className="text-accent-foreground text-[13px]">
              {formatCurrency(+ticket.bounty)}
            </span>
          </>
        }
      />

      <div className="flex flex-col gap-y-0.75">
        {isDetail ? (
          <>
            {editButton}
            {moreMenu}
          </>
        ) : (
          <>
            {detailButton}
            {editButton}
          </>
        )}
      </div>
    </div>
  );
}

export default TicketItem;
