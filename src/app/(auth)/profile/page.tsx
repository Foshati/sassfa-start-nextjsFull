import { ChangePasswordForm } from "@/components/auth/change-password-form";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { UpdateUserForm } from "@/components/auth/update-user-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
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
  Mail,
  Calendar,
  Activity,
  Bell,
  CreditCard,
  HelpCircle,
  Sparkles,
  Zap,
  Crown,
  LayoutDashboard,
} from "lucide-react";

export default async function ProfilePage() {
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

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-950">
      {/* Premium Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-200/50 dark:border-gray-800 shadow-xl">
        <ScrollArea className="h-full">
          {/* Logo & Brand */}
          <div className="p-6 border-b border-gray-200/50 dark:border-gray-800">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
              </div>
              <div>
                <h1 className="font-bold text-lg tracking-tight">MyApp</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* User Profile Card */}
          <div className="p-4">
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-5 text-white">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <Avatar className="h-14 w-14 ring-4 ring-white/20">
                      {session.user.image ? (
                        <AvatarImage src={session.user.image} alt={session.user.name} />
                      ) : null}
                      <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                        {session.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-400 border-2 border-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base truncate">{session.user.name}</p>
                    <p className="text-xs text-white/70 truncate">{session.user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-200 backdrop-blur-sm border border-amber-400/30">
                      <Crown className="h-3 w-3" />
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/20 text-white/90 backdrop-blur-sm">
                      <User className="h-3 w-3" />
                      User
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-4 pb-4 space-y-1">
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main Menu
            </p>

            <NavItem href="/" icon={Home} label="Home" />
            <NavItem href="#profile" icon={User} label="Profile Info" active />
            <NavItem href="#permissions" icon={Shield} label="Permissions" />
            <NavItem href="#update" icon={Settings} label="Update Profile" />
            <NavItem href="#password" icon={Lock} label="Security" />

            {isAdmin && (
              <>
                <Separator className="my-4" />
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Administration
                </p>
                <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Admin Dashboard" highlight />
              </>
            )}

            <Separator className="my-4" />
            <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Actions
            </p>

            <NavItem href="#" icon={Bell} label="Notifications" badge="3" />
            <NavItem href="#" icon={CreditCard} label="Billing" />
            <NavItem href="#" icon={HelpCircle} label="Help & Support" />

            <Separator className="my-4" />
            
            <SignOutButton />
          </nav>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Home className="h-4 w-4" />
              <span>/</span>
              <span className="text-foreground font-medium">Profile</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </Button>
              <Avatar className="h-8 w-8">
                {session.user.image ? (
                  <AvatarImage src={session.user.image} alt={session.user.name} />
                ) : null}
                <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white text-xs">
                  {session.user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="p-8">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Profile Settings
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage your account settings and preferences
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <QuickStatCard
                icon={User}
                label="Account Status"
                value="Active"
                gradient="from-emerald-500 to-teal-600"
              />
              <QuickStatCard
                icon={Shield}
                label="Role"
                value={session.user.role}
                gradient="from-violet-500 to-purple-600"
              />
              <QuickStatCard
                icon={Mail}
                label="Email Status"
                value="Verified"
                gradient="from-blue-500 to-indigo-600"
              />
              <QuickStatCard
                icon={Activity}
                label="Last Active"
                value="Just Now"
                gradient="from-amber-500 to-orange-600"
              />
            </div>

            {/* Profile Info Card */}
            <section id="profile" className="group">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Card Header with Gradient */}
                <div className="relative h-32 bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-size-[250%_250%]" />
                  <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
                </div>
                
                {/* Profile Content */}
                <div className="relative px-8 pb-8">
                  <div className="-mt-16 flex flex-col sm:flex-row sm:items-end gap-6 mb-6">
                    <Avatar className="h-28 w-28 ring-4 ring-white dark:ring-gray-900 shadow-2xl">
                      {session.user.image ? (
                        <AvatarImage src={session.user.image} alt={session.user.name} />
                      ) : null}
                      <AvatarFallback className="bg-linear-to-br from-violet-500 to-purple-600 text-white text-3xl font-bold">
                        {session.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 pt-4 sm:pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <h2 className="text-2xl font-bold">{session.user.name}</h2>
                        {isAdmin && (
                          <Badge className="w-fit bg-linear-to-r from-amber-500 to-orange-500 text-white border-0 gap-1">
                            <Crown className="h-3 w-3" />
                            Admin
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-1">{session.user.email}</p>
                    </div>
                    <Button className="bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25">
                      <Settings className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>

                  {/* Profile Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <ProfileStat label="Member Since" value="Dec 2024" />
                    <ProfileStat label="Last Login" value="Today" />
                    <ProfileStat label="Sessions" value="12" />
                    <ProfileStat label="Status" value="Active" highlight />
                  </div>
                </div>
              </div>
            </section>

            {/* Permissions Card */}
            <section id="permissions">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Access Permissions</h3>
                    <p className="text-sm text-muted-foreground">Your current access level and permissions</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <PermissionItem
                    title="Manage Own Posts"
                    description="Create, edit and delete your own posts"
                    enabled={true}
                    icon={<Zap className="h-4 w-4" />}
                  />
                  <PermissionItem
                    title="Manage All Posts"
                    description="Full access to manage all posts in the system"
                    enabled={FULL_POST_ACCESS.success}
                    icon={<Crown className="h-4 w-4" />}
                  />
                  <PermissionItem
                    title="Admin Access"
                    description="Access to administration dashboard and settings"
                    enabled={isAdmin}
                    icon={<Shield className="h-4 w-4" />}
                  />
                </div>
              </div>
            </section>

            {/* Update Profile Card */}
            <section id="update">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/50 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/25">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Update Profile</h3>
                    <p className="text-sm text-muted-foreground">Change your name and profile picture</p>
                  </div>
                </div>
                <UpdateUserForm
                  name={session.user.name}
                  image={session.user.image ?? ""}
                />
              </div>
            </section>

            {/* Change Password Card */}
            <section id="password">
              <div className="relative overflow-hidden bg-linear-to-br from-rose-500/10 via-orange-500/10 to-amber-500/10 dark:from-rose-500/5 dark:via-orange-500/5 dark:to-amber-500/5 rounded-2xl border-2 border-rose-200/50 dark:border-rose-500/20 shadow-sm hover:shadow-xl transition-all duration-300 p-8">
                {/* Security Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-400">
                    <Lock className="h-3 w-3" />
                    Security Settings
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-rose-500 to-orange-600 shadow-lg shadow-rose-500/25">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-rose-900 dark:text-rose-100">Change Password</h3>
                    <p className="text-sm text-rose-700/70 dark:text-rose-300/70">Update your password to keep your account secure</p>
                  </div>
                </div>
                <ChangePasswordForm />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({
  href,
  icon: Icon,
  label,
  active = false,
  highlight = false,
  badge,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start gap-3 h-11 px-3 transition-all group ${
        active
          ? "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300"
          : highlight
          ? "bg-linear-to-r from-violet-600 to-purple-600 text-white hover:from-violet-700 hover:to-purple-700"
          : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
      asChild
    >
      <Link href={href}>
        <Icon className={`h-4 w-4 shrink-0 ${!highlight && "group-hover:scale-110"} transition-transform`} />
        <span className="flex-1 text-left font-medium">{label}</span>
        {badge && (
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500 text-white">
            {badge}
          </span>
        )}
        {!badge && (
          <ChevronRight className={`h-4 w-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${highlight && "opacity-100"}`} />
        )}
      </Link>
    </Button>
  );
}

// Quick Stat Card Component
function QuickStatCard({
  icon: Icon,
  label,
  value,
  gradient,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  gradient: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 p-4 shadow-sm hover:shadow-lg transition-all duration-300">
      <div className={`absolute inset-0 bg-linear-to-r ${gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br ${gradient} shadow-md`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Profile Stat Component
function ProfileStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`font-semibold ${highlight ? "text-emerald-600 dark:text-emerald-400" : ""}`}>
        {value}
      </p>
    </div>
  );
}

// Permission Item Component
function PermissionItem({
  title,
  description,
  enabled,
  icon,
}: {
  title: string;
  description: string;
  enabled: boolean;
  icon: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
        enabled
          ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
          : "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            enabled
              ? "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400"
          }`}
        >
          {enabled ? <Check className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${enabled ? "text-emerald-900 dark:text-emerald-100" : "text-gray-900 dark:text-gray-100"}`}>
              {title}
            </span>
            <span className={enabled ? "text-emerald-600" : "text-gray-400"}>
              {icon}
            </span>
          </div>
          <p className={`text-xs ${enabled ? "text-emerald-700 dark:text-emerald-300/70" : "text-gray-500"}`}>
            {description}
          </p>
        </div>
      </div>
      <Badge
        className={
          enabled
            ? "bg-emerald-600 text-white border-0"
            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-0"
        }
      >
        {enabled ? "Enabled" : "Disabled"}
      </Badge>
    </div>
  );
}
