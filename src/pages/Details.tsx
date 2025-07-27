import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

type PokemonDetails = {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  height: number;
  weight: number;
  stats: { base_stat: number; stat: { name: string } }[];
};

const Details = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error('Pokemon not found');
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [name]);

  if (loading) {
    return <p className="text-center text-lg mt-6">Loading...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-6">
        <p>Error: {error}</p>
        <Link to="/" className="text-blue-500 underline mt-2 block">Back to Home</Link>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <Link to="/" className="text-blue-500 underline block mb-4">← Back to Home</Link>
      <div className="text-center">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-32 h-32"
        />
        <h1 className="text-2xl font-bold capitalize mt-2">{pokemon.name}</h1>
        <p className="text-gray-600">
          Type: {pokemon.types.map(t => t.type.name).join(', ')}
        </p>
        <p className="mt-2">Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
        <p className="mt-2 font-semibold">Abilities:</p>
        <ul className="list-disc list-inside">
          {pokemon.abilities.map(a => (
            <li key={a.ability.name}>{a.ability.name}</li>
          ))}
        </ul>
        <p className="mt-2 font-semibold">Base Stats:</p>
        <ul className="list-disc list-inside">
          {pokemon.stats.map(s => (
            <li key={s.stat.name}>
              {s.stat.name}: {s.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;