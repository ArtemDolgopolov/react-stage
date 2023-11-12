import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchResults from '../components/SearchResults';
import '@testing-library/jest-dom';
import { AppStateProvider } from '../components/AppStateContext';
import Modal from 'react-modal';

jest.mock('../components/Api', () => ({
  fetchData: jest.fn(() => Promise.resolve([])),
}));

beforeEach(() => {
  act(() => {
    Modal.setAppElement(document.createElement('div'));
  });
});

describe('SearchResults', () => {
  it('renders loading state initially', async () => {
    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm={''} />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(
      () => {
        expect(screen.queryByText('Loading...')).toBeNull();
      },
      { timeout: 1000 }
    );
  });

  it('renders error message if there is an error', async () => {
    jest
      .spyOn(require('../components/Api'), 'fetchData')
      .mockImplementationOnce(() => {
        throw new Error('Fake error');
      });

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="test" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() =>
      expect(
        screen.getByText('Unknown error on the server. Reload the page')
      ).toBeInTheDocument()
    );
  });

  it('message is displayed if no cards are present', async () => {
    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="noresults" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() =>
      expect(screen.getByText('No results found')).toBeInTheDocument()
    );
  });

  it('renders the specified number of cards', async () => {
    const fakeResults = [
      { name: 'Fake Name 1', birth_year: '2000', isLoading: false },
      { name: 'Fake Name 2', birth_year: '1995', isLoading: false },
    ];
    require('../components/Api').fetchData.mockResolvedValueOnce(fakeResults);

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="results" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() => {
      const result1 = screen.getByText(/Name:.*Fake Name 1/, { exact: false });
      const result2 = screen.getByText(/Name:.*Fake Name 2/, { exact: false });

      expect(result1).toBeInTheDocument();
      expect(result2).toBeInTheDocument();
    });
  });

  it('renders results with isLoading state', async () => {
    const fakeResults = [
      { name: 'Fake Name 1', birth_year: '2000', isLoading: true },
      { name: 'Fake Name 2', birth_year: '1995', isLoading: true },
    ];
    require('../components/Api').fetchData.mockResolvedValueOnce(fakeResults);

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="results" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() => {
      const result1 = screen.getByText(/Name:.*Fake Name 1/, { exact: false });
      const result2 = screen.getByText(/Name:.*Fake Name 2/, { exact: false });

      expect(result1).toBeInTheDocument();
      expect(result2).toBeInTheDocument();

      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('opens and closes DetailedCard', async () => {
    const fakeResults = [
      { name: 'Fake Name 1', birth_year: '2000', isLoading: false },
    ];
    require('../components/Api').fetchData.mockResolvedValueOnce(fakeResults);

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="results" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() => {
      const result1 = screen.getByText(/Name:.*Fake Name 1/, { exact: false });
      expect(result1).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(/Name:.*Fake Name 1/, { exact: false }));
    });

    await waitFor(() => {
      expect(screen.getByText('Details for Fake Name 1')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText('Close'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Details for Fake Name 1')).toBeNull();
    });
  });

  it('displays message for no results', async () => {
    require('../components/Api').fetchData.mockResolvedValueOnce([]);

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="noresults" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('opens and closes DetailedCard', async () => {
    const fakeResults = [
      { name: 'Fake Name 1', birth_year: '2000', isLoading: false },
    ];
    require('../components/Api').fetchData.mockResolvedValueOnce(fakeResults);

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="results" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() => {
      const result1 = screen.getByText(/Name:.*Fake Name 1/, { exact: false });
      expect(result1).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText(/Name:.*Fake Name 1/, { exact: false }));
    });

    await waitFor(() => {
      expect(screen.getByText('Details for Fake Name 1')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.click(screen.getByText('Close'));
    });

    await waitFor(() => {
      expect(screen.queryByText('Details for Fake Name 1')).toBeNull();
    });
  });

  it('fetches data with different itemsPerPage', async () => {
    const fakeResults = [
      { name: 'Fake Name 1', birth_year: '2000', isLoading: false },
      { name: 'Fake Name 2', birth_year: '1995', isLoading: false },
    ];

    require('../components/Api').fetchData.mockResolvedValueOnce(fakeResults);

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="results" />
          </AppStateProvider>
        </Router>
      );
    });

    await waitFor(() => {
      const result1 = screen.getByText(/Name:.*Fake Name 1/, { exact: false });
      const result2 = screen.getByText(/Name:.*Fake Name 2/, { exact: false });

      expect(result1).toBeInTheDocument();
      expect(result2).toBeInTheDocument();
    });

    await act(async () => {
      render(
        <Router>
          <AppStateProvider>
            <SearchResults searchTerm="results" />
          </AppStateProvider>
        </Router>
      );
    });
  });
});
