"use client";

import CustomControlledField from "@/components/controlled-field/custom-controlled-field";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUp } from "../actions/sign-up";
import {
  signUpDefaultValues,
  signUpSchema,
  SignUpValuesType,
} from "../validation/sign-up-validation";

export default function SignUpForm() {
  const form = useForm<SignUpValuesType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  async function onSubmit(data: SignUpValuesType) {
    const result = await signUp(data);

    if (!result.success) {
      if (result.fieldErrors) {
        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
          if (errors && errors.length > 0) {
            form.setError(field as keyof SignUpValuesType, {
              type: "server",
              message: errors[0],
            });
          }
        });
        return;
      }

      // 2. Handle generic/root errors (e.g., database connection down)
      // form.setError("root", { type: "server", message: result.error });
      // OR use a toast notification:
      // toast.error(result.error);
      return;
    }

    // 3. Success state
    // toast.success("Account created successfully!");
    // router.push("/dashboard");
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-6">
        <CustomControlledField
          control={form.control}
          fieldType="input"
          id="sign-up-username"
          name="username"
          label="Username"
        />
        <CustomControlledField
          control={form.control}
          fieldType="input"
          id="sign-up-email"
          name="email"
          label="Email"
          inputType="email"
        />
        <CustomControlledField
          control={form.control}
          fieldType="input"
          id="sign-up-password"
          name="password"
          label="Password"
          inputType="password"
        />
        <CustomControlledField
          control={form.control}
          fieldType="input"
          id="sign-up-confirmPassword"
          name="confirmPassword"
          label="ConfirmPassword"
          inputType="password"
        />
        <SubmitButton label="Sign Up" pending={form.formState.isSubmitting} />
      </FieldGroup>
    </form>
  );
}
