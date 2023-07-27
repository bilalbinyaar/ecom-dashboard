import React, { useState } from 'react';
import axios from 'axios';

const CategoriesModal = ({ isOpen, onClose }) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen) return null;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter a valid category name.');
      return;
    }

    if (!selectedImage) {
      alert('Please select an image for the category.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Replace 'YOUR_BACKEND_API_URL' with the actual URL of your backend API
      const response = await axios.post('/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 'response.data.imageUrl' should contain the URL of the uploaded image
      const imageUrl = response.data.imageUrl;

      const categoryData = { name: newCategoryName, imageUrl };
      await axios.post('/api/categories', categoryData);

      onClose();
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Category</h2>
        <div className="inputs-for-modal">
          <input type="file" accept="image/*" onChange={handleImageChange} />
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
