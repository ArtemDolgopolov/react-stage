export interface SearchResult {
  isLoading: boolean;
  name: string;
  birth_year: string;
}

export interface ResultItem {
  name: string;
  birth_year: string;
}

export interface SearchProps {
  onSearch: (searchTerm: string) => void;
}

export interface AppState {
  searchTerm: string;
  results: SearchResult[];
  shouldThrowError: boolean;
}

export interface SearchResultsProps {
  searchTerm: string;
  results: SearchResult[];
  shouldThrowError: boolean;
  setResults: (results: SearchResult[]) => void;
  setShouldThrowError: (shouldThrowError: boolean) => void;
}
