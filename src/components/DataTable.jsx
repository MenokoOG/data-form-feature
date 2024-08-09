import React, { useMemo, useState } from 'react';
import {
    useTable,
    useSortBy,
    usePagination,
    useFilters,
    useGlobalFilter,
} from 'react-table';
import 'bootstrap/dist/css/bootstrap.min.css';

const DataTable = ({ data, updateMyData, skipPageReset }) => {
    const [editingRowIndex, setEditingRowIndex] = useState(null);

    const columns = useMemo(
        () => [
            {
                Header: 'Date',
                accessor: 'date',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Amount',
                accessor: 'amount',
            },
            {
                Header: 'Category',
                accessor: 'category',
            },
            {
                Header: 'Actions',
                Cell: ({ row }) => (
                    <button
                        onClick={() => {
                            setEditingRowIndex(row.index);
                        }}
                    >
                        Edit
                    </button>
                ),
            },
        ],
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            autoResetPage: !skipPageReset,
            updateMyData,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination
    );

    const EditableCell = ({
        value: initialValue,
        row: { index },
        column: { id },
        updateMyData,
    }) => {
        const [value, setValue] = useState(initialValue);

        const onChange = e => {
            setValue(e.target.value);
        };

        const onBlur = () => {
            updateMyData(index, id, value);
        };

        return (
            <input
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        );
    };

    const defaultColumn = {
        Cell: EditableCell,
    };

    return (
        <div>
            <table {...getTableProps()} className="table table-striped">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    if (cell.column.id === 'Actions') {
                                        return (
                                            <td {...cell.getCellProps()}>
                                                {editingRowIndex === cell.row.index ? (
                                                    <>
                                                        <button
                                                            onClick={() => {
                                                                setEditingRowIndex(null);
                                                            }}
                                                        >
                                                            Save
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditingRowIndex(null);
                                                            }}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            setEditingRowIndex(cell.row.index);
                                                        }}
                                                    >
                                                        Edit
                                                    </button>
                                                )}
                                            </td>
                                        );
                                    }
                                    return (
                                        <td {...cell.getCellProps()}>
                                            {editingRowIndex === cell.row.index ? (
                                                <EditableCell
                                                    value={cell.value}
                                                    row={cell.row}
                                                    column={cell.column}
                                                    updateMyData={updateMyData}
                                                />
                                            ) : (
                                                cell.render('Cell')
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}


                </button>
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0;
                            gotoPage(page);
                        }}
                        style={{ width: '100px' }}
                    />
                </span>
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value));
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DataTable;