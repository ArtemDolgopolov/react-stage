import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../interfaces/ISearchResults';

interface SearchState {
  searchTerm: string;
  results: SearchResult[];
}

const initialState: SearchState = {
  searchTerm: '',
  results: [],
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
  },
});

export const { setSearchTerm, setResults } = searchSlice.actions;

export default searchSlice.reducer;
