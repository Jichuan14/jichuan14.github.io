import welcomePic from '../assets/welcome_pic.jpeg'

function Welcome({ onEnter, language = 'en', onToggleLanguage }) {
  const isZh = language === 'zh'

  const title = isZh ? '欢迎来到季川的个人主页' : "Welcome to Jichuan's Homepage"
  const subtitle = isZh
    ? '向下滚动，了解更多关于我的信息'
    : 'Scroll down to learn more about me'

  const buttonLabel = isZh ? '切换为英文 EN' : 'Switch to 中文'

  return (
    <div className="welcome-page">
      <img src={welcomePic} alt="Welcome background" className="welcome-background-image" />
      <div className="welcome-overlay"></div>
      <div className="welcome-content">
        <h1 className="welcome-title">{title}</h1>
        <div className="scroll-indicator">
          <span>{subtitle}</span>
          <div className="scroll-arrow">↓</div>
        </div>
        {onToggleLanguage && (
          <button
            type="button"
            className="welcome-language-btn"
            onClick={onToggleLanguage}
          >
            {buttonLabel}
          </button>
        )}
      </div>
      {/* Spacer to make page scrollable */}
      <div className="welcome-spacer"></div>
    </div>
  )
}

export default Welcome

