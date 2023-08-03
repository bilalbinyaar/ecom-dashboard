import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductModal = ({
  isOpen,
  onClose,
  setCategory,
  category,
  setPhoto,
  name,
  setName,
  description,
  setDescription,
  price,
  setPrice,
  brand,
  setBrand,
  weight,
  setWeight,
  handleSaveProduct,
}) => {
  const [categories, setCategories] = useState([]);

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

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <div className="inputs-for-modal">
          <select
            name="categories"
            id="categories"
            placeholder="Select Category"
            onChange={(e) => {
              setCategory(e.target.value); // Use e.target.value directly
            }}
          >
            <option value="">Select Category</option>
            {categories?.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
          <input
            type="text"
            value={name}
            placeholder="Enter name of product"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            value={description}
            placeholder="Enter description of product"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            value={brand}
            placeholder="Enter brand of product"
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            type="text"
            value={weight}
            placeholder="Enter weight of product"
            onChange={(e) => setWeight(e.target.value)}
          />
          <input
            type="text"
            value={price}
            placeholder="Enter price of product"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleSaveProduct}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
