import NavStick from "../NavStick/NavStick"

const Footer = ({ user }) => {
  return (
    <div className="footer">
      <NavStick user={user} />
      <div className="footer-container">
        <a href="https://github.com/WarmSkin/Game-Pocket-Front-End" target="_blank" rel="noreferrer">GitHub</a>
        <p>|</p>
        {/* link in attributions must be changed once README is done */}
        <a href="/" target="_blank" rel="noreferrer">Attributions</a>
      </div>
    </div>
  )
}

export default Footer