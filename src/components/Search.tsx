import React, { Component } from 'react';
import '../App.css';

interface SearchProps {
  onSearch: (searchTerm: string) => void;
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

  handleSearchSubmit = () => {
    const { searchTerm } = this.state;
    const { onSearch } = this.props;
    onSearch(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

  handleThrowError = () => {
    throw new Error('This is a test error');
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <header className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={this.handleSearchChange}
          placeholder="Search..."
        />
        <button type="button" onClick={this.handleSearchSubmit}>
          Search
        </button>
        <button type="button" onClick={this.handleThrowError}>
          Throw Error
        </button>
      </header>
    );
  }
}

export default Search;
