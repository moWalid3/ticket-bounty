import z from "zod";
import { emailSchema, passwordSchema } from "./sign-up-validation";

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInValuesType = z.infer<typeof signInSchema>;

export const signInDefaultValues = {
  email: "",
  password: "",
};
