'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/lib/types';
import axios from 'axios';

interface AppContextType {
  getuser: () => Promise<void>;
  user: User | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('Admin');
  const [isDark, setIsDark] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<User | null>(null);

  const getuser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    getuser();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <AppContext.Provider value={{ getuser, user, role, setRole, isDark, toggleDark }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
