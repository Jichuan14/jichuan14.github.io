function AboutMe({ onNext, hasNext }) {
  return (
    <div className="about-me">
      <h2>About Me</h2>
      <p>
        I graduated from Rensselaer Polytechnic Institute in December 2024 with a degree in Information Technology and Web Science 
        (a program ranked #1 nationwide by College Choice in 2017).
      </p>
      <p>
        I am currently earning a Master of Data Science from the University of California, Irvine. I'm interested in data science, machine learning, and artificial intelligence.
      </p>
      <p>
        My technical expertise spans the entire web stack—including front-end design and back-end database deployment—alongside 
        advanced proficiency in algorithms, AI, and Deep Learning. I bridge the gap between theory and practice through rigorous 
        team projects and research internships, where I have demonstrated strong leadership and collaboration skills while working 
        with diverse stakeholders.
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

