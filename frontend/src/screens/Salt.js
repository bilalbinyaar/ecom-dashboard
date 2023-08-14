import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';

const Salt = () => {
  const [saltProducts, setSaltProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/product/salt-products')
      .then((response) => response.json())
      .then((data) => setSaltProducts(data.products))
      .catch((error) => console.error('Error fetching salt products:', error));
  }, []);
  return (
    <div className="main-content">
      <SideBar />

      <div className="content-wrapper">
        <div className="section-title">
          <h2>Salt Products</h2>
        </div>

        <div className="content-inner">
          <div className="categories-content">
            <div className="upper-content">
              <h4>These are the all listed salt products</h4>
              <button hidden>Add New</button>
            </div>

            <div className="body-content">
              <div className="product-card-listings-main">
                {saltProducts?.map((product) => (
                  <div
                    className="product-card-listings-inner"
                    key={product._id}
                  >
                    <div className="product-card-listings">
                      <div className="product-lists-img-div">
                        <img
                          className="listed-products-img"
                          src={`http://localhost:5000/api/product/product-photo/${product._id}`}
                          alt={product.name}
                        />
                      </div>
                      <div className="product-det-entry">
                        <p>
                          <strong>Name: </strong>
                          <br />
                          {product.name}
                        </p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Category: </strong>
                        <br />
                        <p> {product.category.name}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Brand: </strong>
                        <br />
                        <p>{product.brand}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Weight: </strong>
                        <br />
                        <p>{product.weight}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Price: </strong>
                        <br />
                        <p> {product.price}</p>
                      </div>
                      <div className="product-det-entry">
                        <strong>Description: </strong>
                        <br />
                        <p>{product.description} </p>
                      </div>
                      <div className="edit-del edit-del-prods">
                        <Link
                          to={`/salt/${product.slug}`}
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

export default Salt;
