import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { ReturnButton } from "@/components/auth/return-button";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/auth/update-user-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  Home,
  User,
  Lock,
  Shield,
  Settings,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

export default async function Page() {
  const headersList = await headers();

  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session) redirect("/auth/login?error=session_expired");

  const FULL_POST_ACCESS = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        posts: ["update", "delete"],
      },
    },
  });

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      section: "overview",
    },
    {
      label: "Profile Information",
      href: "#profile",
      icon: User,
      section: "profile",
    },
    {
      label: "Permissions",
      href: "#permissions",
      icon: Shield,
      section: "permissions",
    },
    {
      label: "Update Profile",
      href: "#update",
      icon: Settings,
      section: "update",
    },
    {
      label: "Change Password",
      href: "#password",
      icon: Lock,
      section: "password",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex">
        {/* Enhanced Sidebar */}
        <aside className="w-72 bg-white shadow-xl border-r min-h-screen sticky top-0">
          <ScrollArea className="h-screen">
            {/* User Profile Section */}
            <div className="p-6 border-b bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-center gap-4 mb-4">
                {session.user.image ? (
                  <div className="relative">
                    <Image
                      src={session.user.image}
                      alt="User avatar"
                      width={56}
                      height={56}
                      className="size-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                ) : (
                  <div className="relative">
                    <div className="size-14 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center ring-2 ring-primary/20">
                      <span className="uppercase text-lg font-bold">
                        {session.user.name.slice(0, 2)}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-base truncate">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {session.user.email}
                  </p>
                  <Badge variant="secondary" className="mt-1 text-xs">
                    {session.user.role}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1">
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Navigation
                </p>
              </div>

              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start gap-3 h-11 px-3 hover:bg-primary/10 hover:text-primary transition-all group"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="flex-1 text-left font-medium">
                      {item.label}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </Button>
              ))}

              {session.user.role === "ADMIN" && (
                <>
                  <Separator className="my-4" />
                  <div className="px-3 py-2">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Administration
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11 px-3 hover:bg-primary/10 hover:text-primary transition-all group"
                    asChild
                  >
                    <Link href="/admin/dashboard">
                      <Shield className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                      <span className="flex-1 text-left font-medium">
                        Admin Dashboard
                      </span>
                      <ChevronRight className="h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </Button>
                </>
              )}

              <Separator className="my-4" />

              {/* Sign Out */}
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Account
                </p>
              </div>
              <SignOutButton />
            </nav>
          </ScrollArea>
        </aside>

        {/* Enhanced Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <ReturnButton href="/" label="Back to Home" />
              <div>
                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Profile Settings
                </h1>
                <p className="text-muted-foreground mt-2">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>

            {/* Profile Info Card */}
            <div
              id="profile"
              className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-6">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="User avatar"
                    width={96}
                    height={96}
                    className="size-24 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                  />
                ) : (
                  <div className="size-24 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center border-4 border-primary/20 shadow-lg">
                    <span className="uppercase text-3xl font-bold">
                      {session.user.name.slice(0, 2)}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{session.user.name}</h2>
                  <p className="text-muted-foreground mt-1">
                    {session.user.email}
                  </p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="outline" className="font-normal">
                      Role: {session.user.role}
                    </Badge>
                    <div className="flex items-center gap-1.5 text-sm text-green-600">
                      <div className="size-2 bg-green-500 rounded-full" />
                      <span>Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions Card */}
            <div
              id="permissions"
              className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Access Permissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Your current access level and permissions
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border-2 border-green-200 hover:border-green-300 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <span className="font-semibold text-green-900">
                        Manage Own Posts
                      </span>
                      <p className="text-xs text-green-700 mt-0.5">
                        Create, edit and delete your own posts
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-600">Enabled</Badge>
                </div>

                <div
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors ${
                    FULL_POST_ACCESS.success
                      ? "bg-green-50 border-green-200 hover:border-green-300"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-8 rounded-full flex items-center justify-center ${
                        FULL_POST_ACCESS.success
                          ? "bg-green-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {FULL_POST_ACCESS.success ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <span
                        className={`font-semibold ${
                          FULL_POST_ACCESS.success
                            ? "text-green-900"
                            : "text-gray-900"
                        }`}
                      >
                        Manage All Posts
                      </span>
                      <p
                        className={`text-xs mt-0.5 ${
                          FULL_POST_ACCESS.success
                            ? "text-green-700"
                            : "text-gray-500"
                        }`}
                      >
                        Full access to manage all posts in the system
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={FULL_POST_ACCESS.success ? "default" : "secondary"}
                    className={FULL_POST_ACCESS.success ? "bg-green-600" : ""}
                  >
                    {FULL_POST_ACCESS.success ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Update Profile Card */}
            <div
              id="update"
              className="bg-white p-8 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Update Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Change your name and profile picture
                  </p>
                </div>
              </div>
              <UpdateUserForm
                name={session.user.name}
                image={session.user.image ?? ""}
              />
            </div>

            {/* Change Password Card */}
            <div
              id="password"
              className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl shadow-sm border-2 border-red-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-red-100 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900">
                    Change Password
                  </h3>
                  <p className="text-sm text-red-700">
                    Update your password to keep your account secure
                  </p>
                </div>
              </div>
              <ChangePasswordForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
