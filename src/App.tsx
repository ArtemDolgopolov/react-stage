import React, { Component } from 'react';
import Search from './components/Search';
import SearchResults from './components/SearchResults';
import { SearchResult } from './interfaces/ISearchResults';

interface AppState {
  searchTerm: string;
  results: SearchResult[];
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [] as SearchResult[],
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
    localStorage.setItem('searchTerm', searchTerm);
  };

  render() {
    const { searchTerm, results } = this.state;

    return (
      <div className="app">
        <Search onSearch={this.handleSearch} />
        <SearchResults searchTerm={searchTerm} results={results} />
      </div>
    );
  }
}

export default App;
