import React, { useState, useEffect } from 'react';
import './App.css';
import Table from './components/table';
import Pagination from './components/pagination';

function App() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => {
        setData(data);
        setFilteredData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleSearch = query => {
    const filtered = data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleRowSelection = id => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDelete = rowId => {
    // Implement logic to delete the row in memory
    const updatedData = data.filter(row => row.id !== rowId);
    const updatedFilteredData = filteredData.filter(row => row.id !== rowId);

    setData(updatedData);
    setFilteredData(updatedFilteredData);
  };

  const handleDeleteSelected = () => {
    // Delete selected rows from memory and UI
    const updatedData = data.filter(row => !selectedRows.includes(row.id));
    const updatedFilteredData = filteredData.filter(row => !selectedRows.includes(row.id));

    setData(updatedData);
    setFilteredData(updatedFilteredData);
    setSelectedRows([]); // Clear selected rows after deletion
  };

  return (
    <div className="App">
      <h1>User Management</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={e => handleSearch(e.target.value)}
      />
      <Table
        data={filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
        selectedRows={selectedRows}
        onRowSelection={handleRowSelection}
        onDelete={handleDelete}
      />
      <div>
        <button onClick={handleDeleteSelected} className="delete-selected">
          Delete Selected
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / rowsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;

