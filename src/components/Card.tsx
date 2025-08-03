import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleSelected } from '../store/selectedSlice';
import { setSelectedPokemon } from '../store/selectedPokemonSlice';

type Props = {
  name: string;
  description: string;
  image: string;
  selected: boolean;
  onClick: (name: string) => void; // Use the parent's onClick to ensure routing + detail panel work correctly
};

const Card: React.FC<Props> = ({ name, description, image, selected, onClick }) => {
  const dispatch = useDispatch();

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent card click when checking box

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const data = await response.json();

    // Find English flavor text
    const englishEntry = data.flavor_text_entries.find(
      (entry: any) => entry.language.name === 'en'
    );

    const description = englishEntry
      ? englishEntry.flavor_text.replace(/\f|\n|\r/g, ' ')
      : 'No description available.';

    dispatch(toggleSelected({
      name,
      description,
      url: `https://pokeapi.co/api/v2/pokemon/${name}`
    }))
  };

  const handleClick = () => {
    onClick(name); // 🔥 Use prop from CardList.tsx
  };

  return (
    <div
      onClick={handleClick}
      className={`border rounded p-4 shadow hover:shadow-lg transition cursor-pointer relative ${selected ? 'ring-2 ring-blue-500' : ''}`}
      data-testid="card"
    >
      <input
        type="checkbox"
        checked={selected}
        onChange={handleCheckboxChange}
        className="absolute top-2 left-2 scale-150"
        title={`Select ${name}`}
      />
      <img
        src={image}
        alt={name}
        className="w-20 h-20 object-contain mx-auto mb-2"
      />
      <h2 className="text-xl font-bold capitalize text-center">{name}</h2>
      <p className="text-gray-700 text-center">{description}</p>
    </div>
  );
};

export default Card;