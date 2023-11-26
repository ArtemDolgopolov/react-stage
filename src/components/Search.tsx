import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { setSearchTerm } from '../redux/searchSlice';

interface SearchProps {
  onSearchSubmit: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchSubmit }) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTermLocal] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermLocal(e.target.value);
  };

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(searchTerm));
    onSearchSubmit(searchTerm);
  };

  return (
    <div className="search-container">
      <input type="text" value={searchTerm} onChange={handleSearchChange} />
      <button onClick={handleSearchSubmit}>Search Persons</button>
    </div>
  );
};

export default Search;
