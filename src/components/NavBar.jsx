import { Link, useNavigate } from "react-router-dom"

function NavBar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("user_details")
    navigate("/login", { replace: true })
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/completed">Completed</Link>
      <Link to="/pending">Pending</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  )
}

export default NavBar
