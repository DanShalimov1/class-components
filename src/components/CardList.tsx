import React, { useEffect, useState } from 'react';
import type { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from './Card';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

type Pokemon = {
  name: string;
  image: string;
};

type Props = {
  searchTerm: string;
  page: number;
  onPageChange: (newPage: number) => void;
};

const CardList: FC<Props> = ({ searchTerm, page, onPageChange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const selectedNames = useSelector((state: RootState) => state.selected.selected);

  const detailPanel = document.getElementById('detail-panel');
  detailPanel?.scrollIntoView({ behavior: 'smooth' });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (searchTerm.trim() !== '') {
          // Fetch all Pokémon for search
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`);
          const data = await res.json();

          const matched = data.results.filter((item: { name: string }) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          const results: Pokemon[] = await Promise.all(
            matched.map(async (item: { name: string; url: string }) => {
              const res = await fetch(item.url);
              const detail = await res.json();
              return {
                name: detail.name,
                image: detail.sprites.front_default,
              };
            })
          );

          setPokemonList(results);
        } else {
          // Default paginated fetch
          const limit = 10;
          const offset = page * limit;

          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
          );
          const data = await res.json();

          const results: Pokemon[] = await Promise.all(
            data.results.map(async (item: { name: string; url: string }) => {
              const res = await fetch(item.url);
              const detail = await res.json();
              return {
                name: detail.name,
                image: detail.sprites.front_default,
              };
            })
          );

          setPokemonList(results);
        }
      } catch (err) {
        console.error('Error fetching Pokémon:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, page]);


  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {pokemonList.map((pokemon) => (
          <Card
            key={pokemon.name}
            name={pokemon.name}
            description="Click to see details"
            image={pokemon.image}
            selected={selectedNames.some(item => item.name === pokemon.name)}
            onClick={(name) => {
              const params = new URLSearchParams(searchParams);
              params.set('details', name);
              console.log('Setting details param to:', name);
              setSearchParams(params);
            }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-2">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 0))}
          disabled={page === 0}
          className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(page + 1)}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-center mt-4">
          Error: {error.message}
        </p>
      )}
    </>
  );
};

export default CardList;