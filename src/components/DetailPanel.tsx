import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type Props = {
    name: string;
    onClose: () => void;
  };
  
  type PokemonDetail = {
    name: string;
    sprites: {
      front_default: string;
    };
    types: { type: { name: string } }[];
    height: number;
    weight: number;
  };
  
  const DetailPanel: React.FC<Props> = ({ name, onClose }) => {
    const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
          const data = await res.json();
          setPokemon(data);
        } catch (error) {
          console.error('Error loading Pokémon details:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchDetails();
    }, [name]);
  
    if (loading) return <p>Loading details...</p>;
    if (!pokemon) return <p>No data found.</p>;
  
    return (
      <div className="text-black space-y-2">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
          <button
            onClick={onClose}
            className="text-sm text-red-500 hover:underline"
          >
            ✖ Close
          </button>
        </div>
        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        <p><strong>Types:</strong> {pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>Height:</strong> {pokemon.height}</p>
        <p><strong>Weight:</strong> {pokemon.weight}</p>
      </div>
    );
  };
  
  export default DetailPanel;