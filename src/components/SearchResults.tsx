import React, { useState, useEffect } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';
import ErrorBoundary from './ErrorBoundary';
import '../App.css';

interface ResultItem {
  name: string;
  birth_year: string;
}

const SearchResults: React.FC<{
  searchTerm: string;
  results: SearchResult[];
}> = ({ searchTerm, results: initialResults }) => {
  const [results, setResults] = useState(initialResults || []);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);

  useEffect(() => {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults) {
      setResults(JSON.parse(savedResults));
    }
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const apiUrl = `https://swapi.dev/api/people/?search=${searchTerm}`;
      setIsLoading(true);

      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            setShouldThrowError(true);
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const newResults = data.results.map((item: ResultItem) => ({
            name: item.name,
            birth_year: item.birth_year,
          }));

          setResults(newResults);
          setIsLoading(false);
          localStorage.setItem('searchResults', JSON.stringify(newResults));
        })
        .catch(() => {
          setShouldThrowError(true);
          setIsLoading(false);
        });
    };

    if (searchTerm !== '') {
      fetchData();
    }
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
