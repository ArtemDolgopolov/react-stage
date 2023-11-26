import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SearchResult } from '../interfaces/ISearchResults';

interface SearchState {
  searchTerm: string;
  results: SearchResult[];
  itemsPerPage: number;
  mainPageLoading: boolean;
  detailsPageLoading: boolean;
}

const initialState: SearchState = {
  searchTerm: '',
  results: [],
  itemsPerPage: 10,
  mainPageLoading: false,
  detailsPageLoading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
    },
    setMainPageLoading: (state, action: PayloadAction<boolean>) => {
      state.mainPageLoading = action.payload;
    },
    setDetailsPageLoading: (state, action: PayloadAction<boolean>) => {
      state.detailsPageLoading = action.payload;
    },
  },
});

export const {
  setSearchTerm,
  setResults,
  setItemsPerPage,
  setMainPageLoading,
  setDetailsPageLoading,
} = searchSlice.actions;

export default searchSlice.reducer;
