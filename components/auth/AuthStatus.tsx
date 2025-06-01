'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser, signOutUser } from '@/lib/auth-services';
import { useRouter } from 'next/navigation';

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      setUser(null);
      router.push('/log-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-card rounded-lg shadow">
        <p>Loading auth status...</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-card rounded-lg shadow">
      {user ? (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Authentication Status</h2>
          <div className="space-y-2">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Display Name:</strong> {user.displayName || 'Not set'}</p>
            <p><strong>Email Verified:</strong> {user.emailVerified ? 'Yes' : 'No'}</p>
            <p><strong>User ID:</strong> {user.uid}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-destructive text-white rounded hover:bg-destructive/90 transition-colors"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Not Authenticated</h2>
          <p>You are not logged in.</p>
          <div className="space-x-4">
            <button
              onClick={() => router.push('/log-in')}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => router.push('/sign-up')}
              className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 