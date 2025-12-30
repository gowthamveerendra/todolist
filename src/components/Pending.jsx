import React, { useEffect, useState } from "react"
import NavBar from "./NavBar"

function Pending() {
  const [todos, setTodos] = useState([])
  const user = JSON.parse(localStorage.getItem("user_details"))

  const fetchPending = async () => {
    if (!user) return
    const res = await fetch(
      `http://localhost:3000/todos?user_id=${user.id}&is_completed=false`
    )
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchPending()
  }, [])

  const markCompleted = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: true }),
    })
    fetchPending()
  }

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
    fetchPending()
  }

  return (
    <div className="pending-todos-container">
      <NavBar />
      <h2>⏳ Pending Todos</h2>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No pending todos 🎉</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item">
              <span>{todo.todo}</span>
              <div>
                <button
                  className="complete"
                  onClick={() => markCompleted(todo.id)}
                >
                  ✅ Mark Completed
                </button>
                <button className="delete" onClick={() => deleteTodo(todo.id)}>
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Pending
