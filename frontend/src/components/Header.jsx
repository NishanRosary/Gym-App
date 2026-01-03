import React, { useState } from 'react'

function Header() {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a className="brand" href="#" aria-label="ShadowFit home">
          <div className="logo" aria-hidden>
            <svg viewBox="0 0 24 24" className="logo-svg" role="img" aria-hidden="true">
              <path d="M12 2c2.5 0 4.7 1.6 6 4-1.8 0-3 1-4 1 0 0 1.2 2.6 4 3-2.4.2-4 2-6 2s-3.6-1.8-6-2c2.8-.4 4-3 4-3-1 0-2.2-1-4-1C7.3 3.6 9.5 2 12 2z" fill="currentColor"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">ShadowFit</span>
            <span className="brand-sub">Train in the shadows. Rise in the light.</span>
          </div>
        </a>

        <nav className="primary-nav" role="navigation" aria-label="Primary">
          <button 
            id="navToggle" 
            className="nav-toggle" 
            aria-expanded={navOpen} 
            aria-controls="primaryNav"
            onClick={toggleNav}
          >
            Menu
          </button>
          <ul id="primaryNav" className={`nav-list ${navOpen ? 'active' : ''}`}>
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#trainers">Trainers</a></li>
            <li><a href="#schedule">Schedule</a></li>
            <li><a href="#contact" className="ghost">Contact</a></li>
            <li><a href="#signup" className="cta">Join Free</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

