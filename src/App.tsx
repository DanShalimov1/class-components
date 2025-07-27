import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Details from './pages/Details';
import About from './pages/About';
import { useLocalStorage } from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage<string>('searchTerm', '');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home searchTerm={searchTerm} onSearch={handleSearch} />}
      />
      <Route path="/pokemon/:name" element={<Details />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;