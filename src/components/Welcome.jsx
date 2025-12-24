function Welcome({ onEnter }) {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome to Jichuan's Page</h1>
        <p className="welcome-subtitle">Learn more about me</p>
        <div className="scroll-indicator">
          <span>Scroll down to explore</span>
          <div className="scroll-arrow">↓</div>
        </div>
      </div>
      {/* Spacer to make page scrollable */}
      <div className="welcome-spacer"></div>
    </div>
  )
}

export default Welcome

