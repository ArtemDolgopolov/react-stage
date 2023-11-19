import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SearchResult } from '../interfaces/ISearchResults';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchData: builder.query<
      SearchResult[],
      { searchTerm: string; page: number }
    >({
      query: ({ searchTerm, page }) =>
        `people/?search=${searchTerm}&page=${page}`,
    }),
  }),
});

export const { useFetchDataQuery } = api;
export const { endpoints } = api;
