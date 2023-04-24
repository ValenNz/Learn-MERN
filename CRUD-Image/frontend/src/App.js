/* Import Module */
import {BrowserRouter, Routes, Route} from "react-router-dom";

/* Import Fungsi pada folder componenents */
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

/* Mebuat function */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mengarahkan url ke fil eyang dituju  */}
        <Route path="/" element={<ProductList/>}/> 
        <Route path="add" element={<AddProduct/>}/>
        <Route path="edit/:id" element={<EditProduct/>}/>
      </Routes>
    </BrowserRouter>
  );
}

/* Export file */
export default App;