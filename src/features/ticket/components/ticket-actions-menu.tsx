"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TicketStatus } from "@prisma/client";
import { LucideMoreVertical, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { TICKET_STATUS_LABELS } from "../constants";

type TicketActionsMenuProps = {
  currentStatus: TicketStatus;
  onStatusChange: (status: TicketStatus) => void;
  onDelete: () => void;
};

export function TicketActionsMenu({
  currentStatus,
  onStatusChange,
  onDelete,
}: TicketActionsMenuProps) {
  const [isPending, startTransition] = useTransition();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleDelete() {
    setIsDialogOpen(false);
    startTransition(onDelete);
  }

  function handleStatusChange(status: TicketStatus) {
    setIsMenuOpen(false);
    startTransition(() => onStatusChange(status));
  }

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DropdownMenu
        disabled={isPending}
        open={isMenuOpen}
        onOpenChange={setIsMenuOpen}
      >
        <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
          <LucideMoreVertical />
          <span className="sr-only">Open ticket menu</span>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuRadioGroup
            defaultValue={currentStatus}
            onValueChange={handleStatusChange}
          >
            {(Object.keys(TICKET_STATUS_LABELS) as Array<TicketStatus>).map(
              (key) => (
                <DropdownMenuRadioItem key={key} value={key}>
                  {TICKET_STATUS_LABELS[key]}
                </DropdownMenuRadioItem>
              ),
            )}
          </DropdownMenuRadioGroup>

          <DropdownMenuSeparator />

          <AlertDialogTrigger
            nativeButton={false}
            render={<DropdownMenuItem variant="destructive" />}
          >
            <Trash2 /> Delete
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this ticket from our servers. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
