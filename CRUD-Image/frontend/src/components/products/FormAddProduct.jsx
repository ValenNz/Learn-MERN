/* Import Module */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormAddProduct = () => {

  /* Membuat state */
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const [msg, setMsg] = useState("");

  /* Melakukan navigasi (redirect) */
  const navigate = useNavigate();

  /* Function unutk menampilkan image */
  const loadImage = (e) => {
    const image = e.target.files[0]; // meampilkan single
    setFile(image); // setting image
    setPreview(URL.createObjectURL(image)); // memesakuan data image ke preview
  };

  /* Function untuk menyimpan data */
  const saveProduct = async (e) => {
    e.preventDefault(); // mematikan funnction default dari event
    
    /* Membuat form data */
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("file", file);  // simpan data form data formData.append(data di db, data state)
   

    /* Uji Coba penyimpanan */
    try {
      await axios.post("http://localhost:5000/product", formData, { // Tunggu program berjalan
        /* Mengirim header untuk mengelola file */
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/products"); // jika berhasil redirect (arahkan) ke home
    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      }    }
  };

  return (
    <div>
      <h1 className="title">Products</h1>
      <h2 className="subtitle">Add New Product</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={saveProduct} >
            <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)} // melakukan perubahan state dengan set state yang telah dibuat
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Price</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Image</label>
                <div className="control">
                  <div className="file">
                    <label className="file-label">
                      <input
                        type="file"
                        className="file-input"
                        onChange={loadImage}
                      />
                      <span className="file-cta">
                        <span className="file-label">Choose a file...</span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Membuat preview */}
              {preview ? (
                <figure className="image is-128x128">
                  <img src={preview} alt="Preview Image" /> {/* Mengambil source dari url */}
                </figure>

              /* Jika imgae ksong tidak melakukan rendering */
              ) : (
                ""
              )}

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Export file */
export default FormAddProduct;