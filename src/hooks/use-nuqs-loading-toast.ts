"use client";

import { toast } from "@/components/ui/toast";
import { useEffect, useRef, useTransition } from "react";

export function useNuqsLoadingToast(loadingTitle: string) {
  const [isPending, startTransition] = useTransition();
  const toastIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (isPending) {
      toastIdRef.current = toast.add({
        type: "loading",
        title: loadingTitle,
      });
    } else {
      if (toastIdRef.current !== null) {
        toast.close(toastIdRef.current);
        toastIdRef.current = null;
      }
    }
  }, [isPending, loadingTitle]);

  return { isPending, startTransition };
}
