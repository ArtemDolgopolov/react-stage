import { Component } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { SearchResult } from './interfaces/ISearchResults';
import ErrorBoundary from './components/ErrorBoundary';

interface AppState {
  searchTerm: string;
  results: SearchResult[];
  shouldThrowError: boolean;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [] as SearchResult[],
      shouldThrowError: false,
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
  };

  render() {
    const { searchTerm, results, shouldThrowError } = this.state;

    return (
      <div className="page-container">
        <Search onSearch={this.handleSearch} />
        {shouldThrowError ? (
          <ErrorBoundary>
            <SearchResults searchTerm={searchTerm} results={results} />
          </ErrorBoundary>
        ) : (
          <SearchResults searchTerm={searchTerm} results={results} />
        )}
      </div>
    );
  }
}

export default App;
