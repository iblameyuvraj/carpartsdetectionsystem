'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, subscribeToAuthChanges } from '@/lib/auth-services';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireVerification?: boolean;
}

export default function ProtectedRoute({ 
  children, 
  requireVerification = true 
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getCurrentUser();
        
        if (!user) {
          router.push('/log-in');
          return;
        }

        // Force refresh the user to get the latest emailVerified status
        await user.reload();
        
        if (requireVerification && !user.emailVerified) {
          router.push('/verify-email');
          return;
        }

        setIsVerified(user.emailVerified);
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/verify-email');
      }
    };

    // Initial check
    checkAuth();

    // Subscribe to auth state changes
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (!user) {
        router.push('/log-in');
        return;
      }

      if (requireVerification && !user.emailVerified) {
        router.push('/verify-email');
        return;
      }

      setIsVerified(user.emailVerified);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router, requireVerification]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (requireVerification && !isVerified) {
    return null;
  }

  return <>{children}</>;
} 