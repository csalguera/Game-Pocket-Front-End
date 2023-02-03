// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import FriendList from './pages/FriendList/FriendList'

// services
import * as authService from './services/authService'
import * as leaderboardService from './services/leaderboardService'
import * as friendsService from './services/friendsService'

// styles
import './App.css'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [friends, setFriends] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  useEffect(() => {
    const fetchAllFriends = async () => {
      const data = await friendsService.index()
      setFriends(data)
    }
    if (user) fetchAllFriends()
  }, [user])

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/leaderboard'
          element={
            <ProtectedRoute user={user}>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path='/friends'
          element={
            <ProtectedRoute user={user}>
              <FriendList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
