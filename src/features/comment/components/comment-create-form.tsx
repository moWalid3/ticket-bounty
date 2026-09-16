"use client";

import CustomControlledField from "@/components/controlled-field/custom-controlled-field";
import { SubmitButton } from "@/components/form/submit-button";
import { FieldGroup } from "@/components/ui/field";
import { toast } from "@/components/ui/toast";
import { handleServerActionErrors } from "@/lib/handle-form-errors";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createComment } from "../actions/create-comment";
import { CommentWithMetadata } from "../types";
import {
  createCommentDefaultValues,
  createCommentSchema,
  CreateCommentValuesType,
} from "../validation/create-comment-validation";

type CommentCreateFormProps = {
  ticketId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

const CommentCreateForm = ({
  ticketId,
  onCreateComment,
}: CommentCreateFormProps) => {
  const form = useForm<CreateCommentValuesType>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: createCommentDefaultValues,
  });

  async function onSubmit(data: CreateCommentValuesType) {
    const result = await createComment(data, ticketId);

    if (!result.success) {
      handleServerActionErrors(result, form);
      return;
    }

    form.reset();
    toast.add({
      type: "success",
      description: "Comment created successfully!",
    });
    onCreateComment?.(result.data ?? undefined);
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-y-6">
        <CustomControlledField
          control={form.control}
          fieldType="textarea"
          id="create-comment-content"
          name="content"
          placeholder="What are your thoughts?"
          className="min-h-28"
        />

        {form.formState.errors.root && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {form.formState.errors.root.message}
          </div>
        )}

        <SubmitButton
          label="Comment"
          pending={form.formState.isSubmitting}
          disabled={!form.formState.isDirty}
        />
      </FieldGroup>
    </form>
  );
};

export { CommentCreateForm };
