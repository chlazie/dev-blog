"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { Input } from "@/app/components/ui/input";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  PenSquare,
  Settings,
} from "lucide-react";
import ThemeChanger from "./ThemeChanger";

export default function Header() {
  const { user, signOut, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) return null;

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4 py-3 md:py-4">
        {/* 🌈 Logo */}
        <Link href="/" className="flex items-center gap-1 text-2xl font-bold">
          <h1 className="text-black dark:text-white">DEV</h1>
          <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400 text-white">
            Hood
          </span>
        </Link>

        {/* 🧭 Center Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link href="/community" className="hover:text-indigo-500 transition">
            Community
          </Link>
          {user && (
            <>
              <Link
                href="/dashboard"
                className="hover:text-indigo-500 transition"
              >
                Dashboard
              </Link>
              <Link href="/write" className="hover:text-indigo-500 transition">
                Create
              </Link>
            </>
          )}
        </nav>

        {/* 🔍 Search Bar + Auth Controls */}
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search..."
            className="hidden md:block w-48 md:w-64"
          />
          <ThemeChanger />

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((p) => !p)}
                className="flex items-center border rounded-full overflow-hidden hover:ring-2 ring-indigo-500 transition"
              >
                <img
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="Avatar"
                  className="w-9 h-9 object-cover"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg overflow-hidden">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-muted transition"
                  >
                    <Settings size={16} /> Account
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-muted text-red-500 transition"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-indigo-500 transition">
                Log In
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400 text-white rounded-lg px-4 py-2 hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* 🍔 Mobile Menu */}
          <button
            className="md:hidden ml-2"
            onClick={() => setMenuOpen((p) => !p)}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 📱 Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center gap-3 py-4 border-t border-border bg-background">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link href="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>
          {user && (
            <>
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/write" onClick={() => setMenuOpen(false)}>
                Create
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
