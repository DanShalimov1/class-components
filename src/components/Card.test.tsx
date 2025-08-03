import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';
import { Provider } from 'react-redux';
import  store  from '../store';

describe('Card component', () => {
  const baseProps = {
    name: 'Pikachu',
    description: 'Height: 4',
    image: 'https://example.com/pikachu.png',
    onClick: jest.fn(),
  };

  const renderWithProvider = (ui: React.ReactElement) =>
    render(<Provider store={store}>{ui}</Provider>);

  beforeEach(() => {
    baseProps.onClick.mockClear();
  });

  it('renders name and description from props', () => {
    renderWithProvider(<Card {...baseProps} selected={false} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', baseProps.image);
  });

  it('calls onClick when clicked', () => {
    renderWithProvider(<Card {...baseProps} selected={false} />);
    const card = screen.getByTestId('card');
    fireEvent.click(card);
    expect(baseProps.onClick).toHaveBeenCalledWith('Pikachu');
  });

  it('shows selected state visually', () => {
    renderWithProvider(<Card {...baseProps} selected={true} />);
    const card = screen.getByTestId('card');
    expect(card.className).toMatch(/ring-2/); // Adjust if needed
  });
});