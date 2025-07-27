import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

type SearchProps = {
  onSearch: (term: string) => void;
  defaultValue: string;
};

const Search: React.FC<SearchProps> = ({ onSearch, defaultValue }) => {
  const [input, setInput] = useState(defaultValue || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 mb-4 justify-center"
    >
      <input
        className="border p-2 rounded w-1/2"
        type="text"
        placeholder="Search..."
        value={input}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Search
      </button>
    </form>
  );
};

export default Search;