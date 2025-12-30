import { Navigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  let loginUser = null

  try {
    loginUser = JSON.parse(localStorage.getItem("user_details"))
  } catch (error) {
    loginUser = null
  }

  if (!loginUser) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
