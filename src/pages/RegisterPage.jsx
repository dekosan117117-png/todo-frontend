import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import client from '../api/client'

export default function RegisterPage() {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState(3)
  const [expiryDate, setExpiryDate] = useState('')
  const [showModal, setShowModal] = useState(false)
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
    setShowModal(true)
}

  return (
  <>
    {showModal && (
      <div style={overlay}>
        <div style={modalBox}>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>✅ 登録完了！</p>
          <button style={btnPrimary} onClick={() => setShowModal(false)}>閉じる</button>
        </div>
      </div>
    )}
    <div style={container}>
      <h1 style={{ marginBottom: '1.5rem' }}>タスク登録</h1>
      <div style={form}>
        <div style={fieldGroup}>
          <label style={label}>タスク名</label>
          <input
            style={input}
            placeholder="タスク名を入力"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div style={fieldGroup}>
          <label style={label}>優先度</label>
          <select style={input} value={priority} onChange={e => setPriority(e.target.value)}>
            <option value={1}>低</option>
            <option value={3}>中</option>
            <option value={5}>高</option>
          </select>
        </div>
        <div style={fieldGroup}>
          <label style={label}>期限</label>
          <input
            style={input}
            type="date"
            value={expiryDate}
            onChange={e => setExpiryDate(e.target.value)}
          />
        </div>
        <button style={btnPrimary} onClick={handleSubmit}>登録</button>
        <button style={btnSecondary} onClick={() => navigate('/list')}>一覧へ</button>
      </div>
    </div>
  </>
)

const container = {
  padding: '1.5rem',
  maxWidth: '480px',
  margin: '0 auto',
  boxSizing: 'border-box',
}

const form = {
  display: 'flex', flexDirection: 'column', gap: '1rem',
}

const fieldGroup = {
  display: 'flex', flexDirection: 'column', gap: '0.25rem',
}

const label = {
  fontSize: '0.85rem', color: '#555', fontWeight: 'bold',
}

const input = {
  padding: '0.5rem', borderRadius: '4px',
  border: '1px solid #ccc', fontSize: '1rem',
  width: '100%', boxSizing: 'border-box',
}

const btnPrimary = {
  padding: '0.6rem', borderRadius: '4px',
  background: '#3b82f6', color: 'white',
  border: 'none', fontSize: '1rem', cursor: 'pointer',
}

const btnSecondary = {
  padding: '0.6rem', borderRadius: '4px',
  background: '#e5e7eb', color: '#333',
  border: 'none', fontSize: '1rem', cursor: 'pointer',
}

const overlay = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

const modalBox = {
  background: 'white', padding: '2rem',
  borderRadius: '8px', textAlign: 'center',
  display: 'flex', flexDirection: 'column', gap: '1rem',
  minWidth: '200px',
}