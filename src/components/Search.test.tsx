import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

describe('Search component', () => {
  it('renders input with default value', () => {
    //checks if the input renders
    render(<Search onSearch={() => {}} defaultValue="pikachu" />);
    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('pikachu');
  });

  it('calls onSearch when user types', () => {
    //checks if the user can type and if the search callback is triggered
    const handleSearch = jest.fn();
    render(<Search onSearch={handleSearch} defaultValue="" />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.click(button);

    expect(handleSearch).toHaveBeenCalledWith('bulbasaur');
  });
});
