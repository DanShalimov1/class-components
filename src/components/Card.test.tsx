import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card component', () => {
  it('renders name and description from props', () => {
    render(
      <Card
        name="Pikachu"
        description="Height: 4"
        image="https://example.com/pikachu.png"
        onSelect={() => {}}
      />
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
  });
});
