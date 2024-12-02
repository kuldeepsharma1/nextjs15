'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Toggle
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      onClick={toggleTheme} // Use Toggle as the click handler
      className="p-2 ml-2 bg-zinc-200 dark:bg-zinc-200 dark:text-black flex items-center justify-center gap-2 rounded-full"
    >
      {theme === 'light' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      <span className="sr-only">{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
    </Toggle>
  );
}
