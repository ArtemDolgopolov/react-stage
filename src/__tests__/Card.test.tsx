import { render, screen, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from '../components/Card';
import { AppStateProvider } from '../components/AppStateContext';
import { SearchResult } from '../interfaces/ISearchResults';
import Modal from 'react-modal';
import '@testing-library/jest-dom';

const fakeResult: SearchResult = {
  name: 'Fake Name',
  birth_year: '2000',
  isLoading: false,
};

jest.mock('../redux/api', () => ({
  useFetchDataQuery: jest.fn(() => ({ data: [fakeResult], isLoading: false })),
}));

beforeEach(() => {
  act(() => {
    Modal.setAppElement(document.createElement('div'));
  });
});

describe('Card Component', () => {
  it('renders relevant card data', () => {
    render(
      <Router>
        <AppStateProvider>
          <Card name={fakeResult.name} birthYear={fakeResult.birth_year} />
        </AppStateProvider>
      </Router>
    );

    expect(screen.getByText(`Name: ${fakeResult.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Date of birth: ${fakeResult.birth_year}`)
    ).toBeInTheDocument();
  });

  test('renders name and birthYear correctly', () => {
    render(<Card name="Luke Skywalker" birthYear="1977" />);

    const nameElement = screen.getByText(/Luke Skywalker/i);
    const birthYearElement = screen.getByText(/1977/i);

    expect(nameElement).toBeInTheDocument();
    expect(birthYearElement).toBeInTheDocument();
  });
});
