import React, { useState } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { SearchResult } from './interfaces/ISearchResults';

interface AppState {
  searchTerm: string;
  results: SearchResult[];
  shouldThrowError: boolean;
}

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    searchTerm: '',
    results: [] as SearchResult[],
    shouldThrowError: false,
  });

  const handleSearch = (searchTerm: string) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm,
    }));
    localStorage.setItem('searchTerm', searchTerm);
  };

  const { searchTerm, results, shouldThrowError } = state;

  return (
    <div className="page-container">
      <Search onSearch={handleSearch} />
      {shouldThrowError ? (
        <p>Oops, something is wrong. Reload the page.</p>
      ) : (
        <SearchResults searchTerm={searchTerm} results={results} />
      )}
    </div>
  );
};

export default App;
