import React, { Component } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';

interface SearchProps {
  onSearch: (searchTerm: string, results: SearchResult[]) => void;
}

interface SearchState {
  searchTerm: string;
}

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearchSubmit = async () => {
    const { searchTerm } = this.state;
    const { onSearch } = this.props;
    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${searchTerm}`
      );
      if (response.ok) {
        const data = await response.json();
        const { results } = data.results;
        onSearch(searchTerm, results);
        localStorage.setItem('searchTerm', searchTerm);
      }
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search..."
        />
        <button type="button" onClick={this.handleSearchSubmit}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
