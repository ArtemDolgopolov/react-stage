import { ResultItem, SearchResult } from '../interfaces/ISearchResults';

export async function fetchData(
  searchTerm: string,
  page: number
): Promise<SearchResult[]> {
  const apiUrl = `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();

  return data.results.map((item: ResultItem) => ({
    name: item.name,
    birth_year: item.birth_year,
    isLoading: false,
  }));
}
