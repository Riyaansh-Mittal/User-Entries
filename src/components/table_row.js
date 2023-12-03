// TableRow.js

import React, { useState } from 'react';

const TableRow = ({ row, selectedRows, onRowSelection, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ ...row });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Handle save logic if needed

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData({ ...row });
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(row.id); // Pass the row id to the parent component for deletion
  };

  return (
    <tr>
      {Object.values(editedData).map((value, index) => (
        <td key={index}>
          {isEditing ? (
            <input
              type="text"
              value={value}
              onChange={(e) => setEditedData({ ...editedData, [Object.keys(row)[index]]: e.target.value })}
            />
          ) : (
            value
          )}
        </td>
      ))}
      <td>
        {isEditing ? (
          <>
            <button onClick={handleSave} className="save">
              Save
            </button>
            <button onClick={handleCancel} className="cancel">
              Cancel
            </button>
            <button onClick={handleDelete} className="delete">
              Delete
            </button>
          </>
        ) : (
          <>
            <button onClick={handleEdit} className="edit">
              Edit
            </button>
            <button onClick={() => onRowSelection(row.id)} className={selectedRows.includes(row.id) ? 'delete selected' : 'delete'}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
