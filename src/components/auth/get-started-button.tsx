"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { UserButton } from "@/components/auth/user-button";
import Link from "next/link";

export const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <Button size="lg" className="opacity-50" disabled>
        Get Started
      </Button>
    );
  }

  // If user is logged in, show UserButton
  if (session) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground hidden sm:inline">
          Welcome, {session.user.name.split(" ")[0]}! 
        </span>
        <UserButton 
          user={{
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            role: session.user.role as string,
            emailVerified: session.user.emailVerified,
          }} 
        />
      </div>
    );
  }

  // If not logged in, show Get Started button
  return (
    <Button size="lg" asChild>
      <Link href="/auth/login">Get Started</Link>
    </Button>
  );
};
