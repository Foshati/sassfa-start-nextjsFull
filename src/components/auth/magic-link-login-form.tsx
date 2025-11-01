"use client";

import { useRef, useState } from "react";


import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const MagicLinkLoginForm = () => {
  const [isPending, setIsPending] = useState(false);
  const ref = useRef<HTMLDetailsElement>(null);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) return toast.error("Please enter your email.");

    await signIn.magicLink({
      email,
      name: email.split("@")[0],
      callbackURL: "/profile",
      fetchOptions: {
        onRequest: () => {
          setIsPending(true);
        },
        onResponse: () => {
          setIsPending(false);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("Check your email for the magic link!");
          if (ref.current) ref.current.open = false;
        },
      },
    });
  }

  return (
    <details
      ref={ref}
      className="w-full rounded-md border border-blue-600 overflow-hidden"
    >
      <summary className="flex gap-2 items-center justify-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer text-xs font-medium">
        <svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-label="Magic Link">
          <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          <path d="M19 15L20.09 18.26L24 19L20.09 19.74L19 23L17.91 19.74L14 19L17.91 18.26L19 15Z" />
          <path d="M5 6L6.09 9.26L10 10L6.09 10.74L5 14L3.91 10.74L0 10L3.91 9.26L5 6Z" />
        </svg>
        Login with Magic Link
      </summary>

      <form onSubmit={handleSubmit} className="p-3 bg-blue-50">
        <Label htmlFor="magic-email" className="sr-only">
          Email
        </Label>
        <div className="flex gap-2 items-center">
          <Input type="email" id="magic-email" name="email" placeholder="Enter your email" className="flex-1" />
          <Button disabled={isPending} size="sm">Send</Button>
        </div>
      </form>
    </details>
  );
};
