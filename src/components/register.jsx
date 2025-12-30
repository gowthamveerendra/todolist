import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleForm = (event) => {
    event.preventDefault()
    const newUser = { username, email, password }

    const addNewUser = async () => {
      try {
        const checkUser = await fetch(
          `http://localhost:3000/users?email=${newUser.email}`
        )
        const jsonRes = await checkUser.json()
        if (jsonRes.length === 0) {
          const response = await fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          })
          if (response.status === 201) {
            alert("Registration successful!")
            navigate("/login") // redirect to login
          }
        } else {
          alert("User already exists")
        }
      } catch (error) {
        console.log(error)
      }
    }

    addNewUser()
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Register</button>
      </form>

      <Link to="/login" className="login-link">
        Login
      </Link>
    </div>
  )
}

export default Register
