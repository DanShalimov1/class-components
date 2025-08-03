import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import About from './pages/About';
import { useLocalStorage } from './hooks/useLocalStorage';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="p-4">
        <ThemeToggle />
      </div>

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} onSearch={setSearchTerm} />} />
        <Route path="/pokemon/:name" element={<Details />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
