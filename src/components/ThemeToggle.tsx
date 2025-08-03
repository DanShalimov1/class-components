import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value as 'light' | 'dark');
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <label className="text-gray-800 dark:text-gray-200 font-semibold">Theme:</label>
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="theme"
          value="light"
          checked={theme === 'light'}
          onChange={handleChange}
        />
        <span className="text-gray-700 dark:text-gray-300">Light</span>
      </label>
      <label className="flex items-center space-x-1">
        <input
          type="radio"
          name="theme"
          value="dark"
          checked={theme === 'dark'}
          onChange={handleChange}
        />
        <span className="text-gray-700 dark:text-gray-300">Dark</span>
      </label>
    </div>
  );
};

export default ThemeToggle;