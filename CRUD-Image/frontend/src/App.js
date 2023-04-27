/* Import Module */
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";

import Users from "./components/users/Users";
import AddUser from "./pages/User/AddUser";
import EditUser from "./pages/User/EditUser";

import Products from "./components/products/Products"
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";

/* Mebuat function */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>

        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditUser/>}/>

        <Route path="/products" element={<Products />}/>
        <Route path="/products/add" element={<AddProduct />}/>
        <Route path="/products/edit/:id" element={<EditProduct />}/>

      </Routes>
    </BrowserRouter>
  );
}

/* Export */
export default App;