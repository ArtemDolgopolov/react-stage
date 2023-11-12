import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Card from '../components/Card';
import DetailedCard from '../components/DetailedCard';
import { AppStateProvider } from '../components/AppStateContext';
import { SearchResult } from '../interfaces/ISearchResults';
import Modal from 'react-modal';
import '@testing-library/jest-dom';

const fakeResult: SearchResult = {
  name: 'Fake Name',
  birth_year: '2000',
  isLoading: false,
};

jest.mock('../components/Api', () => ({
  fetchData: jest.fn(() => Promise.resolve(fakeResult)),
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

  it('opens a detailed card component on click', async () => {
    render(
      <Router>
        <AppStateProvider>
          <Card name={fakeResult.name} birthYear={fakeResult.birth_year} />
          <DetailedCard isOpen={true} onClose={() => {}} result={fakeResult} />
        </AppStateProvider>
      </Router>
    );

    act(() => {
      const cards = screen.getAllByText(/Name:.*Fake Name/, { exact: false });
      userEvent.click(cards[0]);
    });

    expect(screen.getByText('Details for Fake Name')).toBeInTheDocument();
  });
});
