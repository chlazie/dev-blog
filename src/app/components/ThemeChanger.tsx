// src/app/components/ThemeChanger.tsx
"use client";
import { useState, useEffect } from 'react'; // Import useState and useEffect
import { useTheme } from 'next-themes';

export default function ThemeChanger() {
  const [mounted, setMounted] = useState(false); // Add mounted state
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component has mounted
  }, []);

  if (!mounted) {
    // Return null or a placeholder to prevent rendering mismatched HTML
    return null;
  }

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
