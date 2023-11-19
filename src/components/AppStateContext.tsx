import { createContext, useContext, useState, ReactNode } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';

interface AppStateContextType {
  searchTerm: string;
  results: SearchResult[];
  setSearchTerm: (searchTerm: string) => void;
  setResults: (results: SearchResult[]) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  return (
    <AppStateContext.Provider
      value={{ searchTerm, results, setSearchTerm, setResults }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
