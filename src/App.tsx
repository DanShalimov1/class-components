import React, { Component } from 'react';
import Search from './components/Search';
import CardList from './components/CardList';
import ErrorBoundary from './components/ErrorBoundary';

type AppState = {
  searchTerm: string;
};

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const savedSearch = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearch,
    };
  }

  handleSearch = (term: string) => {
    const trimmed = term.trim();
    localStorage.setItem('searchTerm', trimmed);
    this.setState({ searchTerm: trimmed });
  };

  render() {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <ErrorBoundary>
          <div className="bg-white p-4 shadow rounded mb-4">
            <Search onSearch={this.handleSearch} defaultValue={this.state.searchTerm} />
          </div>
          <div className="bg-white p-4 shadow rounded">
            <CardList searchTerm={this.state.searchTerm} />
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                throw new Error('Test error');
              }}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Error Button
            </button>
          </div>

        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
