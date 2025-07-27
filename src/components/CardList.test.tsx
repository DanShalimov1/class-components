import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardList from './CardList';

beforeEach(() => {
  jest.restoreAllMocks();
});

test('renders cards after successful fetch', async () => {
  global.fetch = jest.fn()
    // First call: list of Pokémon with URLs
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/bulbasaur' },
        ],
      }),
    })
    // Second call: details for 'bulbasaur'
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        name: 'bulbasaur',
        sprites: {
          front_default: 'https://img.pokemondb.net/sprites/bulbasaur.png',
        },
      }),
    });

  render(
    <MemoryRouter>
      <CardList searchTerm="" page={1} onPageChange={() => {}} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });
});

test('renders error message when fetch fails', async () => {
  global.fetch = jest.fn().mockRejectedValue(new Error('API is down'));

  render(
    <MemoryRouter>
      <CardList searchTerm="" page={1} onPageChange={() => {}} />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/error: api is down/i)).toBeInTheDocument();
  });
});