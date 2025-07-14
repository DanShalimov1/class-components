import React, { Component } from 'react';

type Props = {
  name: string;
  description: string;
};

class Card extends Component<Props> {
  render() {
    const { name, description } = this.props;

    return (
      <div className="border rounded p-4 shadow">
        <h2 className="text-xl font-bold capitalize">{name}</h2>
        <p className="text-gray-700">{description}</p>
      </div>
    );
  }
}

export default Card;
