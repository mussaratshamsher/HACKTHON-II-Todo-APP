"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { apiClient } from "@/services/api-client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmailAndPassword: typeof signInWithEmailAndPassword;
  registerWithEmailAndPassword: typeof createUserWithEmailAndPassword;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        const token = await user.getIdToken();
        apiClient.setToken(token);
      } else {
        apiClient.setToken(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const logout = async () => {
    try {
      // Call the backend logout endpoint
      await apiClient.post('/users/logout');
      // Sign out from Firebase
      await signOut(auth);
      // Clear the token from apiClient
      apiClient.setToken(null);
    } catch (error) {
      console.error("Error signing out: ", error);
      // Optionally, handle error, but still attempt client-side sign out
      await signOut(auth);
      apiClient.setToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmailAndPassword: (email, password) => signInWithEmailAndPassword(auth, email, password),
        registerWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(auth, email, password),
        signInWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
