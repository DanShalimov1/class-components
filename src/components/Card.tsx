import React from 'react';

type Props = {
  name: string;
  description: string;
  image: string;
  onSelect: (name: string) => void;
};

const Card: React.FC<Props> = ({ name, description, image, onSelect }) => {
  const handleClick = () => {
    onSelect(name);
  };

  return (
    <div
      onClick={handleClick}
      className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
    >
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