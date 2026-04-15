import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";

interface AppUser {
  uid: string;
  email: string;
  name: string;
  type: "free" | "premium" | "admin";
  isPremiumVerified: boolean | null;
}

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AppUser | null>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔁 Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        setUser({ uid: firebaseUser.uid, ...snap.data() } as AppUser);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 LOGIN
  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", res.user.uid);
    const snap = await getDoc(userRef);

    if (snap.exists()) {
      const userData = { uid: res.user.uid, ...snap.data() } as AppUser;
      setUser(userData);
      return userData;
    }

    return null;
  };

  // 📝 SIGNUP
  const signup = async (email: string, password: string, name: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await setDoc(doc(db, "users", res.user.uid), {
      email,
      name,
      type: "free",
      isPremiumVerified: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
