import React, { useEffect } from "react";
import Layout from '../../pages/Layout'
import ProductList from './ProductList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUser } from "../../features/authSlice";

const User = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profileUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);

  return (
   <Layout>
        <ProductList/>
   </Layout>
  )
}

export default User
