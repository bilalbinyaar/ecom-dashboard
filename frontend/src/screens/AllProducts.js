import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import ProductModal from '../components/ProductModal';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

const AllProducts = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shipping, setShipping] = useState('');
  const [brand, setBrand] = useState('');
  const [weight, setWeight] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //CREATING PRODUCTS
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('brand', brand);
      productData.append('weight', weight);
      productData.append('photo', photo);
      productData.append('category', category);

      const { data } = await axios.post(
        'http://localhost:5000/api/product/create-product',
        productData
      );
      if (data?.success) {
        setCategories(data?.category);
        handleCloseModal();
        setName('');
        setDescription('');
        setPrice('');
        setBrand('');
        setWeight('');
      }
    } catch (error) {
      console.log(error);
    }
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
              <ProductModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                setPhoto={setPhoto}
                photo={photo}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                quantity={quantity}
                setQuantity={setQuantity}
                shipping={shipping}
                setShipping={setShipping}
                brand={brand}
                setBrand={setBrand}
                weight={weight}
                setWeight={setWeight}
                handleSaveProduct={handleSaveProduct}
                setCategory={setCategory}
                category={category}
                ignoreWarning={categories}
              />
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
