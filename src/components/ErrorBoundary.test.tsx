import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { useState } from 'react';

function ErrorThrowingComponent() {
  throw new Error('Oops!');
  // Unreachable code, but TypeScript requires a return
  return null;
}

function ComponentWithErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Manually triggered error');
  }

  return (
    <div>
      <div>Safe Child</div>
      <div className="text-center mt-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => setShouldThrow(true)}
        >
          Trigger Error
        </button>
      </div>
    </div>
  );
}

describe('ErrorBoundary component', () => {
  it('displays fallback UI when child throws', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText((text) => text.toLowerCase().includes('something went wrong'))
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('displays fallback UI when "Trigger Error" button is clicked', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ComponentWithErrorTrigger />
      </ErrorBoundary>
    );

    const buttons = screen.getAllByRole('button', { name: /trigger error/i });
    const button = buttons[0];
    fireEvent.click(button);

    expect(
      screen.getByText((text) => text.toLowerCase().includes('something went wrong'))
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });
});
