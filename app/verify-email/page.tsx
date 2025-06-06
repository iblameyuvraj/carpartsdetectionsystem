'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendVerificationEmail, isUserVerified, getCurrentUser } from '@/lib/auth-services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [resendCount, setResendCount] = useState(0);
  const router = useRouter();

  // Check verification status every 20 seconds
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          router.push('/log-in');
          return;
        }
        
        setUserEmail(user.email);
        const verified = await isUserVerified();
        setIsVerified(verified);
        
        if (verified) {
          // Show success message before redirecting
          setError(null);
          setTimeout(() => {
            router.push('/dashboard');
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    };

    // Initial check
    checkVerification();

    // Set up interval for checking every 20 seconds
    const interval = setInterval(checkVerification, 20000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [router]);

  const handleResendVerification = async () => {
    if (resendCount >= 3) {
      setError('Too many attempts. Please wait a few minutes before trying again.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await sendVerificationEmail();
      setResendCount(prev => prev + 1);
      setError('Verification email sent! Please check your inbox and spam folder.');
    } catch (error: any) {
      setError(error.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (!isVerified) {
      const confirmed = window.confirm(
        'You haven\'t verified your email yet. Are you sure you want to go back to login?'
      );
      if (!confirmed) return;
    }
    router.push('/log-in');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <CardDescription>
            {userEmail ? (
              <>Please verify your email address ({userEmail}) to continue.</>
            ) : (
              'Please verify your email address to continue.'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isVerified ? (
            <div className="rounded-md bg-green-500/10 p-4 text-green-600 dark:text-green-400">
              <p>Email verified successfully! Redirecting to dashboard...</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                We've sent you a verification email. Please check your inbox and click the verification link.
              </p>
              {error && (
                <div className={`rounded-md p-4 ${
                  error.includes('sent') 
                    ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
                }`}>
                  {error}
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          {!isVerified && (
            <Button
              onClick={handleResendVerification}
              disabled={isLoading || resendCount >= 3}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Resend Verification Email'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleBackToLogin}
            className="w-full"
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 