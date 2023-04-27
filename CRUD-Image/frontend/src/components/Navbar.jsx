/* Import Module */
import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../logo.png"
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser, reset } from "../features/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { user } = useSelector((state) => state.auth);  // menggunakan store

  /* Function logout */
  const logout = () => {
    dispatch(LogoutUser());  // menangkap function erro dari redux store
    dispatch(reset());// tangkap reset ( kembalikan seperti awal) state
    navigate("/"); // arahkan ke login
  };

  return (
    <div>
      <nav class="navbar is-fixed-top has-shadow has-background-black-bis" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <NavLink class="navbar-item" to="/dashboard">
            <img 
                src={logo}
                width="75" 
                height="75" 
                alt="logo"
                className='pl-5 pt-2' 
            />
          </NavLink>
      
          <a href='!#' role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
              <button onClick={logout} className="button is-light">
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
