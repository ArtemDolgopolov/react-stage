import React, { useState } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { AppState, SearchResult } from './interfaces/ISearchResults';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    searchTerm: '',
    shouldThrowError: false,
    results: [] as SearchResult[],
  });

  const handleSearch = (searchTerm: string) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm,
    }));
    localStorage.setItem('searchTerm', searchTerm);
  };

  const { searchTerm, shouldThrowError } = state;

  return (
    <div className="page-container">
      <Search onSearch={handleSearch} />
      {shouldThrowError ? (
        <p>Oops, something is wrong. Reload the page.</p>
      ) : (
        <SearchResults searchTerm={searchTerm} />
      )}
    </div>
  );
};

export default App;
