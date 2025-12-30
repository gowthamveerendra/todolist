import React, { useEffect, useState } from "react"
import NavBar from "./NavBar"
import AddTodo from "./addtodo"

function Home() {
  const [todos, setTodos] = useState([])
  const user = JSON.parse(localStorage.getItem("user_details"))

  // Fetch all todos for this user
  const fetchTodos = async () => {
    if (!user) return
    try {
      const res = await fetch(`http://localhost:3000/todos?user_id=${user.id}`)
      const data = await res.json()
      setTodos(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // MARK AS COMPLETE
  const markComplete = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: true }),
    })
    fetchTodos()
  }

  // UNDO COMPLETED
  const undoCompleted = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_completed: false }),
    })
    fetchTodos()
  }

  // DELETE TODO
  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, { method: "DELETE" })
    fetchTodos()
  }

  // Separate pending and completed
  const pending = todos.filter((t) => !t.is_completed)
  const completed = todos.filter((t) => t.is_completed)

  return (
    <div>
      <NavBar />
      <AddTodo onTodoAdded={fetchTodos} />

      {/* Pending Todos */}
      <h2>⏳ Pending Todos</h2>
      <div className="todo-list">
        {pending.length === 0 ? (
          <p>No pending todos 🎉</p>
        ) : (
          pending.map((todo) => (
            <div key={todo.id} className="todo-item">
              <span>{todo.todo}</span>
              <div>
                <button
                  className="complete"
                  onClick={() => markComplete(todo.id)}
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

      {/* Completed Todos */}
      <h2>✅ Completed Todos</h2>
      <div className="todo-list">
        {completed.length === 0 ? (
          <p>No completed todos</p>
        ) : (
          completed.map((todo) => (
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

export default Home
