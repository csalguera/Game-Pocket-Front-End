import styles from './Landing.module.css'
import LobbyList from '../../components/LobbyList/LobbyList'

const Landing = ({ user }) => {
  return (
    <main className={styles.container} id="space-invaders">
      {user ? <LobbyList user={user} /> : ''}
    </main>
  )
}

export default Landing
