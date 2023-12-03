import React from 'react';
import TableHeader from './table_header';
import TableRow from './table_row';

const Table = ({ data, selectedRows, onRowSelection, setData, setFilteredData }) => {
  const columns = Object.keys(data[0] || {});

  return (
    <table>
      <TableHeader columns={columns} />
      <tbody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            row={row}
            selectedRows={selectedRows}
            onRowSelection={onRowSelection}
            setData={setData}
            setFilteredData={setFilteredData}
          />
        ))}
      </tbody>
    </table>
  );
};


export default Table;
