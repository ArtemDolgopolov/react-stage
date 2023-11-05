import React, { useState } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { useLocation } from 'react-router-dom';

const App: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Извлекаем значение searchTerm из параметров адресной строки
  const searchTermFromURL = queryParams.get('searchTerm');
  const [searchTerm, setSearchTerm] = useState(searchTermFromURL || '');

  const handleSearch = (newSearchTerm: string) => {
    // Обновляем состояние searchTerm, но не обновляем адресную строку
    setSearchTerm(newSearchTerm);
  };

  return (
    <div className="page-container">
      <Search onSearch={handleSearch} />
      <SearchResults searchTerm={searchTerm} />
    </div>
  );
};

export default App;
