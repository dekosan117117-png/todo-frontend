import { useState } from 'react'
import client from '../api/client'

export default function LoginModal({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const params = new URLSearchParams()
      params.append('username', username)
      params.append('password', password)
      const res = await client.post('/login', params)
      localStorage.setItem('token', res.data.access_token)
      onLogin()
    } catch {
      setError('IDかパスワードが違うよ！')
    }
  }

  return (
    <div style={overlay}>
      <div style={modal}>
        <h2 style={{ margin: 0 }}>ログイン</h2>
        <div style={fieldGroup}>
          <label style={label}>ユーザー名</label>
          <input style={input} value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div style={fieldGroup}>
          <label style={label}>パスワード</label>
          <input style={input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {error && <p style={{ color: 'red', margin: 0 }}>{error}</p>}
        <button style={btn} onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  )
}

const overlay = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '1rem',
  boxSizing: 'border-box',
}

const modal = {
  background: 'white',
  padding: '1.5rem',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  maxWidth: '360px',
  boxSizing: 'border-box',
}

const fieldGroup = {
  display: 'flex', flexDirection: 'column', gap: '0.25rem'
}

const label = {
  fontSize: '0.85rem', color: '#555', fontWeight: 'bold'
}

const input = {
  padding: '0.5rem', borderRadius: '4px',
  border: '1px solid #ccc', fontSize: '1rem',
  width: '100%', boxSizing: 'border-box',
}

const btn = {
  padding: '0.6rem', borderRadius: '4px',
  background: '#3b82f6', color: 'white',
  border: 'none', fontSize: '1rem', cursor: 'pointer',
}