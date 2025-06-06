import { FcGoogle } from 'react-icons/fc';
import { signInWithGoogle } from '@/lib/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleSignInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { user, error } = await signInWithGoogle();
      
      if (error) {
        console.error('Google sign-in error:', error);
        return;
      }
      
      if (user) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Unexpected error during Google sign-in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FcGoogle className="w-5 h-5" />
      <span>{isLoading ? 'Signing in...' : 'Continue with Google'}</span>
    </button>
  );
} 