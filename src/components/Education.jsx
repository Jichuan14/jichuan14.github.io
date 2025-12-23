function Education({ onNext, hasNext }) {
  return (
    <div className="education">
      <h2>Education</h2>
      <div className="education-item">
        <h3>University Name</h3>
        <p className="degree">Bachelor of Science in Computer Science</p>
        <p className="period">2018 - 2022</p>
        <p>
          Studied various aspects of computer science including algorithms, data structures, 
          software engineering, and database management. Participated in multiple group projects 
          and research initiatives.
        </p>
      </div>
      <div className="education-item">
        <h3>High School</h3>
        <p className="degree">High School Diploma</p>
        <p className="period">2014 - 2018</p>
        <p>
          Focused on mathematics and science courses. Active member of the robotics club 
          and participated in several coding competitions.
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

