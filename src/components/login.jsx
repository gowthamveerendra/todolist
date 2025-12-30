import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleForm = (event) => {
    event.preventDefault()

    const fetchData = async () => {
      try {
        const getUser = await fetch(
          `http://localhost:3000/users?email=${email}`
        )
        const jsonRes = await getUser.json()

        if (jsonRes.length === 0 || jsonRes[0].password !== password) {
          alert("Invalid email or password")
        } else {
          localStorage.setItem("user_details", JSON.stringify(jsonRes[0]))
          navigate("/")
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleForm}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <Link to="/register" className="register-link">
        Register
      </Link>
    </div>
  )
}

export default Login
