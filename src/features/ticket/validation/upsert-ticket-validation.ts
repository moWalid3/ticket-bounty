import z from "zod";

export const upsertTicketSchema = z.object({
  title: z.string().min(1).max(191),
  content: z.string().min(1).max(1024),
  deadline: z.union([z.string(), z.date()]).refine((val) => val !== "", {
    message: "Deadline is required",
  }),
  bounty: z.union([z.string(), z.number()]).refine(
    (val) => {
      const num = Number(val);
      return val !== "" && !isNaN(num) && num > 0;
    },
    { message: "Bounty can't be negative or 0" },
  ),
});

export type UpsertTicketValuesType = z.infer<typeof upsertTicketSchema>;

export const upsertTicketDefaultValues: UpsertTicketValuesType = {
  title: "",
  content: "",
  deadline: "",
  bounty: 0,
};
