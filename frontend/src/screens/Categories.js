import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import CategoryModal from '../components/CategoryModal';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Categories = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const [name, setName] = useState("");

  // TO POST CATEGORIES
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post('http://localhost:5000/api/category/create-category', {name})
      if(data?.success){
        handleCloseModal();
      }
      else {
        console.log(data?.message)
      }
    } catch (error) {
      console.log(error);
    }
  }


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
          <h2>Categories</h2>
        </div>
        <div className="content-inner">
          <div className="categories-content">
            <div className="upper-content">
              <h4>These are the listed categories</h4>
              <button onClick={handleOpenModal}>Add New</button>
              <CategoryModal isOpen={isModalOpen} onClose={handleCloseModal} handleSubmit={handleSubmit} value={name} setValue={setName}/>
            </div>
            <div className="body-content">
              {/* <div className="cat-listings-main">
                {categories.map((category) => (
                  <div className="cat-listings" key={category._id}>
                    {category.image && (
                      <img
                        src={`data:${
                          category.image.contentType
                        };base64,${category.image.data.toString('base64')}`}
                        alt={category.name}
                        style={{ maxWidth: '200px' }}
                      />
                    )}

                    <p>{category.name}</p>
                    <div className="edit-del">
                      <AiFillEdit />
                      <AiFillDelete />
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
