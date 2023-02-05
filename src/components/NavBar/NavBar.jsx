import { Link } from 'react-router-dom'
import styles from './Navbar.module.css'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      {user ?
        <ul >
          <li>Welcome, {user.name}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/friends">Friends</Link></li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/change-password">Change Password</Link></li>
          <li><Link to="" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      :
        <ul>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      }
    </nav>
  )
}

export default NavBar
