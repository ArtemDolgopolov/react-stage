import React, { useEffect } from 'react';
import { SearchProps } from '../interfaces/ISearchResults';
import '../App.css';
import { useAppState } from './AppStateContext';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { searchTerm, setSearchTerm, setResults } = useAppState();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, [setSearchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim());
      setResults([]);
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
