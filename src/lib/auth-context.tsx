"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getAuthClient, isAuthConfigured } from "./supabase-auth";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ADMIN_EMAILS = ["admin@invitasyon.com"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    isAdmin: false,
  });

  const refreshUser = useCallback(async () => {
    const client = getAuthClient();
    if (!client) {
      setState({ user: null, loading: false, isAdmin: false });
      return;
    }
    const { data } = await client.auth.getUser();
    const user = data?.user ?? null;
    setState({
      user,
      loading: false,
      isAdmin: user ? ADMIN_EMAILS.includes(user.email ?? "") : false,
    });
  }, []);

  useEffect(() => {
    const client = getAuthClient();
    if (!client) {
      setState({ user: null, loading: false, isAdmin: false });
      return;
    }

    // Check existing session
    client.auth.getSession().then(({ data }) => {
      const user = data?.session?.user ?? null;
      setState({
        user,
        loading: false,
        isAdmin: user ? ADMIN_EMAILS.includes(user.email ?? "") : false,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = client.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      setState({
        user,
        loading: false,
        isAdmin: user ? ADMIN_EMAILS.includes(user.email ?? "") : false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      const client = getAuthClient();
      if (!client) return { error: "Auth not configured" };

      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { error: error.message };
      return {};
    },
    []
  );

  const signUp = useCallback(
    async (email: string, password: string): Promise<{ error?: string }> => {
      const client = getAuthClient();
      if (!client) return { error: "Auth not configured" };

      const { error } = await client.auth.signUp({ email, password });
      if (error) return { error: error.message };
      return {};
    },
    []
  );

  const signOut = useCallback(async () => {
    const client = getAuthClient();
    if (!client) return;
    await client.auth.signOut();
    setState({ user: null, loading: false, isAdmin: false });
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signUp, signOut, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
