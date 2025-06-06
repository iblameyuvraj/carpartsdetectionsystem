import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { generateToken, JWTPayload } from '@/lib/jwt';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser(user);
          // Generate JWT token
          const payload: JWTPayload = {
            uid: user.uid,
            email: user.email!,
            name: user.displayName || undefined,
          };
          const newToken = generateToken(payload);
          setToken(newToken);
          // Store token in localStorage
          localStorage.setItem('auth_token', newToken);
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem('auth_token');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    });

    // Check for existing token on mount
    const existingToken = localStorage.getItem('auth_token');
    if (existingToken) {
      setToken(existingToken);
    }

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 