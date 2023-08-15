import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import axios from 'axios';
import SaltFeatureImageModal from '../components/SaltFeatureImageModal';

const WebComponents = () => {
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
        // Handle success or display a message to the admin
        fetchSaltFeatureImage();
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
        // Handle error or display an error message to the admin
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
        // Handle success or display a message to the admin
        fetchSaltFeatureImage();
        handleCloseModal();
      })
      .catch((error) => {
        console.error('Error replacing image:', error);
        // Handle error or display an error message to the admin
      });
  };

  return (
    <div className="main-content">
      <SideBar />

      <div className="content-wrapper">
        <div className="section-title">
          <h2>Components</h2>
        </div>
        <div className="content-inner">
          <div className="upper-content">
            <h4>These are the all listed components</h4>
            <button hidden>Add New</button>
          </div>
          <div className="listed-components">
            <div className="single-component" onClick={handleOpenModal}>
              <h4>Salt Feature Image</h4>
              {saltFeatureImage && (
                <img src={saltFeatureImage} alt="Salt Feature" />
              )}
            </div>
            <SaltFeatureImageModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              handleImageChange={handleImageChange}
              handleReplace={handleReplace}
              handleUpload={handleUpload}
            />
          </div>
        </div>
        {/* <div>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button onClick={handleUpload}>Upload Image</button>
          <br />
          <br />

          <button onClick={handleReplace}>Replace Image</button>
        </div> */}
      </div>
    </div>
  );
};

export default WebComponents;
