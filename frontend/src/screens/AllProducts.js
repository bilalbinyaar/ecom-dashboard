import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProductModal from '../components/ProductModal';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  const [products, setProducts] = useState([]);

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
              <div className="product-card-listings-main">
                {products?.map((p) => (
                  <div className="product-card-listings-inner" key={p._id}>
                    <div className="product-card-listings">
                      <div className="product-lists-img-div">
                        <img
                          className="listed-products-img"
                          src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                          alt={p.name}
                        />
                      </div>
                      <div className="product-det-entry">
                        <p>
                          <strong>Name: </strong>
                          <br />
                          {p.name}
                        </p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Category: </strong>
                        <br />
                        <p> {p.category.name}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Brand: </strong>
                        <br />
                        <p>{p.brand}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Weight: </strong>
                        <br />
                        <p>{p.weight}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Price: </strong>
                        <br />
                        <p> {p.price}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Description: </strong>
                        <br />
                        <p>{p.description} </p>
                      </div>
                      <div className="edit-del edit-del-prods">
                        <Link
                          to={`/products/${p.slug}`}
                          className="product-link"
                        >
                          <button>Edit</button>
                        </Link>
                      </div>
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

export default AllProducts;
