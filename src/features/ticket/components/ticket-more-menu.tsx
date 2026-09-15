"use client";

import { toast } from "@/components/ui/toast";
import { Routes } from "@/constants/routes";
import { TicketStatus } from "@prisma/client";
import { useRouter } from "next/navigation";
import { deleteTicket } from "../actions/delete-ticket";
import { updateTicketStatus } from "../actions/update-ticket-status";
import { TicketActionsMenu } from "./ticket-actions-menu";

type TicketMoreMenuProps = { ticketId: string; currentStatus: TicketStatus };

function TicketMoreMenu({ ticketId, currentStatus }: TicketMoreMenuProps) {
  const router = useRouter();

  function handleDelete() {
    const promise = deleteTicket(ticketId).then((result) => {
      if (!result.success) throw new Error(result.error);
      router.push(Routes.tickets);
    });

    toast.promise(promise, {
      loading: "Deleting ticket...",
      success: "Ticket deleted successfully!",
      error: (error) => error.message || "Failed to delete ticket",
    });
  }

  async function handleStatusChange(status: TicketStatus) {
    const promise = updateTicketStatus(ticketId, status).then((result) => {
      if (!result.success) throw new Error(result.error);
      router.refresh();
    });

    toast.promise(promise, {
      loading: "Updating status...",
      success: "Status updated successfully!",
      error: (error) => error.message || "Failed to update status",
    });
  }

  return (
    <TicketActionsMenu
      currentStatus={currentStatus}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  );
}

export default TicketMoreMenu;
