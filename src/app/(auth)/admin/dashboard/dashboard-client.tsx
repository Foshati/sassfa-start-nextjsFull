"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  UserCheck,
  TrendingUp,
  Search,
  Trash2,
  ChevronDown,
  CheckCircle2,
  Mail,
  LayoutDashboard,
  Settings,
  Home,
  ChevronRight,
  Activity,
  BarChart3,
  UserPlus,
  Clock,
  MoreVertical,
  Edit3,
  Eye,
  Ban,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteUserAction } from "@/actions/delete-user.action";
import { admin } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { UserRole } from "../../../../../prisma/generated/client";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  image?: string | null;
  emailVerified?: boolean;
  createdAt?: string | Date;
}

interface DashboardClientProps {
  users: User[];
  currentUserId: string;
  currentUserName: string;
  currentUserEmail: string;
  currentUserImage?: string | null;
}

// Animated Number Component
function AnimatedNumber({ value }: { value: number }) {
  return <span className="tabular-nums">{value}</span>;
}

// Premium Stats Card Component
function StatsCard({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  accentColor,
}: {
  title: string;
  value: number;
  icon: React.ElementType;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  accentColor: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Gradient Glow Effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${accentColor} blur-3xl -z-10`} />
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <Icon className="w-full h-full" />
      </div>
      
      <div className="relative flex items-start justify-between">
        <div className="space-y-3">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${accentColor} bg-opacity-10 dark:bg-opacity-20`}>
            <Icon className={`w-6 h-6 ${accentColor.replace('bg-', 'text-')}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1 tracking-tight">
              <AnimatedNumber value={value} />
            </p>
          </div>
        </div>
        
        {change && (
          <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
            changeType === "positive" 
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              : changeType === "negative"
              ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
              : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
          }`}>
            {changeType === "positive" && <TrendingUp className="w-3 h-3" />}
            {change}
          </div>
        )}
      </div>
    </div>
  );
}

// Quick Action Card
function QuickActionCard({
  title,
  description,
  icon: Icon,
  href,
  gradient,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  gradient: string;
}) {
  return (
    <Link href={href}>
      <div className={`group relative overflow-hidden rounded-2xl p-6 ${gradient} transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer" />
        
        <div className="relative flex items-center gap-4">
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-white truncate">{title}</h3>
            <p className="text-sm text-white/70 truncate">{description}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}

// Role Badge Component
function RoleBadge({ role }: { role: UserRole }) {
  if (role === "ADMIN") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25">
        <Shield className="w-3 h-3" />
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
      <UserCheck className="w-3 h-3" />
      User
    </span>
  );
}

// User Row Actions Dropdown
function UserActions({ 
  userId,
  role, 
  disabled,
  onDelete,
  onRoleChange,
}: { 
  userId: string;
  role: UserRole;
  disabled: boolean;
  onDelete: () => void | Promise<void>;
  onRoleChange: (newRole: UserRole) => void | Promise<void>;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="gap-2">
          <Eye className="h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2">
          <Edit3 className="h-4 w-4" />
          Edit User
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="gap-2"
          disabled={role === "ADMIN"}
          onClick={() => onRoleChange(role === "ADMIN" ? "USER" : "ADMIN")}
        >
          <Shield className="h-4 w-4" />
          {role === "ADMIN" ? "Demote to User" : "Promote to Admin"}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-2" disabled={disabled}>
          <Ban className="h-4 w-4" />
          Suspend User
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="gap-2 text-destructive focus:text-destructive"
          disabled={disabled}
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// User Table Row Component
function UserRow({ 
  user, 
  isCurrentUser,
  onRoleChange,
}: { 
  user: User; 
  isCurrentUser: boolean;
  onRoleChange: (userId: string, newRole: UserRole) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (user.role === "ADMIN" || isCurrentUser) return;
    
    setIsPending(true);
    const res = await deleteUserAction({ userId: user.id });

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("User deleted successfully");
      router.refresh();
    }
    setIsPending(false);
  }

  async function handleRoleChange(newRole: UserRole) {
    const canChangeRole = await admin.hasPermission({
      permissions: {
        user: ["set-role"],
      },
    });

    if (!canChangeRole.error) {
      toast.error("Forbidden");
      return;
    }

    await admin.setRole({
      userId: user.id,
      role: newRole,
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => { toast.error(ctx.error.message); },
        onSuccess: () => {
          toast.success("User role updated");
          router.refresh();
        },
      },
    });
  }

  const joinedDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      })
    : "N/A";

  return (
    <tr className={`group border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-violet-50/50 hover:to-purple-50/50 dark:hover:from-violet-950/20 dark:hover:to-purple-950/20 transition-all duration-300 ${isPending ? "opacity-50" : ""}`}>
      {/* User Info */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-11 w-11 ring-2 ring-violet-500/20 ring-offset-2 ring-offset-background">
              {user.image ? (
                <AvatarImage src={user.image} alt={user.name} />
              ) : null}
              <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold text-sm">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {/* Online Indicator */}
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-gray-900" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
              {isCurrentUser && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                  You
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">ID: {user.id.slice(0, 8)}...</p>
          </div>
        </div>
      </td>

      {/* Email */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{user.email}</span>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <RoleBadge role={user.role} />
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        {user.emailVerified ? (
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Verified</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-500" />
            <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Pending</span>
          </div>
        )}
      </td>

      {/* Joined */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {joinedDate}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <UserActions 
          userId={user.id}
          role={user.role}
          disabled={user.role === "ADMIN" || isCurrentUser}
          onDelete={handleDelete}
          onRoleChange={handleRoleChange}
        />
      </td>
    </tr>
  );
}

// Navigation Item
function NavItem({ 
  href, 
  icon: Icon, 
  label, 
  active = false,
}: { 
  href: string; 
  icon: React.ElementType; 
  label: string;
  active?: boolean;
}) {
  return (
    <Link href={href}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}>
        <Icon className={`h-5 w-5 ${active ? "" : "group-hover:scale-110"} transition-transform`} />
        <span className="font-medium">{label}</span>
        {active && <ChevronRight className="h-4 w-4 ml-auto" />}
      </div>
    </Link>
  );
}

// Main Dashboard Client Component
export function DashboardClient({ 
  users, 
  currentUserId,
  currentUserName,
  currentUserEmail,
  currentUserImage,
}: DashboardClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Calculate stats
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const adminUsers = users.filter((u) => u.role === "ADMIN").length;
    const regularUsers = users.filter((u) => u.role === "USER").length;
    const verifiedUsers = users.filter((u) => u.emailVerified).length;
    
    // Calculate new users this week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const newThisWeek = users.filter((u) => {
      if (!u.createdAt) return false;
      const createdAt = new Date(u.createdAt);
      return createdAt >= oneWeekAgo;
    }).length;

    return { totalUsers, adminUsers, regularUsers, newThisWeek, verifiedUsers };
  }, [users]);

  // Filter users based on search
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.id.toLowerCase().includes(query)
    );
  }, [users, searchQuery]);

  // Sort users (admins first)
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      if (a.role === "ADMIN" && b.role !== "ADMIN") return -1;
      if (a.role !== "ADMIN" && b.role === "ADMIN") return 1;
      return 0;
    });
  }, [filteredUsers]);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    router.refresh();
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
        <ScrollArea className="h-full">
          {/* Logo Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 shadow-lg shadow-violet-500/25">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">User Management</p>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30">
              <Avatar className="h-10 w-10 ring-2 ring-violet-500/20">
                {currentUserImage ? (
                  <AvatarImage src={currentUserImage} alt={currentUserName} />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-bold">
                  {currentUserName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{currentUserName}</p>
                <p className="text-xs text-muted-foreground truncate">{currentUserEmail}</p>
              </div>
              <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white border-0 text-[10px]">
                Admin
              </Badge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Menu
            </p>
            <NavItem href="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" active />
            <NavItem href="/profile" icon={Settings} label="Profile Settings" />
            <NavItem href="/" icon={Home} label="Back to Home" />
          </nav>

          <Separator className="mx-4" />

          {/* Quick Stats */}
          <div className="p-4">
            <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Quick Stats
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-violet-500" />
                  <span className="text-sm">Total Users</span>
                </div>
                <span className="font-bold text-violet-600">{stats.totalUsers}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-sm">Verified</span>
                </div>
                <span className="font-bold text-emerald-600">{stats.verifiedUsers}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">New This Week</span>
                </div>
                <span className="font-bold text-blue-600">{stats.newThisWeek}</span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Home className="h-4 w-4" />
              <span>/</span>
              <span>Admin</span>
              <span>/</span>
              <span className="text-foreground font-medium">Dashboard</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Welcome Back, {currentUserName.split(" ")[0]}! 👋
                </h1>
                <p className="text-muted-foreground mt-1">
                  Here&apos;s what&apos;s happening with your users today.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {new Date().toLocaleDateString("en-US", { weekday: "long" })}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date().toLocaleDateString("en-US", { 
                      month: "long", 
                      day: "numeric", 
                      year: "numeric" 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatsCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              change="+12%"
              changeType="positive"
              accentColor="bg-violet-500"
            />
            <StatsCard
              title="Administrators"
              value={stats.adminUsers}
              icon={Shield}
              accentColor="bg-amber-500"
            />
            <StatsCard
              title="Regular Users"
              value={stats.regularUsers}
              icon={UserCheck}
              change="+5%"
              changeType="positive"
              accentColor="bg-emerald-500"
            />
            <StatsCard
              title="New This Week"
              value={stats.newThisWeek}
              icon={UserPlus}
              accentColor="bg-blue-500"
            />
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <QuickActionCard
              title="User Analytics"
              description="View detailed user statistics"
              icon={BarChart3}
              href="#"
              gradient="bg-gradient-to-br from-violet-500 to-purple-600"
            />
            <QuickActionCard
              title="Activity Logs"
              description="Monitor user activities"
              icon={Activity}
              href="#"
              gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
            />
            <QuickActionCard
              title="System Settings"
              description="Configure system preferences"
              icon={Settings}
              href="#"
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
            />
          </div>

          {/* Users Table */}
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/50 dark:border-gray-800 shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold">User Management</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Manage and monitor all registered users
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-violet-500"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-lg shadow-violet-500/25">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800/50 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Joined</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.map((user) => (
                    <UserRow 
                      key={user.id} 
                      user={user} 
                      isCurrentUser={user.id === currentUserId}
                      onRoleChange={handleRoleChange}
                    />
                  ))}
                </tbody>
              </table>

              {sortedUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">No users found</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {searchQuery
                      ? `No users match "${searchQuery}". Try a different search.`
                      : "There are no users in the system yet."}
                  </p>
                </div>
              )}
            </div>

            {/* Table Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{sortedUsers.length}</span> of{" "}
                <span className="font-semibold text-foreground">{users.length}</span> users
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
