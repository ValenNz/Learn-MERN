/* Import module */
import React, { useEffect } from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUser } from "../features/authSlice"; 

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError } = useSelector((state) => state.auth); // menangkap erro dari redux store

  /* Menangkap Profile */
  useEffect(() => {
    dispatch(profileUser()); // tangkap profileUser
  }, [dispatch]); // depedency

  /* Menangkap error (harus login) */
  useEffect(() => { 
    if (isError) { // jika berum login maka harus login terlebih dahulu
      navigate("/");
    }
  }, [isError, navigate]); // depedency

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
};

/* Export file */
export default Dashboard;