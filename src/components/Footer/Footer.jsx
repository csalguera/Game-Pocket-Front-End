import NavStick from "../NavStick/NavStick"
import styles from './Footer.module.css'

const Footer = ({ user }) => {
  if (user)
  return (
    <>
      <NavStick />
      <div className={styles.linkContainer}>
        <a href="https://github.com/WarmSkin/Game-Pocket-Front-End" target="_blank" rel="noreferrer">GitHub</a>
        <p>|</p>
        <a href="/" target="_blank" rel="noreferrer">Attributions</a>
      </div>
    </>
  )
}

export default Footer