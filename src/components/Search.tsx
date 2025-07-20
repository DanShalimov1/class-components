import { Component } from 'react';
import type { ChangeEvent } from 'react';

type SearchProps = {
  onSearch: (term: string) => void;
  defaultValue: string;
};

type SearchState = {
  input: string;
};

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = { input: props.defaultValue || '' };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSearch(this.state.input.trim());
        }}
        className="flex gap-2 mb-4 justify-center"
      >
        <input
          className="border p-2 rounded w-1/2"
          type="text"
          placeholder="Search..."
          value={this.state.input}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
    );
  }
}

export default Search;
