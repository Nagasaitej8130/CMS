"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const root = document.documentElement;

    if (saved === "dark") {
      root.classList.add("dark");
      setDark(true);
    } else {
      root.classList.remove("dark");
      setDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="border px-3 py-1 rounded text-sm"
    >
      {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}