"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import CustomControlledField from "@/components/controlled-field/custom-controlled-field";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { Routes } from "@/constants/routes";
import { handleServerActionErrors } from "@/lib/handle-form-errors";
import { signUp } from "../actions/sign-up";
import {
  signUpDefaultValues,
  signUpSchema,
  SignUpValuesType,
} from "../validation/sign-up-validation";

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<SignUpValuesType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: signUpDefaultValues,
  });

  async function onSubmit(data: SignUpValuesType) {
    const result = await signUp(data);

    const hasErrors = handleServerActionErrors(result, form);
    if (hasErrors) return;

    toast.add({
      type: "success",
      description: "Account created successfully!",
    });
    form.reset();
    router.push(Routes.home);
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

        {form.formState.errors.root && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <SubmitButton
          label="Sign Up"
          pending={form.formState.isSubmitting}
          disabled={!form.formState.isDirty}
        />
      </FieldGroup>
    </form>
  );
}
