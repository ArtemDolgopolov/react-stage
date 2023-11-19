import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult } from '../interfaces/ISearchResults';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchSearchResults: builder.query<SearchResult[], string>({
      query: (searchTerm) => `people/?search=${searchTerm}`,
    }),
  }),
});

export const { useFetchSearchResultsQuery } = api;
