import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  sendEmailVerification,
  onAuthStateChanged,
  reload,
  ActionCodeSettings,
  UserCredential
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// Sign up with email and password
export const signUp = async (email: string, password: string, displayName: string): Promise<User> => {
  try {
    console.log('Starting sign up process for:', email);
    
    // Create user
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User created successfully:', user.uid);
    
    // Update profile with display name
    try {
      await updateProfile(user, { displayName });
      console.log('Profile updated with display name:', displayName);
    } catch (profileError: any) {
      console.error('Error updating profile:', profileError);
      // Continue with signup even if profile update fails
    }
    
    // Send verification email with proper error handling
    try {
      console.log('Preparing to send verification email...');
      
      // Send verification email without action code settings first
      await sendEmailVerification(user);
      console.log('Verification email sent successfully to:', email);
      
      // Force reload user to get latest verification status
      await user.reload();
      console.log('User reloaded after verification email');
      
      return user;
    } catch (verificationError: any) {
      console.error('Error sending verification email:', {
        code: verificationError.code,
        message: verificationError.message,
        fullError: verificationError
      });
      
      // Try sending verification email again with action code settings
      try {
        const actionCodeSettings: ActionCodeSettings = {
          url: `${window.location.origin}/dashboard`,
          handleCodeInApp: true
        };
        
        await sendEmailVerification(user, actionCodeSettings);
        console.log('Verification email sent successfully with action code settings');
        return user;
      } catch (retryError: any) {
        console.error('Error sending verification email on retry:', retryError);
        // If both attempts fail, we should still allow the signup to complete
        // but inform the user they may need to request a new verification email
        return user;
      }
    }
  } catch (error: any) {
    console.error('Signup error:', {
      code: error.code,
      message: error.message,
      fullError: error
    });
    throw error;
  }
};

// Sign in with email and password
export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Force reload user to get latest verification status
    await user.reload();

    // Check if user is verified
    if (!user.emailVerified) {
      // If not verified, sign them out and throw error
      await signOut(auth);
      throw new Error('Please verify your email before logging in. Check your inbox for the verification link.');
    }

    // Update last login
    await setDoc(doc(db, 'users', user.uid), {
      lastLogin: new Date().toISOString()
    }, { merge: true });

    return user;
  } catch (error: any) {
    console.error('Sign in error:', error);
    
    // Handle specific Firebase error codes
    switch (error.code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        throw new Error('Invalid email or password. Please try again.');
      case 'auth/too-many-requests':
        throw new Error('Too many failed attempts. Please try again later.');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled. Please contact support.');
      case 'auth/network-request-failed':
        throw new Error('Network error. Please check your internet connection.');
      default:
        throw error;
    }
  }
};

// Sign out
export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', {
      code: error.code,
      message: error.message
    });
    throw error;
  }
};

// Reset password
export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error resetting password:', {
      code: error.code,
      message: error.message
    });
    throw error;
  }
};

// Get current user with fresh verification status
export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
    }
    return auth.currentUser;
  } catch (error: any) {
    console.error('Error getting current user:', {
      code: error.code,
      message: error.message
    });
    return null;
  }
};

// Send verification email
export const sendVerificationEmail = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user is currently signed in');
    }
    
    if (user.emailVerified) {
      console.log('User is already verified');
      return true;
    }
    
    console.log('Preparing to send verification email to:', user.email);
    
    // Try sending without action code settings first
    try {
      await sendEmailVerification(user);
      console.log('Verification email sent successfully');
      return true;
    } catch (error: any) {
      console.log('First attempt failed, trying with action code settings...');
      
      // If first attempt fails, try with action code settings
      const actionCodeSettings: ActionCodeSettings = {
        url: `${window.location.origin}/verify-email`,
        handleCodeInApp: true
      };
      
      await sendEmailVerification(user, actionCodeSettings);
      console.log('Verification email sent successfully with action code settings');
      
      // Force reload user to get latest verification status
      await user.reload();
      console.log('User reloaded after sending verification email');
      
      return true;
    }
  } catch (error: any) {
    console.error('Error sending verification email:', {
      code: error.code,
      message: error.message,
      fullError: error
    });
    throw error;
  }
};

// Check if user is verified
export const isUserVerified = async (): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    // Check both Firebase auth verification and our database verification
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();
    
    // Only return true if both Firebase and our database show verified
    return user.emailVerified && userData?.isVerified === true;
  } catch (error) {
    console.error('Error checking verification status:', error);
    return false;
  }
};

// Subscribe to auth state changes
export const subscribeToAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const checkAndUpdateVerification = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return false;

    // Force reload user to get latest verification status
    await user.reload();
    
    // If Firebase shows verified, update our database
    if (user.emailVerified) {
      await setDoc(doc(db, 'users', user.uid), {
        isVerified: true,
        verifiedAt: new Date().toISOString()
      }, { merge: true });
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking verification:', error);
    return false;
  }
}; 