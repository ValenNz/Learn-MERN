import React, { useEffect }  from "react";
import Layout from "../Layout";
import FormEditProduct from "../../components/products/FormEditProduct";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUser } from "../../features/authSlice";

const EditProduct = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);// menangkap erro dari redux store

  /* Menangkap Profile */
  useEffect(() => {
    dispatch(profileUser()); // tangkap profileUser
  }, [dispatch]);  // depedency

  /* Menangkap eror (harus login) */
  useEffect(() => {
    if (isError) { // jika error (belum login)
      navigate("/"); // arahkan ke login
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <FormEditProduct />
    </Layout>
  );
};

export default EditProduct;