import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/firebase';

type UserType = 'free' | 'premium' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  type: UserType;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, type: 'free' | 'premium') => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);
      
      if (firebaseUser) {
        // Get user data from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            name: userData.name || firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            type: userData.type || 'free',
          });
        } else {
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || '',
            email: firebaseUser.email || '',
            type: 'free',
          });
        }
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const signup = useCallback(async (
    name: string, 
    email: string, 
    password: string, 
    type: 'free' | 'premium'
  ): Promise<boolean> => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Update profile with name
      await updateProfile(newUser, { displayName: name });

      // Create user document in Firestore
      await setDoc(doc(db, 'users', newUser.uid), {
        name,
        email,
        type,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isPremiumVerified: type === 'premium' ? false : null,
      });

      // If premium, create payment verification request
      if (type === 'premium') {
        await setDoc(doc(db, 'paymentRequests', newUser.uid), {
          userId: newUser.uid,
          name,
          email,
          status: 'pending',
          submittedAt: serverTimestamp(),
          amount: '₱149',
          paymentMethod: null,
          receiptId: null,
        });
      }

      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
      isLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
