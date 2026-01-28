"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  LogOut,
  Settings,
  Shield,
  LayoutDashboard,
  Mail,
  Calendar,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { signOut, updateUser } from "@/lib/auth-client";
import { changePasswordAction } from "@/actions/change-password.action";
import { toast } from "sonner";

interface UserButtonProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    role: string;
    emailVerified?: boolean;
  };
}

export function UserButton({ user }: UserButtonProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const isAdmin = user.role === "ADMIN";

  return (
    <>
      {/* Avatar Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="relative group"
      >
        <Avatar className="h-9 w-9 ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer">
          {user.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : null}
          <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white font-semibold text-sm">
            {user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
      </button>

      {/* Profile Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 gap-0 overflow-hidden">
          {/* Header with gradient */}
          <div className="relative h-24 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%]" />
          </div>

          {/* User Info */}
          <div className="relative px-6 pb-4">
            <div className="-mt-12 flex items-end gap-4 mb-4">
              <Avatar className="h-20 w-20 ring-4 ring-background shadow-xl">
                {user.image ? (
                  <AvatarImage src={user.image} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl font-bold">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="pb-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{user.name}</h2>
                  {isAdmin && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[10px] px-1.5 py-0">
                      <Shield className="h-2.5 w-2.5 mr-0.5" />
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="account" className="flex-1 gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="security" className="flex-1 gap-1.5">
                  <Lock className="h-3.5 w-3.5" />
                  Security
                </TabsTrigger>
              </TabsList>

              {/* Account Tab */}
              <TabsContent value="account" className="mt-4 space-y-4">
                {/* User Details */}
                <div className="space-y-3 p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                    {user.emailVerified && (
                      <Badge variant="outline" className="ml-auto text-xs text-emerald-600 border-emerald-200 bg-emerald-50">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <Separator />
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Role</p>
                      <p className="text-sm font-medium">{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Update Profile Form */}
                <UpdateProfileSection 
                  name={user.name} 
                  image={user.image ?? ""} 
                  onSuccess={() => router.refresh()}
                />

                {isAdmin && (
                  <>
                    <Separator />
                    <Link href="/admin/dashboard" onClick={() => setOpen(false)}>
                      <Button variant="outline" className="w-full gap-2">
                        <LayoutDashboard className="h-4 w-4" />
                        Admin Dashboard
                      </Button>
                    </Link>
                  </>
                )}
              </TabsContent>

              {/* Security Tab */}
              <TabsContent value="security" className="mt-4 space-y-4">
                <ChangePasswordSection />
              </TabsContent>
            </Tabs>

            <Separator className="my-4" />

            {/* Sign Out */}
            <SignOutSection onSuccess={() => {
              setOpen(false);
              router.push("/auth/login");
            }} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// Update Profile Section Component
function UpdateProfileSection({ 
  name, 
  image, 
  onSuccess 
}: { 
  name: string; 
  image: string; 
  onSuccess: () => void;
}) {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);
    const newName = String(formData.get("name"));
    const newImage = String(formData.get("image"));

    if (!newName && !newImage) {
      return toast.error("Please enter a name or image");
    }

    await updateUser({
      ...(newName && { name: newName }),
      image: newImage,
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => { toast.error(ctx.error.message); },
        onSuccess: () => {
          toast.success("Profile updated successfully");
          onSuccess();
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="modal-name" className="text-xs">Name</Label>
        <Input 
          id="modal-name" 
          name="name" 
          defaultValue={name} 
          className="h-9 text-sm"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="modal-image" className="text-xs">Image URL</Label>
        <Input 
          id="modal-image" 
          name="image" 
          defaultValue={image} 
          placeholder="https://..."
          className="h-9 text-sm"
        />
      </div>
      <Button 
        type="submit" 
        size="sm"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
      >
        <Settings className="h-3.5 w-3.5 mr-1.5" />
        Update Profile
      </Button>
    </form>
  );
}

// Change Password Section Component
function ChangePasswordSection() {
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const formData = new FormData(evt.target as HTMLFormElement);

    setIsPending(true);
    const { error } = await changePasswordAction(formData);

    if (error) {
      toast.error(error);
    } else {
      toast.success("Password changed successfully");
      (evt.target as HTMLFormElement).reset();
    }
    setIsPending(false);
  }

  return (
    <div className="space-y-3 p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-800/30">
      <div className="flex items-center gap-2 mb-3">
        <Lock className="h-4 w-4 text-rose-600" />
        <span className="text-sm font-semibold text-rose-900 dark:text-rose-100">Change Password</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-currentPassword" className="text-xs">Current Password</Label>
          <Input 
            type="password" 
            id="modal-currentPassword" 
            name="currentPassword" 
            className="h-9 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="modal-newPassword" className="text-xs">New Password</Label>
          <Input 
            type="password" 
            id="modal-newPassword" 
            name="newPassword" 
            className="h-9 text-sm"
          />
        </div>
        <Button 
          type="submit" 
          size="sm"
          variant="destructive"
          disabled={isPending}
          className="w-full"
        >
          <Lock className="h-3.5 w-3.5 mr-1.5" />
          Change Password
        </Button>
      </form>
    </div>
  );
}

// Sign Out Section Component
function SignOutSection({ onSuccess }: { onSuccess: () => void }) {
  const [isPending, setIsPending] = useState(false);

  async function handleSignOut() {
    await signOut({
      fetchOptions: {
        onRequest: () => setIsPending(true),
        onResponse: () => setIsPending(false),
        onError: (ctx) => { toast.error(ctx.error.message); },
        onSuccess: () => {
          toast.success("You've logged out. See you soon!");
          onSuccess();
        },
      },
    });
  }

  return (
    <Button 
      onClick={handleSignOut}
      variant="ghost" 
      size="sm"
      disabled={isPending}
      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  );
}
