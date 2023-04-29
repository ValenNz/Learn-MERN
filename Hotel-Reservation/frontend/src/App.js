/* Import Module (route) */
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* Import Pages */
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Kamar from "./pages/kamar/Kamar";

/* Function Endpoint (App) */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Endpoint */}
        <Route path="/" element={<Home/>}/>
        <Route path="/kamar" element={<List/>}/>
        <Route path="/kamar/:id" element={<Kamar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

/* Export file */
export default App;
