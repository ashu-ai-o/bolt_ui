import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      role="switch"
      aria-checked={theme === 'dark'}
    >
      {/* Toggle Track */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 dark:opacity-100 transition-opacity duration-300" />
      
      {/* Toggle Thumb */}
      <div className={`relative z-10 w-5 h-5 bg-white dark:bg-gray-800 rounded-full shadow-lg transform transition-all duration-300 ease-in-out flex items-center justify-center ${
        theme === 'dark' ? 'translate-x-3' : '-translate-x-3'
      }`}>
        {/* Theme Icons */}
        <Sun 
          size={12} 
          className={`absolute text-yellow-500 transition-all duration-300 ${
            theme === 'light' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-180'
          }`} 
        />
        <Moon 
          size={12} 
          className={`absolute text-blue-400 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-180'
          }`} 
        />
      </div>
      
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
        theme === 'dark' 
          ? 'shadow-lg shadow-blue-500/25' 
          : 'shadow-md shadow-yellow-500/25'
      }`} />
    </button>
  );
}