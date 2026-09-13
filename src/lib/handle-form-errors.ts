import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { ActionState } from "./actions";

export function handleServerActionErrors<T extends FieldValues, TData>(
  result: ActionState<TData>,
  form: UseFormReturn<T>,
): boolean {
  if (result.success) return false;

  if (result.fieldErrors) {
    Object.entries(result.fieldErrors).forEach(([field, errors]) => {
      if (errors && errors.length > 0) {
        form.setError(field as Path<T>, {
          type: "server",
          message: errors[0],
        });
      }
    });

    return true;
  }

  if (result.error) {
    form.setError("root", { type: "server", message: result.error });
  }

  return true;
}
