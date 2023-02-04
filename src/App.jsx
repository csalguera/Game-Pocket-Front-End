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
import LobbyRoom from './pages/LobbyRoom/LobbyRoom'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import FriendList from './pages/FriendList/FriendList'
import FriendDetails from './pages/FriendDetails/FriendDetails'

// services
import * as authService from './services/authService'
import * as leaderboardService from './services/leaderboardService'
import * as friendsService from './services/friendsService'
import * as lobbyService from './services/lobbyService'

// styles
import './App.css'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [friends, setFriends] = useState([])
  const [lobbies, setLobbies] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  // fetch friends
  useEffect(() => {
    const fetchAllFriends = async () => {
      const data = await friendsService.index()
      setFriends(data)
    }
    if (user) fetchAllFriends()
  }, [user])

  // fetch lobbies
  useEffect(() => {
    const fetchAllLobbies = async () => {
      const data = await lobbyService.index()
      setLobbies(data)
    }
    if (user) fetchAllLobbies()
  }, [user])
  
  // Must be prop drilled to Profiles page in future when backend for friends is ready
  const handleAddFriend = async (friendData) => {
    const newFriend = await friendsService.add(friendData)
    setFriends([ newFriend, ...friends ])
    navigate('/friends')
  }
  
  // Must be prop drilled to FriendList and FriendDetails page(s) in future when backend for friends is ready
  const handleRemoveFriend = async (id) => {
    const removedFriend = await friendsService.delete(id)
    setFriends(friends.filter(friend => friend._id !== removedFriend._id))
    navigate('/friends')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing lobbies={lobbies} user={user} />} />
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
          path='/lobby/:id'
          element={
            <ProtectedRoute user={user}>
              <LobbyRoom />
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
              <FriendList friends={friends} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/friends/:id'
          element={
            <ProtectedRoute user={user}>
              <FriendDetails user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
