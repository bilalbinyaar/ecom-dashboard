import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePasta = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [weight, setWeight] = useState('');
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [id, setId] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/product/get-product/${params.slug}`
      );
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setBrand(data.product.brand);
      setWeight(data.product.weight);
      setCategory(data.product.category._id);
      setPhoto(
        `http://localhost:5000/api/product/product-photo/${data.product._id}`
      );
      setId(data.product._id);
    } catch (error) {
      console.log(error, products);
    }
  };

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  //UPDATING PRODUCTS
  const handleUpdateProduct = async (e) => {
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

      const { data } = await axios.put(
        `http://localhost:5000/api/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        navigate('/pasta');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // GET ALL THE PRODUCTS
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:5000/api/product/get-product'
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, []);

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

  const handleProductDelete = async () => {
    console.log('this from delete');
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/product/delete-product/${id}`
      );
      console.log(data);
      if (data?.success) {
        navigate('/pasta');
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
          <h2>Update Product</h2>
        </div>
        <div className="content-inner">
          <div className="categories-content">
            <div className="body-content">
              <div className="inputs-for-modal">
                <select
                  name="categories"
                  id="categories"
                  placeholder="Select Category"
                  value={category}
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
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                    setPreviewImage(URL.createObjectURL(e.target.files[0]));
                  }}
                />
                {previewImage && (
                  <img
                    src={previewImage}
                    alt=""
                    style={{
                      width: '200px',
                      height: 'auto',
                      marginBottom: '0.5rem',
                    }}
                  />
                )}
                {photo && (
                  <img
                    src={photo}
                    alt=""
                    style={{
                      width: '200px',
                      height: 'auto',
                      marginBottom: '0.5rem',
                    }}
                  />
                )}
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
                <button onClick={handleProductDelete}>Delete</button>
                <button onClick={handleUpdateProduct}>Save</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePasta;
