import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginModal from './components/LoginModal'
import RegisterPage from './pages/RegisterPage'
import ListPage from './pages/ListPage'
import client from './api/client'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    setIsLoggedIn(false)
    return
  }
  // トークンが有効か確認
  client.get('/todos').then(() => {
    setIsLoggedIn(true)
  }).catch((error) => {
      // 401のときだけトークン削除、それ以外はログイン状態維持
      if (error.response && error.response.status === 401) {
          localStorage.removeItem('token')
          setIsLoggedIn(false)
      } else {
          setIsLoggedIn(true)  // スリープ等のエラーはログイン維持
      }
  })
}, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
  }

  return (
    <BrowserRouter>
      {!isLoggedIn && <LoginModal onLogin={handleLogin} />}
      <Routes>
        <Route path="/" element={<RegisterPage onLogout={handleLogout} />} />
        <Route path="/list" element={<ListPage onLogout={handleLogout} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}