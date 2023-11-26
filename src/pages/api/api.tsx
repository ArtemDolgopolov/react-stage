import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { SearchResult } from '../../interfaces/ISearchResults';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchData: builder.query<SearchResult[], { searchTerm: string; page: number }>({
      query: ({ searchTerm, page }) => `people/?search=${searchTerm}&page=${page}`,
      transformResponse: (response: { results: SearchResult[] }) => response.results,
    }),
  }),
});

export const { useFetchDataQuery } = api;

export default api;
