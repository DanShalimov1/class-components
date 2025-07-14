import React, { Component } from 'react';
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
    this.state = { input: '' };
  }

  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    this.setState({ input: value });
    this.props.onSearch(value);
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
          type="text"
          placeholder="Search..."
          value={this.state.input}
          onChange={(e) => this.setState({ input: e.target.value })}
          className="flex-1 max-w-md border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>
    );
  }  
}

export default Search;
