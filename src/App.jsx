import { useState, useEffect, useRef } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import AboutMe from './components/AboutMe'
import Education from './components/Education'
import Projects from './components/Projects'
import Hobby from './components/Hobby'

function App() {
  const [showWelcome, setShowWelcome] = useState(true)
  const [activeSection, setActiveSection] = useState('About Me')
  const [isAnimating, setIsAnimating] = useState(false)
  const contentRef = useRef(null)
  const welcomeRef = useRef(null)
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
      setIsAnimating(true)
      setTimeout(() => {
        setActiveSection(next)
        setTimeout(() => setIsAnimating(false), 300)
      }, 150)
    }
  }

  const goToPreviousSection = () => {
    const previous = getPreviousSection(activeSection)
    if (previous) {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveSection(previous)
        setTimeout(() => setIsAnimating(false), 300)
      }, 150)
    }
  }

  const handleSectionChange = (newSection) => {
    setIsAnimating(true)
    setTimeout(() => {
      setActiveSection(newSection)
      setTimeout(() => setIsAnimating(false), 300)
    }, 150)
  }

  // Handle welcome page scroll detection
  useEffect(() => {
    const handleWelcomeScroll = (e) => {
      if (!showWelcome || !welcomeRef.current) return

      const element = welcomeRef.current
      const { scrollTop, scrollHeight, clientHeight } = element
      
      // If scrolled down on welcome page, transition to main content
      if (scrollTop > 50 || (scrollTop + clientHeight >= scrollHeight - 10)) {
        setShowWelcome(false)
        // Reset scroll position for main content
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = 0
          }
        }, 100)
      }
    }

    const handleWelcomeWheel = (e) => {
      if (!showWelcome || !welcomeRef.current) return

      const element = welcomeRef.current
      const { scrollTop, scrollHeight, clientHeight } = element
      const maxScroll = scrollHeight - clientHeight

      // If at bottom and scrolling down, or if content is not scrollable and scrolling down
      if (e.deltaY > 0 && (maxScroll <= 10 || scrollTop + clientHeight >= scrollHeight - 10)) {
        e.preventDefault()
        setShowWelcome(false)
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTop = 0
          }
        }, 100)
      }
      // If at top and scrolling up, allow normal scrolling (stay on welcome page)
      // No need to prevent default, let it scroll normally
    }

    if (showWelcome && welcomeRef.current) {
      const welcomeElement = welcomeRef.current
      welcomeElement.addEventListener('scroll', handleWelcomeScroll, { passive: true })
      welcomeElement.addEventListener('wheel', handleWelcomeWheel, { passive: false })
      return () => {
        welcomeElement.removeEventListener('scroll', handleWelcomeScroll)
        welcomeElement.removeEventListener('wheel', handleWelcomeWheel)
      }
    }
  }, [showWelcome])

  // Handle page-level scroll to go back to welcome page
  useEffect(() => {
    if (showWelcome) return

    let scrollAccumulator = 0
    let lastWheelTime = 0
    let lastSectionChangeTime = 0
    const SCROLL_THRESHOLD = 120
    const WHEEL_TIMEOUT = 300
    const SECTION_CHANGE_COOLDOWN = 500

    const handlePageWheel = (e) => {
      if (showWelcome || activeSection !== 'About Me') return

      const now = Date.now()
      if (now - lastSectionChangeTime < SECTION_CHANGE_COOLDOWN) {
        return
      }

      // Check if we're at the top of the page
      const isAtPageTop = window.scrollY <= 10

      // Scrolling up at the top of the page
      if (e.deltaY < 0 && isAtPageTop) {
        // Reset accumulator if too much time passed
        if (now - lastWheelTime > WHEEL_TIMEOUT) {
          scrollAccumulator = 0
        }

        scrollAccumulator += Math.abs(e.deltaY)
        lastWheelTime = now

        if (scrollAccumulator >= SCROLL_THRESHOLD) {
          e.preventDefault()
          scrollAccumulator = 0
          lastWheelTime = 0
          lastSectionChangeTime = now
          setShowWelcome(true)
          window.scrollTo({ top: 0, behavior: 'smooth' })
          setTimeout(() => {
            if (welcomeRef.current) {
              welcomeRef.current.scrollTop = 0
            }
          }, 100)
        } else {
          e.preventDefault()
        }
      }
    }

    window.addEventListener('wheel', handlePageWheel, { passive: false })
    return () => {
      window.removeEventListener('wheel', handlePageWheel)
    }
  }, [showWelcome, activeSection])

  // Reset scroll position when section changes
  useEffect(() => {
    if (contentRef.current && !showWelcome) {
      contentRef.current.scrollTop = 0
    }
  }, [activeSection, showWelcome])

  // Handle scroll detection - only trigger on deliberate wheel scrolling past boundaries
  useEffect(() => {
    let isTransitioning = false
    let scrollAccumulator = 0
    let lastWheelTime = 0
    let lastScrollDirection = null // Track last scroll direction
    let lastSectionChangeTime = 0 // Track when last section change occurred
    const SCROLL_THRESHOLD = 120 // Require 120px of scroll delta to trigger (less sensitive)
    const WHEEL_TIMEOUT = 300 // Reset accumulator if no wheel event for 300ms
    const SECTION_CHANGE_COOLDOWN = 500 // Minimum time between section changes (ms)

    const handleWheel = (e) => {
      const element = contentRef.current
      if (!element || isTransitioning) return

      const now = Date.now()
      // Prevent rapid section changes - require cooldown period
      if (now - lastSectionChangeTime < SECTION_CHANGE_COOLDOWN) {
        return
      }

      const { scrollTop, scrollHeight, clientHeight } = element
      const maxScroll = scrollHeight - clientHeight
      const isContentScrollable = maxScroll > 10
      
      // More lenient boundary detection - allow 10px margin
      const isAtBottom = isContentScrollable ? (scrollTop + clientHeight >= scrollHeight - 10) : true
      const isAtTop = isContentScrollable ? (scrollTop <= 10) : true

      // Scrolling down - check if we should go to next section
      if (e.deltaY > 0) {
        // If content is scrollable, only trigger when at bottom
        // If content is not scrollable, always allow scrolling down to next section
        if (isAtBottom) {
          // Reset accumulator if too much time passed or scrolling direction changed
          if (now - lastWheelTime > WHEEL_TIMEOUT || lastScrollDirection === 'up') {
            scrollAccumulator = 0
          }
          
          scrollAccumulator += e.deltaY
          lastWheelTime = now
          lastScrollDirection = 'down'

          // Only prevent default and switch section if threshold is reached
          if (scrollAccumulator >= SCROLL_THRESHOLD) {
            e.preventDefault()
            const next = getNextSection(activeSection)
            if (next) {
              // Reset everything for next scroll action
              scrollAccumulator = 0
              lastWheelTime = 0
              lastScrollDirection = null
              lastSectionChangeTime = now
              isTransitioning = true
              setIsAnimating(true)
              setTimeout(() => {
                setActiveSection(next)
                setTimeout(() => {
                  isTransitioning = false
                  setIsAnimating(false)
                }, 300)
              }, 150)
            } else {
              // No next section, don't prevent default
              scrollAccumulator = 0
            }
          } else {
            // Prevent default to show resistance, but don't switch yet
            e.preventDefault()
          }
        } else if (isContentScrollable) {
          // Normal scrolling within content - reset accumulator
          scrollAccumulator = 0
          lastWheelTime = 0
          lastScrollDirection = null
        }
      }
      // Scrolling up - check if we should go to previous section or back to welcome
      else if (e.deltaY < 0) {
        // If content is scrollable, trigger when at or near top
        // If content is not scrollable, always allow scrolling up to previous section
        if (isAtTop) {
          // Check if we're on the first section - if so, go back to welcome page
          if (activeSection === 'About Me') {
            // Reset accumulator if too much time passed or scrolling direction changed
            if (now - lastWheelTime > WHEEL_TIMEOUT || lastScrollDirection === 'down') {
              scrollAccumulator = 0
            }
            
            scrollAccumulator += Math.abs(e.deltaY)
            lastWheelTime = now
            lastScrollDirection = 'up'

            // If threshold reached, go back to welcome page
            if (scrollAccumulator >= SCROLL_THRESHOLD) {
              e.preventDefault()
              scrollAccumulator = 0
              lastWheelTime = 0
              lastScrollDirection = null
              lastSectionChangeTime = now
              isTransitioning = true
              setShowWelcome(true)
              setTimeout(() => {
                isTransitioning = false
                // Reset welcome page scroll position
                if (welcomeRef.current) {
                  welcomeRef.current.scrollTop = 0
                }
              }, 300)
            } else {
              // Prevent default to show resistance, but don't switch yet
              e.preventDefault()
            }
          } else {
            // Not on first section, go to previous section
            // Reset accumulator if too much time passed or scrolling direction changed
            if (now - lastWheelTime > WHEEL_TIMEOUT || lastScrollDirection === 'down') {
              scrollAccumulator = 0
            }
            
            // Use absolute value to accumulate upward scroll the same way as downward
            scrollAccumulator += Math.abs(e.deltaY)
            lastWheelTime = now
            lastScrollDirection = 'up'

            // Only prevent default and switch section if threshold is reached
            if (scrollAccumulator >= SCROLL_THRESHOLD) {
              e.preventDefault()
              const previous = getPreviousSection(activeSection)
              if (previous) {
                // Reset everything for next scroll action
                scrollAccumulator = 0
                lastWheelTime = 0
                lastScrollDirection = null
                lastSectionChangeTime = now
                isTransitioning = true
                setIsAnimating(true)
                setTimeout(() => {
                  setActiveSection(previous)
                  setTimeout(() => {
                    isTransitioning = false
                    setIsAnimating(false)
                    // Set scroll to bottom of previous section if it's scrollable
                    if (contentRef.current) {
                      const prevElement = contentRef.current
                      const prevMaxScroll = prevElement.scrollHeight - prevElement.clientHeight
                      if (prevMaxScroll > 10) {
                        prevElement.scrollTop = prevElement.scrollHeight
                      }
                    }
                  }, 300)
                }, 150)
              } else {
                // No previous section, don't prevent default
                scrollAccumulator = 0
              }
            } else {
              // Prevent default to show resistance, but don't switch yet
              e.preventDefault()
            }
          }
        } else if (isContentScrollable) {
          // Normal scrolling within content - reset accumulator
          scrollAccumulator = 0
          lastWheelTime = 0
          lastScrollDirection = null
        }
      }
    }

    const contentElement = contentRef.current
    if (contentElement && !showWelcome) {
      contentElement.addEventListener('wheel', handleWheel, { passive: false })
      return () => {
        contentElement.removeEventListener('wheel', handleWheel)
      }
    }
  }, [activeSection, showWelcome])

  const breadcrumbItems = sections.map((section, index) => (
    <span key={section}>
      <button
        className={`breadcrumb-item ${activeSection === section ? 'active' : ''}`}
        onClick={() => handleSectionChange(section)}
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

  if (showWelcome) {
    return (
      <div className="app">
        <div className="welcome-container" ref={welcomeRef}>
          <Welcome onEnter={() => setShowWelcome(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="breadcrumb">
        {breadcrumbItems}
      </nav>
      <header className="header">
        <h1 className="name">Jichuan Wu</h1>
      </header>
      
      <div className="content-wrapper">
        <main className="main-content" ref={contentRef}>
          <div className={`content-section ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            {renderSection()}
          </div>
        </main>
        <div className="section-indicator">
          {sections.map((section, index) => (
            <div
              key={section}
              className={`indicator-square ${activeSection === section ? 'active' : ''}`}
              onClick={() => handleSectionChange(section)}
              title={section}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

