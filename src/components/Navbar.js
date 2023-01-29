import { Link, useMatch, useResolvedPath } from "react-router-dom"


export default function Navbar() {
  return (
    <nav className="nav">

      
      <ul>
      <Link to="/" className="whose-turn">
        <img src = "../images/logo" alt="Logo"/>    
        Whose Turn
      </Link>
        <Link to="/login">log in</Link>
        <Link to="/tasks">tasks</Link>
      </ul>
    </nav>
  )
}
