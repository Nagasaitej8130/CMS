"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="font-bold text-lg">
          MyCMS
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/blogs">Blogs</Link>
          <Link href="/admin">Admin</Link>
          <ThemeToggle />
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Sidebar (Right Side ONLY on mobile) */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 z-50 md:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">
          <button
            onClick={() => setOpen(false)}
            className="text-xl self-end"
          >
            ✕
          </button>

          <nav className="flex flex-col gap-4 text-lg">
            <Link href="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link href="/blogs" onClick={() => setOpen(false)}>
              Blogs
            </Link>
            <Link href="/admin" onClick={() => setOpen(false)}>
              Admin
            </Link>

            <ThemeToggle />
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}
    </nav>
  );
}