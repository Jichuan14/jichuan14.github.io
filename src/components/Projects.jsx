function Projects({ onNext, hasNext }) {
  return (
    <div className="projects">
      <h2>Projects</h2>
      
      <div className="project-item">
        <h3>Trajectory Mapping with User Level Privacy</h3>
        <p className="project-role">Machine Learning Developer</p>
        <p className="project-description">
          Synthesis model utilizing machine learning to generate a realistic map trajectory dataset while strictly enforcing user-level differential privacy.
        </p>
        <ul className="project-bullets">
          <li>Employed OpenStreetMap and OSMnx for robust data cleaning and precise map matching of raw trajectory datasets.</li>
          <li>Developed and trained a dedicated generative model using NumPy and PyTorch to synthesize trajectory data, successfully preserving the original dataset's statistical trends and features.</li>
          <li>Built a user-level privacy framework using Opacus to monitor model updates and enforce differential privacy (DP), quantifying and protecting individual user data contributions.</li>
          <li>Engineered a specialized map-walking algorithm to generate and test synthetic trajectory datasets under varying differential privacy parameters, allowing for tunable levels of privacy protection.</li>
        </ul>
      </div>

      <div className="project-item">
        <h3>Johnson & Johnson MedTech Internal Ticket Submission Web Application</h3>
        <p className="project-role">Back-end Developer</p>
        <p className="project-description">
          A web application dedicated to managing internal Microsoft Power App ticket requests, significantly improving employee workflow.
        </p>
        <ul className="project-bullets">
          <li>Designed and deployed a robust MongoDB database, adhering strictly to conventional database design principles with 7 interconnected collections/tables and complex relational structures.</li>
          <li>Implemented an admin system that differentiate three different level of access controls for submitting, modifying and viewing tickets.</li>
          <li>Created and maintained backend API services using Express.js to satisfy all functional requirements, closely collaborating with the frontend team for seamless integration and user experience.</li>
          <li>Deployed the complete full-stack application (backend and frontend) on Microsoft Azure for scalable and simplified internal usage.</li>
          <li>Improved the efficiency of J&J employees by an estimated 48 hours per year in Cost-Benefit Analysis (CBA) workflows.</li>
        </ul>
      </div>

      <div className="project-item">
        <h3>HASS Pathways Website</h3>
        <p className="project-role">Front-end Developer</p>
        <p className="project-description">
          A student resource website designed to simplify course selection and satisfy HASS (Humanities, Arts, and Social Sciences) pathway requirements.
        </p>
        <ul className="project-bullets">
          <li>Utilized HTML/CSS and React to develop a precise front-end interface, strictly adhering to the provided design wireframe to clearly illustrate the HASS course system.</li>
          <li>Created an intuitive interface that successfully guides students through the selection process.</li>
          <li>Guided up to 400 students in selecting the appropriate HASS courses, directly contributing to smoother academic planning.</li>
        </ul>
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

