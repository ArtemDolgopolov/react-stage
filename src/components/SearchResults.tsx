import React, { useState, useEffect, useMemo } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';
import ErrorBoundary from './ErrorBoundary';
import { fetchData } from './Api';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import '../App.css';
import Pagination from './Pagination';

const SearchResults: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const history = useNavigate();

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    const fetchAndStoreData = async (page: number) => {
      setIsLoading(true);
      setShouldThrowError(false);

      try {
        let newResults: SearchResult[] = [];

        if (itemsPerPage === 20 && page === 1) {
          const resultsPage1 = await fetchData(searchTerm, page);
          const resultsPage2 = await fetchData(searchTerm, page + 1);
          newResults = resultsPage1.concat(resultsPage2);
        } else if (itemsPerPage === 30 && page === 1) {
          const resultsPage1 = await fetchData(searchTerm, page);
          const resultsPage2 = await fetchData(searchTerm, page + 1);
          const resultsPage3 = await fetchData(searchTerm, page + 2);
          newResults = resultsPage1.concat(resultsPage2, resultsPage3);
        } else {
          newResults = await fetchData(searchTerm, page);
        }

        if (newResults.length < itemsPerPage && page !== 1) {
          newResults = newResults.slice(0, itemsPerPage);
        }

        setResults(newResults);
        setCurrentPage(page);
      } catch (error) {
        setShouldThrowError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const itemsPerPageFromURL = parseInt(
      queryParams.get('itemsPerPage') || '10',
      10
    );
    setItemsPerPage(itemsPerPageFromURL);

    const page = parseInt(queryParams.get('page') || '1', 10);
    fetchAndStoreData(page);
  }, [queryParams, searchTerm, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    history(`?page=${newPage}&itemsPerPage=${itemsPerPage}`);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    history(`?page=1&itemsPerPage=${newItemsPerPage}`);
  };

  return (
    <div className="search-results">
      <ErrorBoundary>
        {shouldThrowError ? (
          <div>Unknown error on the server. Reload the page</div>
        ) : isLoading ? (
          <div>Loading...</div>
        ) : results.length === 0 ? (
          <p>No results found</p>
        ) : (
          results.map((result, index) => (
            <Link
              key={result.name}
              to={`?page=${currentPage}&details=${index}`}
              state={{ result }}
            >
              <div className="result">
                <p>Name: {result.name}</p>
                <p>Date of birth: {result.birth_year}</p>
              </div>
            </Link>
          ))
        )}
        <Pagination
          page={currentPage}
          resultsCount={results.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </ErrorBoundary>
    </div>
  );
};

export default SearchResults;
