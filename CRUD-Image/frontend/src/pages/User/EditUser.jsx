import React, { useEffect } from "react";
import Layout from "../Layout";
import FormEditUser from "../../components/users/FormEditUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUser } from "../../features/authSlice";

const EditUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);  // menangkap erro dari redux store

  /* Menangkap Profile */
  useEffect(() => {
    dispatch(profileUser()); // tangkap profileUser
  }, [dispatch]);  // depedency

  /* Menangkap eror (harus login) */
  useEffect(() => {
    if (isError) {
      navigate("/"); // jka errro (belum logn arahkan ke login)
    }
    if (user && user.role !== "admin") { // jika role bukan admin / ksong arahkan ke dashboard
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);
  
  return (
    <Layout>
      <FormEditUser />
    </Layout>
  );
};

export default EditUser;