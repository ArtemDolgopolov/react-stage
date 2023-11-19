import React, { useEffect, useMemo, useState } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';
import ErrorBoundary from './ErrorBoundary';
import { useFetchDataQuery } from '../redux/api';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from './Card';
import { RootState } from '../redux/store';
import '../App.css';
import Pagination from './Pagination';
import DetailedCard from './DetailedCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  setResults,
  setItemsPerPage,
  setMainPageLoading,
  setDetailsPageLoading,
} from '../redux/searchSlice';

const SearchResults: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const itemsPerPage = useSelector(
    (state: RootState) => state.search.itemsPerPage
  );
  const mainPageLoading = useSelector(
    (state: RootState) => state.search.mainPageLoading
  );
  const detailsPageLoading = useSelector(
    (state: RootState) => state.search.detailsPageLoading
  );

  const location = useLocation();
  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const [shouldThrowError, setShouldThrowError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );
  const [detailedCardOpen, setDetailedCardOpen] = useState(false);

  const history = useNavigate();

  const { data: results, isLoading } = useFetchDataQuery({
    searchTerm,
    page: currentPage,
  });

  useEffect(() => {
    const fetchAndStoreData = async (page: number) => {
      try {
        if (page === 1) {
          dispatch(setMainPageLoading(true));
        } else {
          dispatch(setDetailsPageLoading(true));
        }

        const newResults: SearchResult[] = [];

        dispatch(setResults(newResults));
        setCurrentPage(page);

        localStorage.setItem('searchResults', JSON.stringify(newResults));
      } catch (error) {
        setShouldThrowError(true);
      } finally {
        if (page === 1) {
          dispatch(setMainPageLoading(false));
        } else {
          dispatch(setDetailsPageLoading(false));
        }
      }
    };

    const itemsPerPageFromURL = parseInt(
      queryParams.get('itemsPerPage') || '10',
      10
    );
    dispatch(setItemsPerPage(itemsPerPageFromURL));

    const page = parseInt(queryParams.get('page') || '1', 10);
    fetchAndStoreData(page);
  }, [queryParams, searchTerm, itemsPerPage, dispatch]);

  const handlePageChange = (newPage: number) => {
    setShouldThrowError(false);
    const currentItemsPerPage = queryParams.get('itemsPerPage') || '10';
    history(`?page=${newPage}&itemsPerPage=${currentItemsPerPage}`);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setShouldThrowError(false);
    dispatch(setItemsPerPage(newItemsPerPage));
    const currentPage = queryParams.get('page') || '1';
    history(`?page=${currentPage}&itemsPerPage=${newItemsPerPage}`);
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
      dispatch(setResults(JSON.parse(savedSearchResults)));
    }
  }, [dispatch]);

  return (
    <div className="search-results">
      <ErrorBoundary>
        {mainPageLoading && <p>Loading main page...</p>}
        {detailsPageLoading && <p>Loading details page...</p>}
        {shouldThrowError && <p>Error occurred while fetching data.</p>}
        {!shouldThrowError && isLoading ? (
          <p>Loading...</p>
        ) : Array.isArray(results) ? (
          results.map((result: SearchResult) => (
            <div key={result.name} onClick={() => openDetailedCard(result)}>
              <Card name={result.name} birthYear={result.birth_year} />
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
        {!shouldThrowError && (
          <Pagination
            page={currentPage}
            resultsCount={(results || []).length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
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
