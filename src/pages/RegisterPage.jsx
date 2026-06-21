import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'

export default function RegisterPage() {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(3)
  const [expiryDate, setExpiryDate] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!title) return
    await client.post('/todos', {
      title,
      done: false,
      priority: Number(priority),
      expiry_date: expiryDate || null,
    })
    setTitle('')
    setPriority(3)
    setExpiryDate('')
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>タスク登録</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
        <input
          placeholder="タスク名"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value={1}>低</option>
          <option value={3}>中</option>
          <option value={5}>高</option>
        </select>
        <input
          type="date"
          value={expiryDate}
          onChange={e => setExpiryDate(e.target.value)}
        />
        <button onClick={handleSubmit}>登録</button>
        <button onClick={() => navigate('/list')}>一覧へ</button>
      </div>
    </div>
  )
}