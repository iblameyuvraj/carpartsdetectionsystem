import { auth, db, getUserDoc, usersCollection } from '@/lib/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  fetchSignInMethodsForEmail
} from 'firebase/auth';
import { getDoc, doc, enableNetwork, disableNetwork } from 'firebase/firestore';

// Enable offline persistence
const enableOfflinePersistence = async () => {
  try {
    await enableNetwork(db);
  } catch (error) {
    console.error('Error enabling network:', error);
  }
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (error: any) {
    console.error('Google sign-in error:', error);
    return { user: null, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Ensure network is enabled
    await enableOfflinePersistence();
    
    const methods = await fetchSignInMethodsForEmail(auth, email);
    
    if (methods.length === 0) {
      throw new Error('ACCOUNT_NOT_FOUND');
    }

    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    if (error.message === 'ACCOUNT_NOT_FOUND') {
      throw new Error('ACCOUNT_NOT_FOUND');
    }
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string) => {
  // Ensure network is enabled
  await enableOfflinePersistence();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = () => signOut(auth); 