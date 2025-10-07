// src/app/ClientLayout.tsx
"use client";

import { AuthProvider } from '@/lib/appwrite/AuthContext';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
