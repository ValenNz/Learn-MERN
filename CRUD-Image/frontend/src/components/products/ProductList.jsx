/* Import Module */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* Membauat Function */
const ProductList = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/product");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">List of Products</h2>
      <Link to="/products/add" className="button is-primary mb-2">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
            <tr key={product.uuid}>
            <td>{index + 1}</td>
            <td>
              <figure className="image is-4by3">
                  <img src={product.url} alt="Image" /> {/* Menanmpilkan image berdasarkan url */}
                </figure>
              </td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.user.name}</td>
            <td>
              <Link
                to={`/products/edit/${product.uuid}`}
                className="button is-small is-info"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteProduct(product.uuid)}
                className="button is-small is-danger"
              >
                Delete
              </button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;