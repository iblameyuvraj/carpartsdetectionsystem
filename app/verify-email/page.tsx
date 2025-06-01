'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { sendVerificationEmail, isUserVerified, getCurrentUser } from '@/lib/auth-services';

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [resendCount, setResendCount] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const router = useRouter();

  // Check verification status every 2 seconds
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
        } else {
          setCheckCount(prev => prev + 1);
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    };

    // Initial check
    checkVerification();

    // Set up interval for checking every 2 seconds
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
      alert('Verification email sent! Please check your inbox and spam folder.');
    } catch (error: any) {
      setError(error.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    if (!isVerified) {
      const confirmed = window.confirm(
        'You haven&apos;t verified your email yet. Are you sure you want to go back to login?'
      );
      if (!confirmed) return;
    }
    router.push('/log-in');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">Verify Your Email</h2>
          {userEmail && (
            <p className="mt-2 text-muted-foreground">
              We&apos;ve sent a verification email to <span className="font-medium">{userEmail}</span>
            </p>
          )}
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Please check your email and click the verification link to continue.</p>
            <p className="mt-2">If you don&apos;t see the email:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Check your spam/junk folder</li>
              <li>Make sure the email address is correct</li>
              <li>Wait a few minutes and try again</li>
              <li>Try using a different email provider (Gmail, Outlook, etc.)</li>
            </ul>
          </div>
        </div>

        {isVerified && (
          <div className="bg-green-500/10 text-green-600 p-4 rounded-md animate-fadeIn">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Email verified successfully! Redirecting to dashboard...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleResendVerification}
            disabled={isLoading || resendCount >= 3 || isVerified}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </div>
            ) : (
              `Resend Verification Email ${resendCount > 0 ? `(${3 - resendCount} attempts remaining)` : ''}`
            )}
          </button>

          <button
            onClick={handleBackToLogin}
            className="w-full flex justify-center py-2 px-4 border border-border rounded-md shadow-sm text-sm font-medium text-foreground bg-background hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
} 