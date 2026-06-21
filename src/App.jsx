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
  }).catch(() => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
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