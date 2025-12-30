import { useState } from "react"

function AddTodo({ onTodoAdded }) {
  const [todo, setTodo] = useState("")

  const addbtn = async () => {
    if (!todo.trim()) return

    const loginUser = JSON.parse(localStorage.getItem("user_details"))

    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo,
        is_completed: false,
        user_id: loginUser.id,
      }),
    })

    if (res.ok) {
      setTodo("")
      onTodoAdded() // 🔥 THIS updates Home immediately
    }
  }

  return (
    <div className="add-todo">
      <input
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add your todos..."
      />
      <button onClick={addbtn}>Add</button>
    </div>
  )
}

export default AddTodo
