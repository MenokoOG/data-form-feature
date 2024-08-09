import React, { useState } from 'react';
import DataTable from './components/DataTable';

const initialData = [
    { date: '2024-01-01', description: 'Salary', amount: 5000, category: 'Income' },
    { date: '2024-01-02', description: 'Rent', amount: -1000, category: 'Expense' },
    // Add more initial data as needed
];

const App = () => {
    const [data, setData] = useState(initialData);
    const [skipPageReset, setSkipPageReset] = useState(false);
    const [newEntry, setNewEntry] = useState({
        date: '',
        description: '',
        amount: '',
        category: '',
    });

    const updateMyData = (rowIndex, columnId, value) => {
        setSkipPageReset(true);
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    const addNewEntry = () => {
        setData([...data, newEntry]);
        setNewEntry({
            date: '',
            description: '',
            amount: '',
            category: '',
        });
    };

    return (
        <div className="App">
            <div>
                <input
                    type="date"
                    value={newEntry.date}
                    onChange={e => setNewEntry({ ...newEntry, date: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={newEntry.description}
                    onChange={e => setNewEntry({ ...newEntry, description: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={newEntry.amount}
                    onChange={e => setNewEntry({ ...newEntry, amount: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={newEntry.category}
                    onChange={e => setNewEntry({ ...newEntry, category: e.target.value })}
                />
                <button onClick={addNewEntry}>Add New Entry</button>
            </div>
            <DataTable
                data={data}
                updateMyData={updateMyData}
                skipPageReset={skipPageReset}
            />
        </div>
    );
};

export default App