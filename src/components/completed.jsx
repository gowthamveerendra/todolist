import React, { useEffect, useState } from "react"
import NavBar from "./NavBar"

function Completed() {
  const [todos, setTodos] = useState([])
  const user = JSON.parse(localStorage.getItem("user_details"))

  // Fetch completed todos
  const fetchCompleted = async () => {
    if (!user) return
    try {
      const res = await fetch(
        `http://localhost:3000/todos?user_id=${user.id}&is_completed=true`
      )
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.log("Error fetching completed todos:", error)
    }
  }

  useEffect(() => {
    fetchCompleted()
  }, [])

  // Undo completed
  const undoCompleted = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: false }),
      })
      fetchCompleted()
    } catch (error) {
      console.log("Error undoing completed:", error)
    }
  }

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
      fetchCompleted()
    } catch (error) {
      console.log("Error deleting todo:", error)
    }
  }

  return (
    <div className="completed-todos-container">
      <NavBar />
      <h2>✅ Completed Todos</h2>
      <div className="todo-list">
        {todos.length === 0 ? (
          <p>No completed todos</p>
        ) : (
          todos.map((todo) => (
            <div key={todo.id} className="todo-item completed">
              <span>{todo.todo}</span>
              <div>
                <button className="undo" onClick={() => undoCompleted(todo.id)}>
                  ↩ Undo
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

export default Completed
