import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'

export default function ListPage() {
  const [todos, setTodos] = useState([])
  const navigate = useNavigate()

  const fetchTodos = async () => {
    const res = await client.get('/todos')
    setTodos(res.data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleDone = async (todo) => {
    await client.put(`/todos/${todo.id}`, {
      ...todo,
      done: !todo.done,
    })
    fetchTodos()
  }

  const handleDelete = async (id) => {
    await client.delete(`/todos/${id}`)
    fetchTodos()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>タスク一覧</h1>
      <button onClick={() => navigate('/')}>登録画面へ</button>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleDone(todo)}
            />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <span>優先度:{todo.priority}</span>
            <span>{todo.expiry_date ?? '期限なし'}</span>
            <button onClick={() => handleDelete(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  )
}