import { Component } from 'react';
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

  static getDerivedStateFromError() {
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
        <div className="text-center text-red-600">
          <h1>Something went wrong.</h1>
        </div>
      );
    }

    return (
      <>
        {this.props.children}
        <div className="text-center mt-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={this.throwError}
          >
            Trigger Error
          </button>
        </div>
      </>
    );
  }
}

export default ErrorBoundary;
