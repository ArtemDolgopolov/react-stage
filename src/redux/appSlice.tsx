import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SearchResult } from '../interfaces/ISearchResults';

interface AppState {
  searchTerm: string;
  results: SearchResult[];
  shouldThrowError: boolean;
}

const initialState: AppState = {
  searchTerm: '',
  results: [],
  shouldThrowError: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    setShouldThrowError: (state, action: PayloadAction<boolean>) => {
      state.shouldThrowError = action.payload;
    },
  },
});

export const { setSearchTerm, setResults, setShouldThrowError } =
  appSlice.actions;

export default appSlice.reducer;
