import { Link, useMatch, useResolvedPath } from "react-router-dom"
import img1 from "../images/logo.png"

export default function Navbar() {
  return (
    <nav className="nav">

      
      <ul>
      <Link to="/" className="whose-turn">
        <img src = {img1} alt="Logo"/>    
        Whose Turn
      </Link>
        <Link to="/login">log in</Link>
        <Link to="/tasks">tasks</Link>
      </ul>
    </nav>
  )
}
