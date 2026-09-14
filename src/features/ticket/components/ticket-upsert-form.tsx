"use client";

import CustomControlledField from "@/components/controlled-field/custom-controlled-field";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Routes } from "@/constants/routes";
import { handleServerActionErrors } from "@/lib/handle-form-errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ticket } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { upsertTicket } from "../actions/upsert-ticket";
import {
  upsertTicketDefaultValues,
  upsertTicketSchema,
  UpsertTicketValuesType,
} from "../validation/upsert-ticket-validation";

type TicketUpsertFormProps = { ticket?: Ticket };

function TicketUpsertForm({ ticket }: TicketUpsertFormProps) {
  const router = useRouter();
  const form = useForm<UpsertTicketValuesType>({
    resolver: zodResolver(upsertTicketSchema),
    defaultValues: ticket
      ? {
          ...ticket,
          bounty: Number(ticket.bounty),
        }
      : upsertTicketDefaultValues,
  });

  async function onSubmit(data: UpsertTicketValuesType) {
    form.clearErrors("root");

    const result = await upsertTicket(data, ticket?.id);

    const hasErrors = handleServerActionErrors(result, form);
    if (hasErrors) return;

    form.reset();

    if (ticket) {
      toast.add({
        type: "success",
        description: "Ticket updated successfully",
      });

      router.push(Routes.tickets);
    }

    toast.add({
      type: "success",
      description: "Ticket created successfully",
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-6">
        <CustomControlledField
          name="title"
          control={form.control}
          fieldType="input"
          id="ticket-upsert-title"
          label="Title"
        />
        <CustomControlledField
          name="content"
          control={form.control}
          fieldType="textarea"
          id="ticket-upsert-content"
          label="Content"
        />
        <div className="flex gap-2">
          <CustomControlledField
            name="deadline"
            control={form.control}
            fieldType="datePicker"
            id="ticket-upsert-deadline"
            label="Deadline"
          />
          <CustomControlledField
            name="bounty"
            control={form.control}
            fieldType="input"
            inputType="number"
            id="ticket-upsert-bounty"
            label="Bounty"
          />
        </div>

        {form.formState.errors.root && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <SubmitButton
          label={ticket ? "Update" : "Create"}
          pending={form.formState.isSubmitting}
        />
      </FieldGroup>
    </form>
  );
}

export default TicketUpsertForm;
