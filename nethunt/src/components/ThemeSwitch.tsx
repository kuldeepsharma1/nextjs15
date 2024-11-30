'use client';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="p-2 rounded bg-gray-800 text-slate-200 hover:bg-gray-700 focus:outline-none"
    >
      {theme === 'light' ? (
        // Orange Sun icon for light theme
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="orange"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1.5M16.5 12H18m-6 6v1.5m-4.5-7.5H6m2.121-5.121l-1.06-1.06m9.9 1.06l-1.06-1.06M8.464 19.536l-1.06 1.06m9.9-1.06l-1.06 1.06M12 9a3 3 0 100 6 3 3 0 000-6z"
          />
        </svg>
      ) : (
        // Orange Moon icon for dark theme
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="orange"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.718 9.718 0 012.248 15a9.718 9.718 0 019.752-6.752 7.26 7.26 0 00.007 14.502A7.26 7.26 0 0012 4.252a9.718 9.718 0 019.752 10.75z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeSwitch;
