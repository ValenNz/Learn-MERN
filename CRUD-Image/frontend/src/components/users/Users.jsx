import React, { useEffect } from "react";
import Layout from '../../pages/Layout'
import Userlist from './UserList'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileUser } from "../../features/authSlice";
const Users = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(profileUser());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
    if (user && user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
   <Layout>
        <Userlist/>
   </Layout>
  )
}

export default Users
