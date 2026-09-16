import z from "zod";

export const createCommentSchema = z.object({
  content: z.string().min(1).max(1024),
});

export type CreateCommentValuesType = z.infer<typeof createCommentSchema>;

export const createCommentDefaultValues: CreateCommentValuesType = {
  content: "",
};
