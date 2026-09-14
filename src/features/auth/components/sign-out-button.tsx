"use client";

import { toast } from "@/components/ui/toast";
import { Routes } from "@/constants/routes";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "../actions/sign-out";

export function SignOutButton() {
  const router = useRouter();

  function handleSignout() {
    toast.promise(
      new Promise<void>(async (resolve, reject) => {
        const result = await signOut();

        if (result.success) {
          router.push(Routes.signIn);
          resolve();
        }

        router.push(Routes.signIn);
        reject();
      }),
      {
        loading: "Signing out...",
        success: "Signed out successfully",
        error: "Could not sign out. Please try again later.",
      },
    );
  }

  return (
    <button onClick={handleSignout} className="flex gap-4 items-center w-full">
      <LogOutIcon />
      Sign Out
    </button>
  );
}
