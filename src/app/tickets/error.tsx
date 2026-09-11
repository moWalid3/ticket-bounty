"use client";

import Placeholder from "@/components/placeholder";
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
  error: Error;
  retry: () => void;
};

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  return (
    <Placeholder
      label={error?.message ?? "Something went wrong!"}
      button={
        <Button onClick={retry} variant="secondary">
          Try again
        </Button>
      }
    />
  );
}
