import React, { useState, useEffect } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';
import ErrorBoundary from './ErrorBoundary';
import { fetchData } from './Api';

import '../App.css';

const SearchResults: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    const fetchAndStoreData = async () => {
      if (searchTerm === '') {
        return;
      }

      setIsLoading(true);
      setShouldThrowError(false);

      try {
        const newResults = await fetchData(searchTerm);
        setResults(newResults);
        localStorage.setItem('searchResults', JSON.stringify(newResults));
      } catch (error) {
        setShouldThrowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndStoreData();
  }, [searchTerm]);

  return (
    <div className="search-results">
      <ErrorBoundary>
        {shouldThrowError ? (
          <div>Unknown error on the server. Reload the page</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : (
          results.map((result) => (
            <div key={result.name} className="result">
              <p>Name: {result.name}</p>
              <p>Date of birth: {result.birth_year}</p>
            </div>
          ))
        )}
      </ErrorBoundary>
    </div>
  );
};

export default SearchResults;
