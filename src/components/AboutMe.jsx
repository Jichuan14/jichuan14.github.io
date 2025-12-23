function AboutMe({ onNext, hasNext }) {
  return (
    <div className="about-me">
      <h2>About Me</h2>
      <p>
        Hello! I'm Jichuan Wu, a passionate individual with a keen interest in technology and innovation. 
        I enjoy exploring new ideas and solving complex problems through creative thinking and collaboration.
      </p>
      <p>
        My journey has been shaped by curiosity and a drive to continuously learn and grow. 
        I believe in the power of persistence and the importance of staying adaptable in an ever-changing world.
      </p>
      <p>
        When I'm not working on projects, you can find me engaging with various communities, 
        sharing knowledge, and always looking for the next exciting challenge to tackle.
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

