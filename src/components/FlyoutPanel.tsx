import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../store';
import { clearSelected } from '../store/selectedSlice';

const FlyoutPanel: React.FC = () => {
    const dispatch = useDispatch();
    const selectedNames = useSelector((state: RootState) => state.selected.selected);

    const handleUnselectAll = () => {
        dispatch(clearSelected());
    };

    const handleDownload = () => {
        if (selectedNames.length === 0) return;

        const header = ['Name', 'Description', 'Details URL'];
        const rows = selectedNames.map(({ name, description, url }) => [
            `"${name}"`,
            `"${description}"`,
            `"${url}"`
        ]);

        const csvContent = [header, ...rows].map(row => row.join(',')).join('\n');

        const BOM = '\uFEFF'; //so that Pokemon does not get spelled as "POKÃ©MON" in excel
        const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${selectedNames.length}_items.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (selectedNames.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-700 text-white p-4 flex justify-between items-center z-50 shadow-lg">
            <span className="text-lg">
                {selectedNames.length} item{selectedNames.length > 1 ? 's' : ''} selected
            </span>
            <div className="space-x-3">
                <button
                    onClick={handleUnselectAll}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                    Unselect all
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                    Download
                </button>
            </div>
        </div>
    );
};

export default FlyoutPanel;