import z from "zod";

export const passwordSchema = z
  .string()
  .min(8, { message: "Must be at least 8 characters long" })
  .max(191, { message: "Cannot exceed 191 characters" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Must contain at least one lowercase letter",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Must contain at least one number",
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Must contain at least one special character",
  });

export const emailSchema = z
  .email()
  .min(1, { message: "Is required" })
  .max(191);

export const signUpSchema = z
  .object({
    username: z
      .string()
      .min(1)
      .max(191)
      .refine(
        (value) => !value.includes(" "),
        "Username cannot contain spaces",
      ),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type SignUpValuesType = z.infer<typeof signUpSchema>;

export const signUpDefaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
