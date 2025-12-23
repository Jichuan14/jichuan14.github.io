function Projects({ onNext, hasNext }) {
  return (
    <div className="projects">
      <h2>Projects</h2>
      <div className="project-item">
        <h3>Web Application Project</h3>
        <p className="project-description">
          Developed a full-stack web application using modern technologies. 
          Implemented user authentication, database integration, and responsive design. 
          The project demonstrates proficiency in both frontend and backend development.
        </p>
        <p className="project-tech">Technologies: React, Node.js, MongoDB</p>
      </div>
      <div className="project-item">
        <h3>Mobile App Development</h3>
        <p className="project-description">
          Created a mobile application for task management with cross-platform compatibility. 
          Features include real-time synchronization, offline mode, and intuitive user interface.
        </p>
        <p className="project-tech">Technologies: React Native, Firebase</p>
      </div>
      <div className="project-item">
        <h3>Data Analysis Tool</h3>
        <p className="project-description">
          Built a data visualization tool that processes large datasets and generates 
          interactive charts and reports. Includes features for data filtering, export, 
          and custom visualization options.
        </p>
        <p className="project-tech">Technologies: Python, Pandas, D3.js</p>
      </div>
      {hasNext && (
        <button className="next-section-btn" onClick={onNext}>
          Next: Hobby →
        </button>
      )}
    </div>
  )
}

export default Projects

