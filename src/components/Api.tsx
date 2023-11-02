import { ResultItem, SearchResult } from '../interfaces/ISearchResults';

export async function fetchData(searchTerm: string): Promise<SearchResult[]> {
  const apiUrl = `https://swapi.dev/api/people/?search=${searchTerm}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  const newResults: SearchResult[] = data.results.map((item: ResultItem) => ({
    name: item.name,
    birth_year: item.birth_year,
    isLoading: false,
  }));

  return newResults;
}
