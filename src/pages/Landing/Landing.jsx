import styles from './Landing.module.css'
import Lobby from '../../components/Lobby/Lobby'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>Hello, {user ? user.name : 'please log in or sign up to access the lobby'}</h1>
      {user ? <Lobby user={user} /> : ''}
    </main>
  )
}

export default Landing
