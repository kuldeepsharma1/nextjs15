'use client'
import { useTheme } from "next-themes";


const ThemeToggle = () => {
  const {theme, setTheme} = useTheme();
  console.log(theme);
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

  } 

  return (
    <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded">
      {theme === 'light' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;

