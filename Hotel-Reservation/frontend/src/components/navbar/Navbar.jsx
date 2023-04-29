/* Import Module CSS */
import "./navbar.css"

/* Function Navbar */
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo">NzHotel</span>
        <div className="navItems">
          <button className="navButton">Register</button>
          <button className="navButton">Login</button>
        </div>
      </div>
    </div>
  )
}

/* Export File */
export default Navbar