import styles from './Landing.module.css'
import LobbyList from '../../components/LobbyList/LobbyList'
import { Link } from 'react-router-dom'

const Landing = ({ user, socket }) => {
  return (
    <main className={styles.container} id="space-invaders">
      {user ? <LobbyList user={user} socket={socket} /> 
      :
      <div id="game-over">
        <h1>GAME OVER</h1>
        <div id="options">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
      }
    </main>
  )
}

export default Landing
