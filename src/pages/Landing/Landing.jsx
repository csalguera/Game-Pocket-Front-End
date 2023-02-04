import styles from './Landing.module.css'
import LobbyList from '../../components/LobbyList/LobbyList'

const Landing = ({ lobbies, user }) => {
  return (
    <main className={styles.container}>
      <h1>Hello, {user ? user.name : 'please log in or sign up to access the lobby'}</h1>
      {user ? <LobbyList lobbies={lobbies} user={user} /> : ''}
    </main>
  )
}

export default Landing
