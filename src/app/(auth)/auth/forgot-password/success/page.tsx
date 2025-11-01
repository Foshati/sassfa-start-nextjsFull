import { ReturnButton } from "@/components/auth/return-button";

export default function Page() {
  return (
    <div className="px-8 py-16 container mx-auto max-w-5xl space-y-8">
      <div className="space-y-4">
        <ReturnButton href="/auth/login" label="Login" />

        <h1 className="text-3xl font-bold">Success</h1>

        <p className="text-muted-foreground">
          Success! You have sent a password reset link to your email.
        </p>
      </div>
    </div>
  );
}
