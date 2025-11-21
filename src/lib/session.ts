import { auth } from './auth';
import { headers } from 'next/headers';
import { cache } from 'react';
import { redirect } from 'next/navigation';

// ✅ getSession() - Returns session only (null or session)
// Use case: When you want conditional rendering
export const getSession = cache(async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch  {
    return null;
  }
});

// ✅ requireAuth() - Auto redirects if no session
// Use case: For protected pages that require login
export async function requireAuth() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/sign-in');
  }

  return session;
}

// ✅ requireRole() - For role-based access control
export async function requireRole(allowedRoles: string[]) {
  const session = await requireAuth();

  if (!session.user.role || !allowedRoles.includes(session.user.role)) {
    redirect('/unauthorized');
  }

  return session;
}

// ✅ getUser() - Returns user object only = getCurrentUser
export async function getUser() {
  const session = await getSession();
  return session?.user || null;
}
