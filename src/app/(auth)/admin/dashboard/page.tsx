import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";
import { Shield, AlertTriangle, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login");

  // Premium Forbidden page for non-admins
  if (session.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
        </div>

        <div className="relative w-full max-w-lg">
          {/* Card */}
          <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-10 text-center overflow-hidden">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            
            <div className="relative">
              {/* Icon Container */}
              <div className="mx-auto mb-8 relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center mx-auto shadow-2xl shadow-red-500/30">
                  <Lock className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-white mb-3">
                Access Restricted
              </h1>
              <p className="text-gray-300 mb-8 leading-relaxed">
                This area requires administrator privileges. 
                Please contact your system administrator for access.
              </p>

              {/* Permission Badge */}
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-8">
                <Shield className="w-5 h-5 text-violet-400" />
                <span className="text-white font-medium">Administrator Access Required</span>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.02]"
                >
                  <Link href="/">
                    Go to Home
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="lg"
                  className="w-full h-12 text-white/70 hover:text-white hover:bg-white/10 rounded-xl"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fetch all users
  const { users } = await auth.api.listUsers({
    headers: headersList,
    query: {
      sortBy: "name",
    },
  });

  // Map users to the expected format
  const mappedUsers = users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role as "ADMIN" | "USER",
    image: user.image,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
  }));

  return (
    <DashboardClient 
      users={mappedUsers} 
      currentUserId={session.user.id}
      currentUserName={session.user.name}
      currentUserEmail={session.user.email}
      currentUserImage={session.user.image}
    />
  );
}
