import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';

// Define the shape of your state
interface AppState {
  searchTerm: string;
  results: SearchResult[];
}

// Define the actions that can be dispatched
type Action =
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'SET_RESULTS'; payload: SearchResult[] };

// Create the context
const AppStateContext = createContext<
  { state: AppState; dispatch: (action: Action) => void } | undefined
>(undefined);

// Create a custom provider component
const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define your state and reducer
  const initialState: AppState = {
    searchTerm: '',
    results: [],
  };

  const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
      case 'SET_SEARCH_TERM':
        return { ...state, searchTerm: action.payload };
      case 'SET_RESULTS':
        return { ...state, results: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

// Create a custom hook to access the context
const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

export { AppStateProvider, useAppState };
