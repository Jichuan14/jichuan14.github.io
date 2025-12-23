import { useState, useEffect, useRef } from 'react'
import './App.css'
import AboutMe from './components/AboutMe'
import Education from './components/Education'
import Projects from './components/Projects'
import Hobby from './components/Hobby'

function App() {
  const [activeSection, setActiveSection] = useState('About Me')
  const contentRef = useRef(null)
  const scrollTimeoutRef = useRef(null)

  const sections = ['About Me', 'Education', 'Projects', 'Hobby']

  const getNextSection = (currentSection) => {
    const currentIndex = sections.indexOf(currentSection)
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null
  }

  const getPreviousSection = (currentSection) => {
    const currentIndex = sections.indexOf(currentSection)
    return currentIndex > 0 ? sections[currentIndex - 1] : null
  }

  const goToNextSection = () => {
    const next = getNextSection(activeSection)
    if (next) {
      setActiveSection(next)
    }
  }

  const goToPreviousSection = () => {
    const previous = getPreviousSection(activeSection)
    if (previous) {
      setActiveSection(previous)
    }
  }

  // Reset scroll position when section changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [activeSection])

  // Handle scroll detection
  useEffect(() => {
    let isTransitioning = false
    let lastScrollTop = 0

    const handleScroll = () => {
      if (isTransitioning) return
      
      const element = contentRef.current
      if (!element) return

      const { scrollTop, scrollHeight, clientHeight } = element
      const maxScroll = scrollHeight - clientHeight
      
      // Check if content is scrollable
      if (maxScroll <= 10) return

      const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up'
      lastScrollTop = scrollTop

      // Scroll down - at bottom
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        const next = getNextSection(activeSection)
        if (next) {
          isTransitioning = true
          setActiveSection(next)
          setTimeout(() => {
            isTransitioning = false
            if (contentRef.current) {
              lastScrollTop = 0
            }
          }, 600)
        }
      }
      // Scroll up - at top
      else if (scrollTop <= 5 && scrollDirection === 'up') {
        const previous = getPreviousSection(activeSection)
        if (previous) {
          isTransitioning = true
          setActiveSection(previous)
          setTimeout(() => {
            isTransitioning = false
            if (contentRef.current) {
              contentRef.current.scrollTop = contentRef.current.scrollHeight
              lastScrollTop = contentRef.current.scrollHeight
            }
          }, 100)
        }
      }
    }

    const handleWheel = (e) => {
      const element = contentRef.current
      if (!element || isTransitioning) return

      const { scrollTop, scrollHeight, clientHeight } = element
      const maxScroll = scrollHeight - clientHeight
      
      if (maxScroll <= 10) return

      // Scrolling down and at bottom
      if (e.deltaY > 0 && scrollTop + clientHeight >= scrollHeight - 5) {
        e.preventDefault()
        const next = getNextSection(activeSection)
        if (next) {
          isTransitioning = true
          setActiveSection(next)
          setTimeout(() => {
            isTransitioning = false
            if (contentRef.current) {
              lastScrollTop = 0
            }
          }, 600)
        }
      }
      // Scrolling up and at top
      else if (e.deltaY < 0 && scrollTop <= 5) {
        e.preventDefault()
        const previous = getPreviousSection(activeSection)
        if (previous) {
          isTransitioning = true
          setActiveSection(previous)
          setTimeout(() => {
            isTransitioning = false
            if (contentRef.current) {
              contentRef.current.scrollTop = contentRef.current.scrollHeight
              lastScrollTop = contentRef.current.scrollHeight
            }
          }, 100)
        }
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      // Reset lastScrollTop when section changes
      lastScrollTop = contentElement.scrollTop
      
      contentElement.addEventListener('scroll', handleScroll, { passive: true })
      contentElement.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        contentElement.removeEventListener('scroll', handleScroll)
        contentElement.removeEventListener('wheel', handleWheel)
      }
    }
  }, [activeSection])

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
    const hasNext = getNextSection(activeSection) !== null
    switch (activeSection) {
      case 'About Me':
        return <AboutMe onNext={goToNextSection} hasNext={hasNext} />
      case 'Education':
        return <Education onNext={goToNextSection} hasNext={hasNext} />
      case 'Projects':
        return <Projects onNext={goToNextSection} hasNext={hasNext} />
      case 'Hobby':
        return <Hobby onNext={goToNextSection} hasNext={hasNext} />
      default:
        return <AboutMe onNext={goToNextSection} hasNext={hasNext} />
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
      
      <main className="main-content" ref={contentRef}>
        <div className="content-section">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}

export default App

