function AboutMe({ onNext, hasNext, language = 'en' }) {
  const isZh = language === 'zh'

  return (
    <div className="about-me">
      <h2>{isZh ? '关于我' : 'About Me'}</h2>

      {isZh ? (
        <>
          <p>
            你好，我是季川！目前居住在 <b>加利福尼亚州欧文市</b>，在加州大学欧文分校（UCI）攻读数据科学硕士学位。
          </p>
          <p>
            我来自 <b>中国上海</b>，本科就读于 <b>伦斯勒理工学院（Rensselaer Polytechnic Institute）</b>，
            主修信息技术与 Web 科学。我的技术兴趣涵盖 Web 开发、机器学习、深度学习以及数据科学，
            喜欢把理论与实际项目结合起来解决真实问题。
          </p>
          <p>
            当我不在分析数据或写代码时，你大概率会在路上看到我骑车。我今年已经骑行了接近 <b>10,000 km</b>，
            骑行对我来说不仅是一项运动，更是持续突破自我的方式。
            欢迎在 Strava 上看看我的路线{' '}
            <a
              href="https://www.strava.com/athletes/56316253"
              target="_blank"
              rel="noopener noreferrer"
              className="strava-link"
              aria-label="Visit my Strava profile"
            >
              <svg
                className="strava-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.006 13.828h4.169" />
              </svg>
            </a>
            ，如果你也在附近骑车，欢迎约一起骑一波。
          </p>
        </>
      ) : (
        <>
          <p>
            Hi, I'm Jichuan! I'm currently based in <b>Irvine, California</b>, where I am pursuing a Master of Data Science at the University of California, Irvine.
          </p>
          <p>
            Originally from <b>Shanghai, China</b>, I moved to the U.S. to complete my undergraduate studies at <b>Rensselaer Polytechnic Institute</b>.
            My technical expertise spans web development, machine learning, deep learning, and data science. I am actively seeking internship opportunities for Summer 2026 and full-time roles post-graduation.
          </p>
          <p>
            When I'm not analyzing data, you can find me on my road bike, Canyon Endurace CF SL 8. I've clocked almost <b>10,000 km</b> this year!
            Check out my Strava{' '}
            <a
              href="https://www.strava.com/athletes/56316253"
              target="_blank"
              rel="noopener noreferrer"
              className="strava-link"
              aria-label="Visit my Strava profile"
            >
              <svg
                className="strava-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.006 13.828h4.169" />
              </svg>
            </a>
            {' '}to see my latest routes—I'm always down for a group ride!
          </p>
        </>
      )}

      {hasNext && (
        <button className="next-section-btn" onClick={onNext}>
          {isZh ? '下一页：教育背景 →' : 'Next: Education →'}
        </button>
      )}
    </div>
  )
}

export default AboutMe

