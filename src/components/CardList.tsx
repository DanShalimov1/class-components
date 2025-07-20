import { Component } from 'react';
import type { PokemonListResponse, PokemonDetail } from '../types';
import Card from './Card';

type Props = {
  searchTerm: string;
};

const PAGE_SIZE = 20;

type State = {
  results: PokemonDetail[];
  loading: boolean;
  error: string | null;
  page: number;
};

class CardList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      error: null,
      page: 0,
    };
  }

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const searchChanged = prevProps.searchTerm !== this.props.searchTerm;
    const pageChanged = prevState.page !== this.state.page;

    if (searchChanged || pageChanged) {
      this.fetchData(this.props.searchTerm);
    }
  }

  async fetchData(term: string) {
    this.setState({ loading: true, error: null });

    try {
      let pokemonList: PokemonDetail[] = [];

      if (term) {
        // Try to fetch single Pokémon by name
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`
        );
        if (!res.ok) throw new Error('No results found.');
        const data = await res.json();
        pokemonList = [data];
      } else {
        // Fetch default page
        const offset = this.state.page * PAGE_SIZE;
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${PAGE_SIZE}`
        );

        if (!res.ok) throw new Error('Failed to load Pokémon list.');
        const data: PokemonListResponse = await res.json();

        // Fetch details for each one
        const detailResponses = await Promise.all(
          data.results.map((pokemon) => fetch(pokemon.url))
        );

        const detailedData = await Promise.all(
          detailResponses.map((res) => res.json())
        );
        pokemonList = detailedData;
      }

      this.setState({ results: pokemonList, loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        this.setState({ error: err.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error', loading: false });
      }
    }
  }

  render() {
    const { results, loading, error } = this.state;

    if (loading && results.length === 0) {
      // Initial load or empty result → show simple loading text
      return <p className="text-center text-blue-500">Loading...</p>;
    }

    if (error) {
      return (
        <div className="text-center text-red-600 font-semibold p-4 bg-red-100 rounded">
          Error: {error}
        </div>
      );
    }

    return (
      <div>
        {/* Blur the content if we're updating results */}
        <div
          className={loading ? 'blur-sm pointer-events-none select-none' : ''}
        >
          <div className="grid grid-cols-2 gap-4">
            {results.map((pokemon) => (
              <Card
                key={pokemon.id}
                name={pokemon.name}
                description={`Height: ${pokemon.height}`}
              />
            ))}
          </div>
        </div>

        {/* Overlay loading message if updating */}
        {loading && results.length > 0 && (
          <p className="text-center text-blue-400 mt-4">Updating results...</p>
        )}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={this.state.page === 0}
            onClick={() =>
              this.setState({ page: this.state.page - 1 }, () =>
                this.fetchData(this.props.searchTerm)
              )
            }
            className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() =>
              this.setState({ page: this.state.page + 1 }, () =>
                this.fetchData(this.props.searchTerm)
              )
            }
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default CardList;
