/* Import Module */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* Membauat Function */
const ProductList = () => {

  /* Membuat State */
  const [products, setProducts] = useState([]); // memeberikan ana statae (product) dan fungsi untuk update state(setProduct)
  // membuat 

  /* Melkaukan rendegring */
  useEffect(() => { // running saat on mounted
    getProducts(); // dapatkan semua data
  }, []); 

  /* Function Get */
  const getProducts = async () => { // Membuat function untuk mengambil semyua data product dari backend 
    const response = await axios.get("http://localhost:5000/product");
    setProducts(response.data); // mengirim response kedalam product
  };

  /* Function Delete */
  const deleteProduct = async (productId) => { // delete berdasrkan id
    try {
      await axios.delete(`http://localhost:5000/product/${productId}`);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      {/* Action Create */}
      <Link to="/add" className="button is-success">
        Add New
      </Link>
      <div className="columns is-multiline mt-2">
        {/* Melakukan maping (mengurai data) */}
        {products.map((product) => ( // mengambil state dengan menginisialisasi setiap data dengan nama product
          <div className="column is-one-quarter" key={product.id}> {/* Memanggil berdasrkan id untuk menampilkan data */}
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={product.url} alt="Image" /> {/* Menanmpilkan image berdasarkan url */}
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{product.name}</p> {/* menampilkan nama product */}
                  </div>
                </div>
              </div>

              <footer className="card-footer">
                {/* Mengarahkan ke file  */}
                {/* Action Edit */}
                <Link to={`edit/${product.id}`} className="card-footer-item">
                  Edit
                </Link>
                {/* Action Delete */}
                <a
                  onClick={() => deleteProduct(product.id)}
                  className="card-footer-item"
                >
                  Delete
                </a>
              </footer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;