import styles from './Landing.module.css'
import LobbyList from '../../components/LobbyList/LobbyList'

const Landing = ({ user, socket }) => {
  return (
    <main className={styles.container} id="space-invaders">
      {user ? <LobbyList user={user} socket={socket}/> : ''}
    </main>
  )
}

export default Landing
