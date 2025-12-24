function AboutMe({ onNext, hasNext }) {
  return (
    <div className="about-me">
      <h2>About Me</h2>
      <p>
        Hi, I'm Jichuan! I'm currently based in <b>Irvine, California</b>, where I am pursuing a Master of Data Science at the University of California, Irvine.
      </p>
      <p>
        Originally from <b>Shanghai, China</b>, I moved to the U.S. to complete my undergraduate studies at <b>Rensselaer Polytechnic Institute</b>. 
        My technical expertise spans web development, machine learning, deep learning, and data science. I am actively seeking internship opportunities for Summer 2026 and full-time roles post-graduation.
      </p>
      <p>
      When I'm not analyzing data, you can find me on my road bike,Canyon Endurace CF SL 8. I've clocked almost <b>10,000 km</b> this year!
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
          <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.599h4.172L10.463 0l-7.006 13.828h4.169"/>
        </svg>
      </a>
      {' '}to see my latest routes—I'm always down for a group ride!
      </p>
      {hasNext && (
        <button className="next-section-btn" onClick={onNext}>
          Next: Education →
        </button>
      )}
    </div>
  )
}

export default AboutMe

