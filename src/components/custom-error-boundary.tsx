"use client";

import { catchError, type ErrorInfo } from "next/error";
import Placeholder from "./placeholder";
import { Button } from "./ui/button";

function ErrorFallback(props: { title: string }, { error, retry }: ErrorInfo) {
  return (
    <Placeholder
      label={props.title}
      description={
        error instanceof Error && error?.message ? error.message : ""
      }
      button={
        <Button onClick={retry} variant="secondary">
          Try again
        </Button>
      }
    />
  );
}

export const ErrorBoundary = catchError(ErrorFallback);
