// npm modules
import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { socket } from './services/socket'

// page components
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import Profile from './pages/Profile/Profile'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import LobbyRoom from './pages/LobbyRoom/LobbyRoom'
import Leaderboard from './pages/Leaderboard/Leaderboard'

// services
import * as authService from './services/authService'
import * as recordService from './services/recordService'
import * as lobbyService from './services/lobbyService'

// styles
import './App.css'
import Footer from './components/Footer/Footer'
import MyPage from './pages/MyPage/MyPage'
import Chatroom from './pages/Chatroom/Chatroom'
import UpdateProfile from './pages/UpdateProfile/UpdateProfile'

const App = () => {
  const location = useLocation()
  const [user, setUser] = useState(authService.getUser())
  const [lobby, setLobby] = useState('')
  const [chatroom, setChatroom] = useState('')
  const [records, setRecords] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  // fetch records
  useEffect(() => {
    const fetchAllRecords = async () => {
      const data = await recordService.index()
      setRecords(data)
    }
    if (user) fetchAllRecords()
  }, [user])

  // leave lobby automatically
  useEffect(() => {
    const leaveLobby = async () => {
      const lobbyLocation = location.pathname.replace('/lobby/', '')
      if (lobby !== lobbyLocation && lobbyLocation === '/') await lobbyService.leaveLobby(lobby._id)
    }
    if (lobby) leaveLobby()
  }, [location])

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} socket={socket}/>
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
          path="/update-profile"
          element={
            <ProtectedRoute user={user}>
              <UpdateProfile handleSignupOrLogin={handleSignupOrLogin} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-page"
          element={
            <ProtectedRoute user={user}>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/lobby/:id'
          element={
            <ProtectedRoute user={user}>
              <LobbyRoom
                user={user}
                lobby={lobby}
                setLobby={setLobby}
              />
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
          path='/chatroom/:id'
          element={
            <ProtectedRoute user={user}>
              <Chatroom
                user={user}
                lobby={lobby}
                chatroom={chatroom}
                setChatroom={chatroom}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer user={user} />
    </>
  )
}

export default App
