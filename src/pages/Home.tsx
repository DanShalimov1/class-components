import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Search from '../components/Search';
import CardList from '../components/CardList';
import ErrorBoundary from '../components/ErrorBoundary';
import DetailPanel from '../components/DetailPanel';
import { Link } from 'react-router-dom';

type Props = {
    searchTerm: string;
    onSearch: (term: string) => void;
};

const Home: React.FC<Props> = ({ searchTerm, onSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Get page from URL, default to 0
    const page = parseInt(searchParams.get('page') || '0', 10);

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: newPage.toString() });
    };

    const handleSearch = (term: string) => {
        // Reset to first page on new search
        setSearchParams({ page: '0' });
        onSearch(term);
    };

    const detailsName = searchParams.get('details');

    return (
        <div className="w-full min-h-screen p-4 bg-gray-50">
            {/* 🛠️ Changed from w-screen to w-full + max-w-7xl for layout consistency */}
            <div className="w-full max-w-7xl mx-auto border-4 border-green-600">
                <ErrorBoundary>
                    <div className="mb-4 text-center">
                        <Link to="/about" className="text-blue-500 hover:underline text-lg">
                            About This App
                        </Link>
                    </div>
                    <div className="bg-white p-4 shadow rounded mb-4">
                        <Search onSearch={handleSearch} defaultValue={searchTerm} />
                    </div>

                    <div className="flex h-[600px] w-full border-4 border-black">
                        <div className="w-2/3 overflow-y-auto pr-2">
                            <CardList
                                searchTerm={searchTerm}
                                page={page}
                                onPageChange={handlePageChange}
                            />
                        </div>
                        <div className="w-1/3 pl-2">
                            {detailsName ? (
                                <DetailPanel name={detailsName} onClose={() => setSearchParams({})} />
                            ) : (
                                <div className="bg-gray-100 text-gray-600 flex items-center justify-center h-full">
                                    Select a Pokémon
                                </div>
                            )}
                        </div>
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
        </div>
    );
};

export default Home;