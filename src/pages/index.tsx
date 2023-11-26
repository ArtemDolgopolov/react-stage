import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SearchResults from '../components/SearchResults';
import { setSearchTerm } from '../redux/searchSlice';
import { RootState } from '../redux/store';

interface HomeProps {
  initialSearchTerm: string;
}

const Home: React.FC<HomeProps> = ({ initialSearchTerm }) => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(setSearchTerm(initialSearchTerm));
    }
  }, [dispatch, initialSearchTerm, searchTerm]);

  const handleSearchSubmit = () => {
    dispatch(setSearchTerm(localSearchTerm));
  };

  return (
    <div>
      <Head>
        <title>Star Wars Search</title>
        <meta name="description" content="Star Wars character search application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <input
            type="text"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            placeholder="Search..."
          />
          <button onClick={handleSearchSubmit}>Search Persons</button>
        </div>

        <SearchResults searchTerm={searchTerm} onSearchSubmit={handleSearchSubmit} />
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const initialSearchTerm = '';

  return {
    props: {
      initialSearchTerm,
    },
  };
};

export default Home;
