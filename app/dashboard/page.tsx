'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth-services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardPage() {
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.displayName) {
      setUserName(user.displayName);
    } else if (user?.email) {
      setUserName(user.email.split('@')[0]);
    }
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome{userName ? `, ${userName}` : ""}! 👋
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              You've successfully logged into your dashboard.
            </p>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm">
                This is your personal space. You can start exploring the features available to you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
