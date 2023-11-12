import React, { useState, useEffect, useMemo } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';
import ErrorBoundary from './ErrorBoundary';
import { fetchData } from './Api';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';

import '../App.css';
import Pagination from './Pagination';
import { useAppState } from './AppStateContext';
import DetailedCard from './DetailedCard';

const SearchResults: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const { results, setResults } = useAppState();
  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [isLoading, setIsLoading] = useState(false);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [detailedCardOpen, setDetailedCardOpen] = useState(false);

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

        localStorage.setItem('searchResults', JSON.stringify(newResults));
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
  }, [queryParams, searchTerm, itemsPerPage, setResults]);

  const handlePageChange = (newPage: number) => {
    history(`?page=${newPage}&itemsPerPage=${itemsPerPage}`);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    history(`?page=1&itemsPerPage=${newItemsPerPage}`);
  };

  const openDetailedCard = (result: SearchResult) => {
    setSelectedResult(result);
    setDetailedCardOpen(true);
  };

  const closeDetailedCard = () => {
    setSelectedResult(null);
    setDetailedCardOpen(false);
  };

  useEffect(() => {
    const savedSearchResults = localStorage.getItem('searchResults');
    if (savedSearchResults) {
      setResults(JSON.parse(savedSearchResults));
    }
  }, [setResults]);

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
          results.map((result) => (
            <div key={result.name} onClick={() => openDetailedCard(result)}>
              <Card name={result.name} birthYear={result.birth_year} />
            </div>
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
      <DetailedCard
        isOpen={detailedCardOpen}
        onClose={closeDetailedCard}
        result={selectedResult!}
      />
    </div>
  );
};

export default SearchResults;
