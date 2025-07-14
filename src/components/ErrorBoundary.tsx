import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  throwError = () => {
    throw new Error('Manually triggered error');
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 text-center">
          <p>Something went wrong. Please refresh the page.</p>
        </div>
      );
    }

    return (
      <>
        {this.props.children}
        <div className="text-center mt-4">
          <button
            onClick={this.throwError}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Trigger Error
          </button>
        </div>
      </>
    );
  }
}

export default ErrorBoundary;
