import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PastaFeatureImageModal from '../PastaFeatureImageModal';

const PastaFeature = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pastaFeatureImage, setPastaFeatureImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchPastaFeatureImage();
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
        'http://localhost:5000/api/pasta-feature-image/upload-pasta-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image uploaded successfully:', response.data);
        handleCloseModal();

        fetchPastaFeatureImage();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
  };

  const fetchPastaFeatureImage = () => {
    axios
      .get(
        'http://localhost:5000/api/pasta-feature-image/get-pasta-feature-image',
        {
          responseType: 'arraybuffer',
        }
      )
      .then((response) => {
        const imageBlob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        setPastaFeatureImage(URL.createObjectURL(imageBlob));
      })
      .catch((error) => {
        console.error('Error fetching pasta feature image:', error);
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
        'http://localhost:5000/api/pasta-feature-image/replace-pasta-feature-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log('Image replaced successfully:', response.data);
        fetchPastaFeatureImage();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error replacing image:', error);
      });
  };

  return (
    <div className="listed-components">
      <div className="single-component" onClick={handleOpenModal}>
        <h4>Pasta Feature Image</h4>
        {pastaFeatureImage && (
          <img src={pastaFeatureImage} alt="Pasta Feature" />
        )}
      </div>
      <PastaFeatureImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleImageChange={handleImageChange}
        handleReplace={handleReplace}
        handleUpload={handleUpload}
      />
    </div>
  );
};

export default PastaFeature;
