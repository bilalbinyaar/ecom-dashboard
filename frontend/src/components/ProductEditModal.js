// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const ProductEditModal = ({
//   isOpen,
//   onClose,
//   handleUpdateProduct,
//   updatedName,
//   setUpdatedName,
//   updatedDescription,
//   setUpdatedDescription,
//   updatedPrice,
//   setUpdatedPrice,
//   updatedBrand,
//   setUpdatedBrand,
//   updatedWeight,
//   setUpdatedWeight,
//   setUpdatedPhoto,
//   setUpdatedCategory,
//   updatedCategory,
//   setValue,
// }) => {
//   const [categories, setCategories] = useState([]);

//   // TO GET CATEGORIES
//   const getAllCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         'http://localhost:5000/api/category/get-category'
//       );
//       if (data?.success) {
//         setCategories(data?.category);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getAllCategory();
//   }, []);

//   if (!isOpen) return null;

//   return (
//     <div className="modal-overlay">
//       <div className="modal-content">
//         <h2>Edit Product</h2>
//         <div className="inputs-for-modal">
//           <select
//             name="categories"
//             id="categories"
//             placeholder="Select Category"
//             value={updatedCategory}
//             onChange={(e) => {
//               setUpdatedCategory(e.target.value);
//             }}
//           >
//             <option value="">Select Category</option>
//             {categories?.map((c) => (
//               <option key={c._id} value={c._id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//           <input
//             type="file"
//             name="photo"
//             accept="image/*"
//             onChange={(e) => setUpdatedPhoto(e.target.files[0])}
//           />
//           <input
//             type="text"
//             value={updatedName}
//             placeholder="Enter name of product"
//             onChange={(e) => setValue(e.target.value)}
//           />
//           <input
//             type="text"
//             value={updatedDescription}
//             placeholder="Enter description of product"
//             onChange={(e) => setUpdatedDescription(e.target.value)}
//           />
//           <input
//             type="text"
//             value={updatedBrand}
//             placeholder="Enter brand of product"
//             onChange={(e) => setUpdatedBrand(e.target.value)}
//           />
//           <input
//             type="text"
//             value={updatedWeight}
//             placeholder="Enter weight of product"
//             onChange={(e) => setUpdatedWeight(e.target.value)}
//           />
//           <input
//             type="text"
//             value={updatedPrice}
//             placeholder="Enter price of product"
//             onChange={(e) => setUpdatedPrice(e.target.value)}
//           />
//         </div>
//         <div className="modal-buttons">
//           <button onClick={onClose}>Close</button>
//           <button onClick={handleUpdateProduct}>Update</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductEditModal;

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductEditModal = ({
  isOpen,
  onClose,
  handleUpdateProduct,
  updatedName,
  setUpdatedName,
  updatedDescription,
  setUpdatedDescription,
  updatedPrice,
  setUpdatedPrice,
  updatedBrand,
  setUpdatedBrand,
  updatedWeight,
  setUpdatedWeight,
  setUpdatedPhoto,
  setUpdatedCategory,
  updatedCategory,
  setValue,
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
        <h2>Edit Product</h2>
        <div className="inputs-for-modal">
          <select
            name="categories"
            id="categories"
            placeholder="Select Category"
            value={updatedCategory}
            onChange={(e) => {
              setUpdatedCategory(e.target.value);
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
            onChange={(e) => setUpdatedPhoto(e.target.files[0])}
          />
          <input
            type="text"
            value={updatedName}
            placeholder="Enter name of product"
            onChange={(e) => setValue(e.target.value)}
          />
          <input
            type="text"
            value={updatedDescription}
            placeholder="Enter description of product"
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <input
            type="text"
            value={updatedBrand}
            placeholder="Enter brand of product"
            onChange={(e) => setUpdatedBrand(e.target.value)}
          />
          <input
            type="text"
            value={updatedWeight}
            placeholder="Enter weight of product"
            onChange={(e) => setUpdatedWeight(e.target.value)}
          />
          <input
            type="text"
            value={updatedPrice}
            placeholder="Enter price of product"
            onChange={(e) => setUpdatedPrice(e.target.value)}
          />
        </div>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={(e) => handleUpdateProduct(e)}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;
