import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SaltFeatureImageModal from '../SaltFeatureImageModal';

const SaltFeature = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [saltFeatureImage, setSaltFeatureImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchSaltFeatureImage();
  }, []);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .post(
        'http://localhost:5000/api/salt-feature-image/upload-salt-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        fetchSaltFeatureImage();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const fetchSaltFeatureImage = () => {
    axios
      .get(
        'http://localhost:5000/api/salt-feature-image/get-salt-feature-image',
        {
          responseType: 'arraybuffer',
        }
      )
      .then((response) => {
        const imageBlob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        setSaltFeatureImage(URL.createObjectURL(imageBlob));
      })
      .catch((error) => {
        console.error('Error fetching salt feature image:', error);
      });
  };

  const handleReplace = () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    axios
      .put(
        'http://localhost:5000/api/salt-feature-image/replace-salt-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image replaced successfully:', response.data);
        fetchSaltFeatureImage();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error replacing image:', error);
      });
  };

  return (
    <div className="listed-components">
      {/* SALT FEATURE IMAGE */}
      <div className="single-component" onClick={handleOpenModal}>
        <h4>Salt Feature Image</h4>
        {saltFeatureImage && <img src={saltFeatureImage} alt="Salt Feature" />}
      </div>
      <SaltFeatureImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleImageChange={handleImageChange}
        handleReplace={handleReplace}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default SaltFeature;
