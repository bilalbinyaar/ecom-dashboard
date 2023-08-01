import React from 'react'

const CategoryModal = ({ isOpen, onClose, handleSubmit, value, setValue }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
         <h2>Add New Category</h2>
        <div className="inputs-for-modal">
          <input
            type="text"
            placeholder="Enter name of new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CategoryModal