import Register from "./components/register"
import Login from "./components/login"
import AddTodo from "./components/addtodo"
import { Route, Routes } from "react-router-dom"
import Home from "./components/home"
import Pending from "./components/Pending"
import ProtectedRoute from "./components/ProtectedRoute"
import Completed from "./components/Completed"
import "./App.css"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/completed"
        element={
          <ProtectedRoute>
            <Completed />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Pending"
        element={
          <ProtectedRoute>
            <Pending />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
