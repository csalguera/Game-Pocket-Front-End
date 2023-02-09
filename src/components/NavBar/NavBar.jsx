import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import * as profileService from '../../services/profileService'

const NavBar = ({ user, handleLogout }) => {
  const [nickName, setNickName] = useState('')

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await profileService.getProfile(user.profile)
      setNickName(data.name)
    }
    fetchProfile()
  }, [])

  const handleNewName = (name) => {
    setNickName(name)
  }

  return (
    <nav className="navbar">
      {user ?
        <ul >
          <li id="welcome">Welcome, {nickName}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li>
            <Link to="/my-page"
              // state={ }
            >
            My Page</Link></li>
          <li><Link to="" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      :
        <div id="landing-nav"></div>
      }
    </nav>
  )
}

export default NavBar
