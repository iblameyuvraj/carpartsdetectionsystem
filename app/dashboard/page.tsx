'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { getCurrentUser } from '@/lib/auth-services';
import { User } from 'firebase/auth';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen p-8">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {user && (
          <div className="bg-card p-4 rounded-lg shadow">
            <p>Welcome, {user.displayName || user.email}!</p>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
} 