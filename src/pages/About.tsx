import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">About This App</h1>
        <p className="text-gray-700 mb-4">
          This Pokémon Explorer app was built as part of the{' '}
          <a
            href="https://app.rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            RS School React course
          </a>.
        </p>
        <p className="text-gray-600 mb-6">
          Author: Daniel Shalimov
        </p>
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default About;