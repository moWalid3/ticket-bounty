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
import { signIn } from "../actions/sign-in";
import {
  signInDefaultValues,
  signInSchema,
  SignInValuesType,
} from "../validation/sign-in-validation";

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInValuesType>({
    resolver: zodResolver(signInSchema),
    defaultValues: signInDefaultValues,
  });

  async function onSubmit(data: SignInValuesType) {
    form.clearErrors("root");

    const result = await signIn(data);

    const hasErrors = handleServerActionErrors(result, form);
    if (hasErrors) return;

    toast.add({ type: "success", description: "Good to see you again!" });
    form.reset();
    router.push(Routes.home);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-6">
        <CustomControlledField
          control={form.control}
          fieldType="input"
          id="sign-in-email"
          name="email"
          label="Email"
          inputType="email"
        />
        <CustomControlledField
          control={form.control}
          fieldType="input"
          id="sign-in-password"
          name="password"
          label="Password"
          inputType="password"
        />

        {form.formState.errors.root && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <SubmitButton label="Sign In" pending={form.formState.isSubmitting} />
      </FieldGroup>
    </form>
  );
}
