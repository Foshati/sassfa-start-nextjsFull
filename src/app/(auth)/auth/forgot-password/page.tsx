"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, ArrowLeft, Send, Loader2, KeyRound, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgetPassword } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [isPending, setIsPending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);

    const formData = new FormData(evt.currentTarget);
    const email = String(formData.get("email"));

    if (!email) {
      toast.error("Please enter your email address");
      setIsPending(false);
      return;
    }

    try {
      await forgetPassword({
        email,
        redirectTo: "/auth/reset-password",
      });
      setEmailSent(true);
      toast.success("Reset link sent! Check your email.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full" />
        
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
            <KeyRound className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center">Forgot Password?</h1>
          <p className="text-lg text-white/80 text-center max-w-md">
            No worries! We&apos;ll help you reset your password and get back to your account.
          </p>
          
          <div className="mt-12 flex gap-2">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="w-3 h-3 bg-white/30 rounded-full animate-pulse" 
                style={{ animationDelay: `${i * 200}ms` }} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16 bg-background">
        <div className="mx-auto w-full max-w-md">
          {/* Logo - Mobile */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <KeyRound className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Back to login */}
          <Link 
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>

          {!emailSent ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Reset Password
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Enter your email and we&apos;ll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="you@example.com"
                      className="pl-10 h-11 transition-all duration-200 focus:ring-2 focus:ring-amber-500/20"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-11 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-500/25"
                >
                  {isPending ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Reset Link
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
                <p className="text-muted-foreground">
                  We&apos;ve sent a password reset link to your email address. 
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Didn&apos;t receive the email?
                </p>
                <Button
                  variant="outline"
                  onClick={() => setEmailSent(false)}
                  className="gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Try again
                </Button>
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-amber-600 hover:text-amber-700 hover:underline transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
