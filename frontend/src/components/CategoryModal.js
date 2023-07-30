import React, { useState } from 'react';
import axios from 'axios';

const CategoriesModal = ({ isOpen, onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a valid category name.');
      return;
    }

    try {
      const formData = { name: newCategoryName };
      await axios.post('/api/categories', formData);
      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Category</h2>
        <div className="inputs-for-modal">
          <input
            type="name"
            placeholder="Enter name of category"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSaveCategory}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
