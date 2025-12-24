import welcomePic from '../assets/welcome_pic.jpeg'

function Welcome({ onEnter }) {
  return (
    <div className="welcome-page">
      <img src={welcomePic} alt="Welcome background" className="welcome-background-image" />
      <div className="welcome-overlay"></div>
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Jichuan's Homepage</h1>
        <div className="scroll-indicator">
          <span>Scroll down to learn more about me</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      {/* Spacer to make page scrollable */}
      <div className="welcome-spacer"></div>
    </div>
  )
}

export default Welcome

