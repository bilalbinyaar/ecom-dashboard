import React from 'react';

const SaltFeatureImageModal = ({
  isOpen,
  onClose,
  handleImageChange,
  handleReplace,
  handleUpload,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Replace Feature Image</h2>
        <div className="inputs-for-modal">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button className="replace-btn" onClick={handleReplace}>
            Replace Image
          </button>
          {/* <button onClick={handleUpload}>Upload Image</button> */}
        </div>
      </div>
    </div>
  );
};

export default SaltFeatureImageModal;
