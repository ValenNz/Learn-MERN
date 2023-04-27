/* Import Module */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

/* Membuat fungsi Update */
const EditProduct = () => {
  /* Membuat state */
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [preview, setPreview] = useState("");
  const { id } = useParams(); // Memanggil berdasrkan id
  const navigate = useNavigate();

  useEffect(() => {
    getProductById();
  }, []);

  /* Function untuk Read Detail */
  const getProductById = async () => {
    const response = await axios.get(`http://localhost:5000/product/${id}`);
    setTitle(response.data.name); // set title
    setFile(response.data.image); // set image
    setPreview(response.data.url); // set url 
  };

  /* Function unutk menampilkan image */
  const loadImage = (e) => {
    const image = e.target.files[0]; // meampilkan single
    setFile(image); // setting image
    setPreview(URL.createObjectURL(image)); // memesakuan data image ke preview
  };

    /* Function untuk menyimpan data */
  const updateProduct = async (e) => {
    e.preventDefault(); // mematikan funnction default dari event

    /* Membuat form data */
    const formData = new FormData();
    formData.append("file", file); // simpan data form data formData.append(data di db, data state)
    formData.append("title", title);

    /* Uji Coba penyimpanan */
    try {
      await axios.patch(`http://localhost:5000/product/${id}`, formData, { // Tunggu program berjalan
      /* Mengirim header untuk mengelola file */
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/"); // jika berhasil redirect (arahkan) ke home
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="columns is-centered mt-5">
      <div className="column is-half">
        {/* Melakukan actrion yang dikelola oleh saveProduct */}
        <form onSubmit={updateProduct}>
          <div className="field">
            <label className="label">Product Name</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={title}
                onChange={(e) => setTitle(e.target.value)} // melakukan perubahan state dengan set state yang telah dibuat
                placeholder="Product Name"
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
  );
};

export default EditProduct;