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
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { apiClient } from "@/services/api-client";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
  registerWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
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
      // Call the backend logout endpoint first with the current valid token
      await apiClient.request('/users/logout', { method: 'POST' });
      // Then sign out from Firebase
      await signOut(auth);
      // Clear the token from apiClient (this will also be done by onAuthStateChanged)
      apiClient.setToken(null);
    } catch (error) {
      console.error("Error signing out: ", error);
      // Even if backend call fails, attempt client-side sign out
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
