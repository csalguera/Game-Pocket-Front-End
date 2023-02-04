import styles from './Landing.module.css'
import Lobby from '../../components/Lobby/Lobby'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'friend'}</h1>
      {user ? <Lobby /> : ''}
    </main>
  )
}

export default Landing
