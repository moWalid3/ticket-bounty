import { Routes } from "@/constants/routes";
import { initialTickets } from "@/data";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LucideCircleCheck, LucideFileText, LucidePencil } from "lucide-react";

const TICKET_ICONS = {
  OPEN: <LucideFileText />,
  IN_PROGRESS: <LucidePencil />,
  DONE: <LucideCircleCheck />,
};

function TicketsPage() {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tickets</h2>
        <p className="text-sm text-muted-foreground">
          All your tickets at one place
        </p>
      </div>

      <Separator />

      <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-in-from-top">
        {initialTickets.map((ticket) => (
          <Card key={ticket.id} className="w-full max-w-md">
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
                href={Routes.ticket(ticket.id.toString())}
                className={buttonVariants({ variant: "ghost" })}
              >
                View
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default TicketsPage;
