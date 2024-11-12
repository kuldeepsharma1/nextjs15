'use client'
import { useTheme } from '@/contexts/ThemeContext';


const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} aria-label="Toggle Theme" className="p-2 rounded">
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeSwitch;
