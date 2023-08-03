import React from 'react';

const CategoryEditModal = ({
  isOpen,
  onClose,
  handleUpdate,
  updatedName,
  setValue,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Category</h2>
        <div className="inputs-for-modal">
          <input
            type="text"
            placeholder="Enter name of new category"
            value={updatedName}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleUpdate}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
