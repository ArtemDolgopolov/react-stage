import React, { useEffect } from 'react';
import { SearchProps } from '../interfaces/ISearchResults';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, setResults } from '../redux/searchSlice';
import { RootState } from '../redux/store';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm); // Explicitly type the state

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      dispatch(setSearchTerm(savedSearchTerm));
    }
  }, [dispatch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    dispatch(setSearchTerm(newSearchTerm));
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() !== '') {
      onSearch(searchTerm.trim());
      dispatch(setResults([]));
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
