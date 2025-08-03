import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import CardList from './CardList';
import selectedReducer from '../store/selectedSlice';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  selected: selectedReducer,
});

jest.mock('./Card', () => ({ name, onClick, selected }: any) => (
  <div data-testid="card" onClick={() => onClick(name)}>
    {name} - {selected ? 'Selected' : 'Not Selected'}
  </div>
));

// Mock fetch responses
global.fetch = jest.fn();

const mockPokemonApi = () => {
  (fetch as jest.Mock).mockImplementation((url: string) => {
    if (url.includes('/pokemon?limit=10')) {
      return Promise.resolve({
        json: () => Promise.resolve({
          results: [
            { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
            { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
          ],
        }),
      });
    }

    // Mock detail fetch
    return Promise.resolve({
      json: () =>
        Promise.resolve({
          name: url.includes('1') ? 'bulbasaur' : 'charmander',
          sprites: { front_default: `${url}-sprite.png` },
        }),
    });
  });
};

//Only one version of createTestStore, and it includes thunk
const createTestStore = (preloadedState: any) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });


describe('CardList Component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders cards and shows selected status from Redux', async () => {
    mockPokemonApi();

    const store = createTestStore({
      selected: {
        selected: [{ name: 'bulbasaur' }],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList searchTerm="" page={0} onPageChange={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(2);
    });

    expect(screen.getByText(/bulbasaur - Selected/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander - Not Selected/i)).toBeInTheDocument();
  });

  it('calls onPageChange when pagination buttons are clicked', async () => {
    mockPokemonApi();
    const onPageChange = jest.fn();

    const store = createTestStore({
      selected: {
        selected: [],
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CardList searchTerm="" page={1} onPageChange={onPageChange} />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => screen.getAllByTestId('card'));

    const prevButton = screen.getByRole('button', { name: /previous/i });
    fireEvent.click(prevButton);

    expect(onPageChange).toHaveBeenCalledWith(0); // One page back
  });
});