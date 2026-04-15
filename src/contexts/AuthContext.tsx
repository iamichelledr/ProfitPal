import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
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
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AppUser | null>;
  signup: (
    email: string,
    password: string,
    name: string,
    selectedPlan?: "free" | "premium"
  ) => Promise<AppUser | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserDoc = async (uid: string) => {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) return null;

    return {
      uid,
      ...snap.data(),
    } as AppUser;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const userData = await getUserDoc(firebaseUser.uid);
        setUser(userData);
      } catch (error) {
        console.error("Error loading auth user:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const userData = await getUserDoc(res.user.uid);
    setUser(userData);
    return userData;
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    selectedPlan: "free" | "premium" = "free"
  ) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const userPayload: Omit<AppUser, "uid"> & {
      createdAt: unknown;
      updatedAt: unknown;
    } = {
      email,
      name,
      type: "free",
      isPremiumVerified: selectedPlan === "premium" ? false : null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(doc(db, "users", res.user.uid), userPayload);

    const userData: AppUser = {
      uid: res.user.uid,
      email,
      name,
      type: "free",
      isPremiumVerified: selectedPlan === "premium" ? false : null,
    };

    setUser(userData);
    return userData;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoading: loading,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
