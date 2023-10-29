import { Component } from 'react';
import { SearchResult } from '../interfaces/ISearchResults';
import ErrorBoundary from './ErrorBoundary';
import '../App.css';

interface ResultItem {
  name: string;
  birth_year: string;
}

class SearchResults extends Component<
  { searchTerm: string; results: SearchResult[] },
  { results: SearchResult[]; isLoading: boolean; shouldThrowError: boolean }
> {
  constructor(props: { searchTerm: string; results: SearchResult[] }) {
    super(props);
    this.state = {
      results: props.results || [],
      isLoading: false,
      shouldThrowError: false,
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
          this.setState({ shouldThrowError: true });
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
        this.setState({ shouldThrowError: true });
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { results, isLoading, shouldThrowError } = this.state;

    return (
      <div className="search-results">
        <ErrorBoundary>
          {shouldThrowError ? (
            <div>Unknown error on server. Reload the page</div>
          ) : isLoading ? (
            <div>Loading...</div>
          ) : (
            results.map((result) => (
              <div key={result.name} className="result">
                <p>Name: {result.name}</p>
                <p>Date of birth: {result.birth_year}</p>
              </div>
            ))
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default SearchResults;
