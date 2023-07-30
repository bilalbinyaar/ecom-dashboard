import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import ProductModal from '../components/ProductModal';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const AllProducts = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="main-content">
      <SideBar />

      <div className="content-wrapper">
        <div className="section-title">
          <h2>All Products</h2>
        </div>
        <div className="content-inner">
          <div className="categories-content">
            <div className="upper-content">
              <h4>These are the all listed products</h4>
              <button onClick={handleOpenModal}>Add New</button>
              <ProductModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
            <div className="body-content">
              <div className="cat-listings-main">
                <div className="cat-listings">
                  <p>name</p>
                  <p>image</p>
                  <div className="edit-del">
                    <AiFillEdit />
                    <AiFillDelete />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
