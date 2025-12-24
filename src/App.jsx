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
  const [pageTransition, setPageTransition] = useState(null) // 'entering' or 'leaving' for page transitions
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
    let touchStartY = 0
    let touchEndY = 0
    let swipeThreshold = 50

    const handleWelcomeScroll = (e) => {
      if (!showWelcome || !welcomeRef.current) return

      const element = welcomeRef.current
      const { scrollTop, scrollHeight, clientHeight } = element
      
      // If scrolled down on welcome page, transition to main content
      if (scrollTop > 50 || (scrollTop + clientHeight >= scrollHeight - 10)) {
        setPageTransition('leaving')
        setTimeout(() => {
          setShowWelcome(false)
          setPageTransition('entering')
          setTimeout(() => {
            setPageTransition(null)
            // Reset scroll position for main content
            if (contentRef.current) {
              contentRef.current.scrollTop = 0
            }
          }, 400)
        }, 200)
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
        setPageTransition('leaving')
        setTimeout(() => {
          setShowWelcome(false)
          setPageTransition('entering')
          setTimeout(() => {
            setPageTransition(null)
            if (contentRef.current) {
              contentRef.current.scrollTop = 0
            }
          }, 400)
        }, 200)
      }
      // If at top and scrolling up, allow normal scrolling (stay on welcome page)
      // No need to prevent default, let it scroll normally
    }

    const handleTouchStart = (e) => {
      if (!showWelcome) return
      touchStartY = e.touches[0].clientY
    }

    const handleTouchEnd = (e) => {
      if (!showWelcome || !welcomeRef.current) return
      touchEndY = e.changedTouches[0].clientY
      const swipeDistance = touchStartY - touchEndY

      const element = welcomeRef.current
      const { scrollTop, scrollHeight, clientHeight } = element
      const maxScroll = scrollHeight - clientHeight

      // Swipe down (scrolling down) at bottom
      if (swipeDistance < -swipeThreshold && (maxScroll <= 10 || scrollTop + clientHeight >= scrollHeight - 10)) {
        setPageTransition('leaving')
        setTimeout(() => {
          setShowWelcome(false)
          setPageTransition('entering')
          setTimeout(() => {
            setPageTransition(null)
            if (contentRef.current) {
              contentRef.current.scrollTop = 0
            }
          }, 400)
        }, 200)
      }
    }

    if (showWelcome && welcomeRef.current) {
      const welcomeElement = welcomeRef.current
      welcomeElement.addEventListener('scroll', handleWelcomeScroll, { passive: true })
      welcomeElement.addEventListener('wheel', handleWelcomeWheel, { passive: false })
      welcomeElement.addEventListener('touchstart', handleTouchStart, { passive: true })
      welcomeElement.addEventListener('touchend', handleTouchEnd, { passive: true })
      return () => {
        welcomeElement.removeEventListener('scroll', handleWelcomeScroll)
        welcomeElement.removeEventListener('wheel', handleWelcomeWheel)
        welcomeElement.removeEventListener('touchstart', handleTouchStart)
        welcomeElement.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [showWelcome])


  // Reset scroll position when section changes
  useEffect(() => {
    if (contentRef.current && !showWelcome) {
      contentRef.current.scrollTop = 0
    }
  }, [activeSection, showWelcome])

  // Handle scroll detection - only trigger on deliberate wheel scrolling past boundaries (page-level)
  useEffect(() => {
    if (showWelcome) return

    let isTransitioning = false
    let scrollAccumulator = 0
    let lastWheelTime = 0
    let lastScrollDirection = null // Track last scroll direction
    let lastSectionChangeTime = 0 // Track when last section change occurred
    let pendingSectionChange = false // Flag to prevent multiple rapid triggers
    const SCROLL_THRESHOLD = 250 // Require 250px of scroll delta to trigger (less sensitive)
    const WHEEL_TIMEOUT = 400 // Reset accumulator if no wheel event for 400ms
    const SECTION_CHANGE_COOLDOWN = 1000 // Minimum time between section changes (ms)

    const handleWheel = (e) => {
      const now = Date.now()

      // If the scroll started inside the main content area, do NOT change sections.
      // Let the user freely scroll within the section only.
      if (contentRef.current && contentRef.current.contains(e.target)) {
        return
      }

      // Prevent rapid section changes - check cooldown FIRST
      if (now - lastSectionChangeTime < SECTION_CHANGE_COOLDOWN) {
        e.preventDefault()
        return
      }
      
      // If already transitioning or pending a change, ignore all input
      if (isTransitioning || pendingSectionChange) {
        e.preventDefault()
        return
      }

      // Check page-level scroll position
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const isPageScrollable = maxScroll > 10
      
      // More lenient boundary detection - allow 10px margin
      const isAtBottom = isPageScrollable ? (scrollY + windowHeight >= documentHeight - 10) : true
      const isAtTop = scrollY <= 10

      // Scrolling down - check if we should go to next section
      if (e.deltaY > 0) {
        // If page is scrollable, only trigger when at bottom
        // If page is not scrollable, always allow scrolling down to next section
        if (isAtBottom) {
          // Reset accumulator if too much time passed or scrolling direction changed
          if (now - lastWheelTime > WHEEL_TIMEOUT || lastScrollDirection === 'up') {
            scrollAccumulator = 0
          }
          
          scrollAccumulator += e.deltaY
          // Cap accumulator to prevent rapid multiple triggers
          if (scrollAccumulator > SCROLL_THRESHOLD * 1.5) {
            scrollAccumulator = SCROLL_THRESHOLD * 1.5
          }
          lastWheelTime = now
          lastScrollDirection = 'down'

          // Only prevent default and switch section if threshold is reached
          if (scrollAccumulator >= SCROLL_THRESHOLD) {
            e.preventDefault()
            const next = getNextSection(activeSection)
            if (next) {
              // IMMEDIATELY lock to prevent any further processing
              pendingSectionChange = true
              isTransitioning = true
              scrollAccumulator = 0
              lastWheelTime = 0
              lastScrollDirection = null
              lastSectionChangeTime = now
              
              setIsAnimating(true)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTimeout(() => {
                setActiveSection(next)
                setTimeout(() => {
                  isTransitioning = false
                  setIsAnimating(false)
                  pendingSectionChange = false
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
        } else {
          // Normal scrolling within page - reset accumulator
          scrollAccumulator = 0
          lastWheelTime = 0
          lastScrollDirection = null
        }
      }
      // Scrolling up - check if we should go to previous section or back to welcome
      else if (e.deltaY < 0) {
        // Trigger when at or near top of page
        if (isAtTop) {
          // Check if we're on the first section - if so, go back to welcome page
          if (activeSection === 'About Me') {
            // Reset accumulator if too much time passed or scrolling direction changed
            if (now - lastWheelTime > WHEEL_TIMEOUT || lastScrollDirection === 'down') {
              scrollAccumulator = 0
            }
            
            scrollAccumulator += Math.abs(e.deltaY)
            // Cap accumulator to prevent rapid multiple triggers
            if (scrollAccumulator > SCROLL_THRESHOLD * 1.5) {
              scrollAccumulator = SCROLL_THRESHOLD * 1.5
            }
            lastWheelTime = now
            lastScrollDirection = 'up'

            // If threshold reached, go back to welcome page
            if (scrollAccumulator >= SCROLL_THRESHOLD) {
              e.preventDefault()
              // IMMEDIATELY lock to prevent any further processing
              pendingSectionChange = true
              isTransitioning = true
              scrollAccumulator = 0
              lastWheelTime = 0
              lastScrollDirection = null
              lastSectionChangeTime = now
              
              setPageTransition('leaving')
              setTimeout(() => {
                setShowWelcome(true)
                setPageTransition('entering')
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => {
                  isTransitioning = false
                  setPageTransition(null)
                  pendingSectionChange = false
                  // Reset welcome page scroll position
                  if (welcomeRef.current) {
                    welcomeRef.current.scrollTop = 0
                  }
                }, 400)
              }, 200)
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
            // Cap accumulator to prevent rapid multiple triggers
            if (scrollAccumulator > SCROLL_THRESHOLD * 1.5) {
              scrollAccumulator = SCROLL_THRESHOLD * 1.5
            }
            lastWheelTime = now
            lastScrollDirection = 'up'

            // Only prevent default and switch section if threshold is reached
            if (scrollAccumulator >= SCROLL_THRESHOLD) {
              e.preventDefault()
              const previous = getPreviousSection(activeSection)
              if (previous) {
                // IMMEDIATELY lock to prevent any further processing
                pendingSectionChange = true
                isTransitioning = true
                scrollAccumulator = 0
                lastWheelTime = 0
                lastScrollDirection = null
                lastSectionChangeTime = now
                
                setIsAnimating(true)
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setTimeout(() => {
                  setActiveSection(previous)
                  setTimeout(() => {
                    isTransitioning = false
                    setIsAnimating(false)
                    pendingSectionChange = false
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
        } else {
          // Normal scrolling within page - reset accumulator
          scrollAccumulator = 0
          lastWheelTime = 0
          lastScrollDirection = null
        }
      }
    }

    // Touch handlers for mobile - detect swipe gestures at scroll boundaries
    let touchStartY = 0
    let touchEndY = 0
    let touchStartTime = 0
    let touchAccumulator = 0
    let lastTouchTime = 0
    let lastTouchDirection = null
    let touchStartTarget = null
    const TOUCH_THRESHOLD = 150 // Swipe distance threshold (pixels)
    const TOUCH_TIMEOUT = 400 // Reset accumulator if no touch event for 400ms
    const TOUCH_COOLDOWN = 800 // Minimum time between section changes (ms)
    const MIN_SWIPE_SPEED = 0.4 // Minimum pixels per ms for a valid swipe

    const handleTouchStart = (e) => {
      if (isTransitioning || pendingSectionChange) return
      
      // Check if touch started inside the main content area
      const target = e.target
      if (contentRef.current && contentRef.current.contains(target)) {
        // Touch started inside content area - allow normal scrolling, don't track for section changes
        touchStartTarget = null
        return
      }
      
      touchStartTarget = target
      touchStartY = e.touches[0].clientY
      touchStartTime = Date.now()
      touchAccumulator = 0
    }

    const handleTouchMove = (e) => {
      // Always allow native scrolling - never prevent default
      if (isTransitioning || pendingSectionChange) return
      
      // If touch started inside content area, don't interfere at all
      if (!touchStartTarget || (contentRef.current && contentRef.current.contains(e.target))) {
        return
      }
    }

    const handleTouchEnd = (e) => {
      if (isTransitioning || pendingSectionChange) {
        touchStartY = 0
        touchEndY = 0
        touchStartTarget = null
        return
      }
      
      const now = Date.now()
      if (now - lastSectionChangeTime < TOUCH_COOLDOWN) {
        touchStartY = 0
        touchEndY = 0
        touchStartTarget = null
        return
      }

      // If the touch started inside the main content area, do NOT change sections.
      // Allow scrolling within the current section only.
      if (!touchStartTarget || (contentRef.current && contentRef.current.contains(e.target))) {
        touchStartY = 0
        touchEndY = 0
        touchStartTarget = null
        return
      }
      
      // Also check if current touch target is inside content area
      if (contentRef.current && contentRef.current.contains(e.target)) {
        touchStartY = 0
        touchEndY = 0
        touchStartTarget = null
        return
      }

      touchEndY = e.changedTouches[0].clientY
      const swipeDistance = touchStartY - touchEndY
      const swipeTime = now - touchStartTime
      const swipeSpeed = Math.abs(swipeDistance) / swipeTime

      // Only process if it's a fast enough swipe
      if (swipeSpeed < MIN_SWIPE_SPEED && Math.abs(swipeDistance) < TOUCH_THRESHOLD) {
        touchStartY = 0
        touchEndY = 0
        return
      }

      // Check page-level scroll position
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const maxScroll = documentHeight - windowHeight
      const isPageScrollable = maxScroll > 10
      
      const isAtBottom = isPageScrollable ? (scrollY + windowHeight >= documentHeight - 10) : true
      const isAtTop = scrollY <= 10

      // Swipe down (scrolling down) - go to next section
      if (swipeDistance < -TOUCH_THRESHOLD && isAtBottom) {
        if (now - lastTouchTime > TOUCH_TIMEOUT || lastTouchDirection === 'up') {
          touchAccumulator = 0
        }
        touchAccumulator += Math.abs(swipeDistance)
        lastTouchTime = now
        lastTouchDirection = 'down'
        
        if (touchAccumulator >= TOUCH_THRESHOLD) {
          const next = getNextSection(activeSection)
          if (next) {
            touchAccumulator = 0
            lastTouchTime = 0
            lastTouchDirection = null
            lastSectionChangeTime = now
            isTransitioning = true
            setIsAnimating(true)
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setTimeout(() => {
              setActiveSection(next)
              setTimeout(() => {
                isTransitioning = false
                setIsAnimating(false)
              }, 300)
            }, 150)
          }
        }
      }
      // Swipe up (scrolling up) - go to previous section or welcome
      else if (swipeDistance > TOUCH_THRESHOLD && isAtTop) {
        if (now - lastTouchTime > TOUCH_TIMEOUT || lastTouchDirection === 'down') {
          touchAccumulator = 0
        }
        touchAccumulator += Math.abs(swipeDistance)
        lastTouchTime = now
        lastTouchDirection = 'up'
        
        if (touchAccumulator >= TOUCH_THRESHOLD) {
          if (activeSection === 'About Me') {
            touchAccumulator = 0
            lastTouchTime = 0
            lastTouchDirection = null
            lastSectionChangeTime = now
            isTransitioning = true
            setPageTransition('leaving')
            setTimeout(() => {
              setShowWelcome(true)
              setPageTransition('entering')
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTimeout(() => {
                isTransitioning = false
                setPageTransition(null)
                if (welcomeRef.current) {
                  welcomeRef.current.scrollTop = 0
                }
              }, 400)
            }, 200)
          } else {
            const previous = getPreviousSection(activeSection)
            if (previous) {
              touchAccumulator = 0
              lastTouchTime = 0
              lastTouchDirection = null
              lastSectionChangeTime = now
              isTransitioning = true
              setIsAnimating(true)
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTimeout(() => {
                setActiveSection(previous)
                setTimeout(() => {
                  isTransitioning = false
                  setIsAnimating(false)
                }, 300)
              }, 150)
            }
          }
        }
      }
      
      touchStartY = 0
      touchEndY = 0
      touchAccumulator = 0
      touchStartTarget = null
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [activeSection, showWelcome, getNextSection, getPreviousSection])

  const breadcrumbItems = sections.map((section, index) => (
    <span key={section}>
      <button
        className={`breadcrumb-item ${activeSection === section ? 'active' : ''}`}
        onClick={() => handleSectionChange(section)}
      >
        {section}
      </button>
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
        <div className={`welcome-container ${pageTransition === 'entering' ? 'page-enter' : pageTransition === 'leaving' ? 'page-leave' : ''}`} ref={welcomeRef}>
          <Welcome onEnter={() => setShowWelcome(false)} />
        </div>
      </div>
    )
  }

  return (
    <div className={`app ${pageTransition === 'entering' ? 'page-enter' : pageTransition === 'leaving' ? 'page-leave' : ''}`}>
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
          <footer className="social-footer">
            <span className="social-label">Connect with me:</span>
            <a
              href="https://www.linkedin.com/in/jichuanwu/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <svg
                className="social-icon linkedin-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.32 8.16H4.7V24H.32V8.16zM8.55 8.16h4.18v2.15h.06c.58-1.1 2-2.26 4.11-2.26 4.4 0 5.21 2.9 5.21 6.67V24h-4.38v-8.1c0-1.93-.03-4.41-2.69-4.41-2.69 0-3.1 2.1-3.1 4.27V24H8.55V8.16z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/jichuan.14/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="Instagram profile"
            >
              <svg
                className="social-icon instagram-icon"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.5.6.2 1 .5 1.5 1 .5.5.8.9 1 1.5.2.4.4 1.1.5 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.5 2.3-.2.6-.5 1-1 1.5-.5.5-.9.8-1.5 1-.4.2-1.1.4-2.3.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.5-.6-.2-1-.5-1.5-1-.5-.5-.8-.9-1-1.5-.2-.4-.4-1.1-.5-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.5-2.3.2-.6.5-1 1-1.5.5-.5.9-.8 1.5-1 .4-.2 1.1-.4 2.3-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 .1 5.7.2 4.8.4 4 .7c-.8.3-1.5.7-2.2 1.4C1.1 3 0.7 3.7.4 4.5c-.3.8-.5 1.7-.6 3C-.3 8.8-.3 9.3-.3 12s0 3.2.1 4.5c.1 1.3.3 2.2.6 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.3 1.7.5 3 .6 1.3.1 1.8.1 4.5.1s3.2 0 4.5-.1c1.3-.1 2.2-.3 3-.6.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.3-.8.5-1.7.6-3 .1-1.3.1-1.8.1-4.5s0-3.2-.1-4.5c-.1-1.3-.3-2.2-.6-3-.3-.8-.7-1.5-1.4-2.2C21.7.7 21 .3 20.2 0c-.8-.3-1.7-.5-3-.6C15.2-.3 14.7-.3 12-.3z" />
                <path d="M12 5.8A6.2 6.2 0 1 0 18.2 12 6.2 6.2 0 0 0 12 5.8zm0 10.2A4 4 0 1 1 16 12a4 4 0 0 1-4 4z" />
                <circle cx="18.4" cy="5.6" r="1.4" />
              </svg>
            </a>
          </footer>
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

