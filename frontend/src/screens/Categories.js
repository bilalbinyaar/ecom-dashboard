import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import CategoryModal from '../components/CategoryModal';
import axios from 'axios';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import CategoryEditModal from '../components/CategoryEditModal';

const Categories = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');

  // TO POST CATEGORIES
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/category/create-category',
        { name }
      );
      if (data?.success) {
        handleCloseModal();
        setName('');
        getAllCategory();
      } else {
        console.log(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TO GET CATEGORIES
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/category/get-category'
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //TO UPDATE CATEGORIES
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        setSelected(null);
        setUpdatedName('');
        handleCloseEditModal();
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TO DELETE CATEGORIES
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/category/delete-category/${pId}`
      );
      if (data.success) {
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // MODAL HANDELLING
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
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
              <CategoryModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="body-content">
              <div className="cat-listings-main">
                {categories?.map((c) => (
                  <div className="cat-listings" key={c._id}>
                    <p>{c.name}</p>
                    <div className="edit-del">
                      <AiFillEdit
                        onClick={() => {
                          handleOpenEditModal();
                          setUpdatedName(c.name);
                          setSelected(c);
                        }}
                      />
                      <AiFillDelete
                        onClick={() => {
                          handleDelete(c._id);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <CategoryEditModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              handleUpdate={handleUpdate}
              updatedName={updatedName}
              setValue={setUpdatedName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
