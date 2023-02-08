// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { socket } from './services/socket'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Profile from './pages/Profile/Profile'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import LobbyRoom from './pages/LobbyRoom/LobbyRoom'
import Leaderboard from './pages/Leaderboard/Leaderboard'
import FriendList from './pages/FriendList/FriendList'
import FriendDetails from './pages/FriendDetails/FriendDetails'

// services
import * as authService from './services/authService'
import * as recordService from './services/recordService'
import * as friendsService from './services/friendsService'
import * as lobbyService from './services/lobbyService'

// styles
import './App.css'
import Footer from './components/Footer/Footer'
import MyPage from './pages/MyPage/MyPage'
import Chatroom from './pages/Chatroom/Chatroom'

const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [friends, setFriends] = useState([])
  const [records, setRecords] =useState([])
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

  // fetch records
  useEffect(() => {
    const fetchAllRecords = async () => {
      const data = await recordService.index()
      setRecords(data)
    }
    if (user) fetchAllRecords()
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
        <Route path="/" element={<Landing user={user} socket={socket}/>} />
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
              <Profiles user={user}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:id"
          element={
            <ProtectedRoute user={user}>
              <Profile user={user} socket={socket}/>
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
          path="/my-page"
          element={
            <ProtectedRoute user={user}>
              <MyPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/lobby/:id'
          element={
            <ProtectedRoute user={user}>
              <LobbyRoom user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/leaderboard'
          element={
            <ProtectedRoute user={user}>
              <Leaderboard records={records} user={user} />
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
        <Route
          path='/chatroom/:id'
          element={
            <ProtectedRoute user={user}>
              <Chatroom user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer user={user} />
    </>
  )
}

export default App
