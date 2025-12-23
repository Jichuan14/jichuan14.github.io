import { useState } from 'react'
import './App.css'
import AboutMe from './components/AboutMe'
import Education from './components/Education'
import Projects from './components/Projects'
import Hobby from './components/Hobby'

function App() {
  const [activeSection, setActiveSection] = useState('About Me')

  const sections = ['About Me', 'Education', 'Projects', 'Hobby']

  const breadcrumbItems = sections.map((section, index) => (
    <span key={section}>
      <button
        className={`breadcrumb-item ${activeSection === section ? 'active' : ''}`}
        onClick={() => setActiveSection(section)}
      >
        {section}
      </button>
      {index < sections.length - 1 && <span className="breadcrumb-separator"> / </span>}
    </span>
  ))

  const renderSection = () => {
    switch (activeSection) {
      case 'About Me':
        return <AboutMe />
      case 'Education':
        return <Education />
      case 'Projects':
        return <Projects />
      case 'Hobby':
        return <Hobby />
      default:
        return <AboutMe />
    }
  }

  return (
    <div className="app">
      <nav className="breadcrumb">
        {breadcrumbItems}
      </nav>
      <header className="header">
        <h1 className="name">Jichuan Wu</h1>
      </header>
      
      <main className="main-content">
        <div className="content-section">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}

export default App

