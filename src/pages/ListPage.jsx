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
    await client.put(`/todos/${todo.id}`, { ...todo, done: !todo.done })
    fetchTodos()
  }

  const handleDelete = async (id) => {
    await client.delete(`/todos/${id}`)
    fetchTodos()
  }

  return (
    <div style={container}>
      <h1 style={{ marginBottom: '1rem' }}>タスク一覧</h1>
      <button style={btnSecondary} onClick={() => navigate('/')}>登録画面へ</button>
      <div style={tableWrapper}>
        <table style={table}>
          <thead>
            <tr style={theadRow}>
              <th style={th}>完了</th>
              <th style={th}>タスク名</th>
              <th style={th}>優先度</th>
              <th style={th}>期限</th>
              <th style={th}>削除</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} style={todo.done ? trDone : tr}>
                <td style={td}>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => handleDone(todo)}
                  />
                </td>
                <td style={{ ...td, textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? '#999' : '#000' }}>
                  {todo.title}
                </td>
                <td style={{ ...td, textAlign: 'center' }}>
                  {todo.priority === 5 ? '🔴 高' : todo.priority === 3 ? '🟡 中' : '🟢 低'}
                </td>
                <td style={{ ...td, textAlign: 'center' }}>
                  {todo.expiry_date ?? '－'}
                </td>
                <td style={{ ...td, textAlign: 'center' }}>
                  <button style={btnDelete} onClick={() => handleDelete(todo.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const container = {
  padding: '1.5rem',
  maxWidth: '700px',
  margin: '0 auto',
  boxSizing: 'border-box',
}

const tableWrapper = {
  marginTop: '1rem',
  overflowX: 'auto',
}

const table = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem',
}

const theadRow = {
  background: '#3b82f6',
  color: 'white',
}

const th = {
  padding: '0.6rem 0.8rem',
  border: '1px solid #93c5fd',
  textAlign: 'left',
  whiteSpace: 'nowrap',
}

const tr = {
  background: 'white',
}

const trDone = {
  background: '#f3f4f6',
}

const td = {
  padding: '0.6rem 0.8rem',
  border: '1px solid #e5e7eb',
}

const btnSecondary = {
  padding: '0.5rem 1rem', borderRadius: '4px',
  background: '#e5e7eb', color: '#333',
  border: 'none', fontSize: '0.95rem', cursor: 'pointer',
}

const btnDelete = {
  padding: '0.3rem 0.6rem', borderRadius: '4px',
  background: '#ef4444', color: 'white',
  border: 'none', fontSize: '0.85rem', cursor: 'pointer',
}