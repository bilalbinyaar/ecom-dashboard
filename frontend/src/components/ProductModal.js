import React from 'react';

const ProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <div className="inputs-for-modal">
          <input type="name" placeholder="Enter name of product" />
          <input type="" placeholder="Enter description of product" />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
