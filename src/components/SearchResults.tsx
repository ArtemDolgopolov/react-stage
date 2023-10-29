import React, { Component } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';

interface ResultItem {
  name: string;
  birth_year: string;
}

class SearchResults extends Component<
  { searchTerm: string; results: SearchResult[] },
  { results: SearchResult[]; isLoading: boolean }
> {
  constructor(props: { searchTerm: string; results: SearchResult[] }) {
    super(props);
    this.state = {
      results: props.results || [],
      isLoading: false,
    };
  }

  componentDidMount() {
    const savedResults = localStorage.getItem('searchResults');
    if (savedResults) {
      this.setState({ results: JSON.parse(savedResults) });
    }
  }

  componentDidUpdate(prevProps: { searchTerm: string }) {
    const { searchTerm } = this.props;
    if (searchTerm !== prevProps.searchTerm) {
      this.fetchData();
    }
  }

  fetchData() {
    const { searchTerm } = this.props;
    const apiUrl = `https://swapi.dev/api/people/?search=${searchTerm}`;
    this.setState({ isLoading: true });

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const results = data.results.map((item: ResultItem) => {
          return {
            name: item.name,
            birth_year: item.birth_year,
          };
        });

        this.setState({ results, isLoading: false });

        localStorage.setItem('searchResults', JSON.stringify(results));
      })
      .catch(() => {
        // console.error('Error fetching data:', error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { results, isLoading } = this.state;
    return (
      <div className="search-results">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          results.map((result) => (
            <div key={result.name} className="result">
              <p>Name: {result.name}</p>
              <p>Date of birth: {result.birth_year}</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default SearchResults;
