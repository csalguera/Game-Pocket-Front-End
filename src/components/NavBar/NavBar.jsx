import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav className="navbar">
      {user ?
        <ul >
          <li id="welcome">Welcome, {user.name}</li>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/leaderboard">Leaderboard</Link></li>
          <li><Link to="/my-page">My Page</Link></li>
          <li><Link to="" onClick={handleLogout}>Log Out</Link></li>
        </ul>
      :
        <div id="landing-nav"></div>
      }
    </nav>
  )
}

export default NavBar
