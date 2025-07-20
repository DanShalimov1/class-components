import { render, screen, waitFor } from '@testing-library/react';
import CardList from '../components/CardList';

// Reset fetch before each test
beforeEach(() => {
  jest.resetAllMocks();
});

// Setup all needed fetch mocks
it('renders cards after successful fetch', async () => {
  // Mock the global fetch function with two sequential calls
  global.fetch = jest
    .fn()
    // First call: list of Pokémon
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      }),
    } as Response)
    // Second call: details for bulbasaur
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        id: 1,
        name: 'bulbasaur',
        height: 7,
      }),
    } as Response);

  render(<CardList searchTerm="" />);

  await waitFor(() => {
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

});

it('renders error message when fetch fails', async () => {
  global.fetch = jest.fn().mockRejectedValueOnce(new Error('API is down'));

  render(<CardList searchTerm="bulbasaur" />);

  await waitFor(() => {
    expect(screen.getByText(/error: api is down/i)).toBeInTheDocument();
  });
});

it('shows loading indicator while fetching data', async () => {
  // A fetch that never resolves simulates "loading" state
  global.fetch = jest.fn(() => new Promise(() => {})) as any;

  render(<CardList searchTerm="bulbasaur" />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
