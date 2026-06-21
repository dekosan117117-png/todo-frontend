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
        <h2>ログイン</h2>
        <input placeholder="ユーザー名" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="パスワード" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  )
}

const overlay = {
  position: 'fixed', inset: 0,
  background: 'rgba(0,0,0,0.5)',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
}

const modal = {
  background: 'white', padding: '2rem',
  borderRadius: '8px', display: 'flex',
  flexDirection: 'column', gap: '1rem', minWidth: '300px'
}