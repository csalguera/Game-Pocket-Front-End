import styles from './Landing.module.css'
import LobbyList from '../../components/LobbyList/LobbyList'

const Landing = ({ user, socket }) => {
  return (
    <main className={styles.container} id="space-invaders">
      <h1>Hello, {user ? user.name : 'please log in or sign up to access the lobby'}</h1>
      {user ? <LobbyList user={user} socket={socket}/> : ''}
    </main>
  )
}

export default Landing
