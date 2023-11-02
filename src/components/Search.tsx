import React, { useState } from 'react';
import { SearchProps } from '../interfaces/ISearchResults';
import '../App.css';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    onSearch(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

  const handleThrowError = () => {
    throw new Error('This is a test error');
  };

  return (
    <header className="search">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <button type="button" onClick={handleSearchSubmit}>
        Search persons
      </button>
      <button type="button" onClick={handleThrowError}>
        Throw Error
      </button>
    </header>
  );
};

export default Search;
