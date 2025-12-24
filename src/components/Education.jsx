function Education({ onNext, hasNext }) {
  return (
    <div className="education">
      <h2>Education</h2>
      <div className="education-item">
        <h3>University of California, Irvine</h3>
        <p className="location">Irvine, California</p>
        <p className="degree">Master of Data Science</p>
        <p className="period">Expected December 2026</p>
        <p>
          Currently pursuing advanced studies in data science, machine learning, and artificial intelligence. 
          Focused on developing expertise in data analysis, statistical modeling, and predictive analytics.
        </p>
      </div>
      <div className="education-item">
        <h3>Rensselaer Polytechnic Institute</h3>
        <p className="location">Troy, New York</p>
        <p className="degree">B.S., Information Technology & Web Science</p>
        <p className="period">2021 - 2024</p>
        <p>
          Graduated with a degree in Information Technology and Web Science, a program ranked #1 nationwide 
          by College Choice in 2017. Gained comprehensive knowledge in web development, database systems, 
          algorithms, and software engineering through rigorous coursework and hands-on projects.
        </p>
      </div>
      {hasNext && (
        <button className="next-section-btn" onClick={onNext}>
          Next: Projects →
        </button>
      )}
    </div>
  )
}

export default Education

