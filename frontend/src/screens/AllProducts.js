import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import ProductModal from '../components/ProductModal';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import ProductEditModal from '../components/ProductEditModal';

const AllProducts = () => {
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
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
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedBrand, setUpdatedBrand] = useState('');
  const [updatedWeight, setUpdatedWeight] = useState('');
  const [updatedPhoto, setUpdatedPhoto] = useState('');
  const [updatedCategory, setUpdatedCategory] = useState('');

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

  // UPDATE SINGLE PRODUCT
  // const handleUpdateProduct = async (e) => {
  //   e.preventDefault();
  //   const productData = new FormData();
  //   productData.append('name', name);
  //   productData.append('description', description);
  //   productData.append('price', price);
  //   productData.append('brand', brand);
  //   productData.append('weight', weight);
  //   productData.append('photo', photo);
  //   productData.append('category', category);
  //   try {
  //     const { data } = await axios.put(
  //       `http://localhost:5000/api/product/update-product/${selected._id}`,
  //       {
  //         name: updatedName,
  //         description: updatedDescription,
  //         photo: updatedPhoto,
  //         brand: updatedBrand,
  //         category: updatedCategory,
  //         price: updatedPrice,
  //       },
  //       productData
  //     );
  //     if (data.success) {
  //       setSelected(null);
  //       setUpdatedName('');
  //       setUpdatedDescription('');
  //       setUpdatedBrand('');
  //       setUpdatedWeight('');
  //       setUpdatedPrice('');
  //       handleCloseEditModal();
  //       getAllProducts();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    console.log('Name', updatedName);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/product/update-product/${selected._id}`,
        {
          name: updatedName,
          description: updatedDescription,
          photo: updatedPhoto,
          brand: updatedBrand,
          category: updatedCategory,
          price: updatedPrice,
        }
      );
      console.log(data);
      if (data.success) {
        setSelected(null);
        setUpdatedName('');
        setUpdatedDescription('');
        setUpdatedBrand('');
        setUpdatedWeight('');
        setUpdatedPrice('');
        handleCloseEditModal();
        getAllProducts();
        console.log(data, 'hanndle update');
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
              {products?.map((p) => (
                <table key={p._id} className="listings-table">
                  <tbody>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Category</th>
                      <th>Brand</th>
                      <th>Weight</th>
                      <th>Price</th>
                      <th>Edit/Delete</th>
                    </tr>
                    <tr className="for-mb">
                      <td>
                        <img
                          className="listed-products-img"
                          src={`http://localhost:5000/api/product/product-photo/${p._id}`}
                          alt={p.name}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{p.description}</td>
                      <td>{p.category.name}</td>
                      <td>{p.brand}</td>
                      <td>{p.weight}</td>
                      <td>{p.price}</td>
                      <td>
                        <div className="edit-del edit-del-prods">
                          <AiFillEdit
                            onClick={() => {
                              handleOpenEditModal();
                              setSelected(p);
                              setUpdatedName(p.name);
                              setUpdatedDescription(p.description);
                              setUpdatedCategory(p.category._id);
                              setUpdatedBrand(p.brand);
                              setUpdatedWeight(p.weight);
                              setUpdatedPrice(p.price);
                              setUpdatedPhoto(
                                `http://localhost:5000/api/product/product-photo/${p._id}`
                              );
                            }}
                          />
                          <AiFillDelete />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ))}
            </div>
            <ProductEditModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              handleUpdateProduct={handleUpdateProduct}
              updatedName={updatedName}
              setValue={setUpdatedName}
              updatedDescription={updatedDescription}
              setUpdatedDescription={setUpdatedDescription}
              updatedPrice={updatedPrice}
              setUpdatedPrice={setUpdatedPrice}
              updatedBrand={updatedBrand}
              setUpdatedBrand={setUpdatedBrand}
              updatedWeight={updatedWeight}
              setUpdatedWeight={setUpdatedWeight}
              setUpdatedPhoto={setUpdatedPhoto}
              updatedPhoto={updatedPhoto}
              setUpdatedCategory={setUpdatedCategory}
              updatedCategory={updatedCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
