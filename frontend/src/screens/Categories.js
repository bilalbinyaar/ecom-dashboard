import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import CategoryModal from '../components/CategoryModal';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Categories = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  return (
    <div className="main-content">
      <SideBar />

      <div className="content-wrapper">
        <div className="section-title">
          <h2>Categories</h2>
        </div>
        <div className="content-inner">
          <div className="categories-content">
            <div className="upper-content">
              <h4>These are the listed categories</h4>
              <button onClick={handleOpenModal}>Add New</button>
              <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
            <div className="body-content">
              <div className="cat-listings-main">
                {categories.map((category) => (
                  <div className="cat-listings" key={category._id}>
                    {/* {category.image && (
                      <img
                        src={`data:${
                          category.image.contentType
                        };base64,${category.image.data.toString('base64')}`}
                        alt={category.name}
                        style={{ maxWidth: '200px' }}
                      />
                    )} */}

                    <p>{category.name}</p>
                    <div className="edit-del">
                      <AiFillEdit />
                      <AiFillDelete />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
