import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SearchResult } from '../interfaces/ISearchResults';
import { useFetchDataQuery } from '../pages/api/api';
import {
  setDetailsPageLoading,
  setItemsPerPage,
  setMainPageLoading,
  setResults,
  setSearchTerm,
} from '../redux/searchSlice';
import { RootState } from '../redux/store';
import Card from './Card';
import DetailedCard from './DetailedCard';
import Pagination from './Pagination';

interface SearchResultsProps {
  searchTerm: string;
  onSearchSubmit: (searchTerm: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, onSearchSubmit }) => {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector((state: RootState) => state.search.itemsPerPage);
  const mainPageLoading = useSelector((state: RootState) => state.search.mainPageLoading);
  const detailsPageLoading = useSelector((state: RootState) => state.search.detailsPageLoading);

  const router = useRouter();
  const queryParams = useMemo(() => {
    const searchParam = router.query.search;
    const searchParams =
      typeof searchParam === 'string' ? new URLSearchParams(searchParam) : new URLSearchParams();
    return searchParams;
  }, [router.query.search]);

  const [shouldThrowError, setShouldThrowError] = useState(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
  const [detailedCardOpen, setDetailedCardOpen] = useState(false);

  const {
    data: results,
    error,
    isLoading,
  } = useFetchDataQuery({
    searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    if (results) {
      dispatch(setResults(results));
    }
  }, [results, dispatch]);

  useEffect(() => {
    setCurrentPage(Number(queryParams.get('page')) || 1);
  }, [queryParams]);

  useEffect(() => {
    if (error) {
      console.error('Error fetching data:', error);
      setShouldThrowError(true);
    }
  }, [error]);

  useEffect(() => {
    dispatch(setDetailsPageLoading(detailsPageLoading));
    dispatch(setMainPageLoading(mainPageLoading));
  }, [detailsPageLoading, mainPageLoading, dispatch]);

  useEffect(() => {
    dispatch(setSearchTerm(searchTerm));
  }, [searchTerm, dispatch]);

  const handlePageChange = (newPage: number) => {
    setShouldThrowError(false);
    const currentItemsPerPage = queryParams.get('itemsPerPage') || '10';
    router.push(`?search=${searchTerm}&page=${newPage}&itemsPerPage=${currentItemsPerPage}`);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setShouldThrowError(false);
    dispatch(setItemsPerPage(newItemsPerPage));
    const currentPage = queryParams.get('page') || '1';
    router.push(`?search=${searchTerm}&page=${currentPage}&itemsPerPage=${newItemsPerPage}`);
  };

  const handleCardClick = (result: SearchResult) => {
    setSelectedResult(result);
    setDetailedCardOpen(true);
  };

  const closeDetailedCard = () => {
    setSelectedResult(null);
    setDetailedCardOpen(false);
  };

  useEffect(() => {
    onSearchSubmit(searchTerm);
  }, [searchTerm, onSearchSubmit]);

  return (
    <div className="results-container">
      {isLoading && <div>Loading...</div>}
      {!isLoading && !mainPageLoading && !detailsPageLoading && !shouldThrowError && (
        <>
          <div className="cards-container">
            {(results || []).map((result: SearchResult) => (
              <div key={result.name} onClick={() => handleCardClick(result)}>
                <Card name={result.name} birthYear={result.birth_year} />
              </div>
            ))}
          </div>
          <Pagination
            page={currentPage}
            resultsCount={(results && results.length) || 0}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        </>
      )}
      {detailedCardOpen && selectedResult && (
        <DetailedCard
          isOpen={detailedCardOpen}
          onClose={closeDetailedCard}
          result={selectedResult}
        />
      )}
    </div>
  );
};

export default SearchResults;
