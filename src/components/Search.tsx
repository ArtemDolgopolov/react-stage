import React, { useState } from 'react';
import { SearchProps } from '../interfaces/ISearchResults';
import '../App.css';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim()); // Call onSearch with a trimmed searchTerm
      localStorage.setItem('searchTerm', searchTerm.trim());
    }
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
    </header>
  );
};

export default Search;
