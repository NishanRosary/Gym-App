import React, { useState } from 'react'

function Header() {
  const [navOpen, setNavOpen] = useState(false)

  const toggleNav = () => {
    setNavOpen(!navOpen)
  }

  return (
    <header className="site-header" role="banner">
      <div className="container header-inner">
        <a className="brand" href="#" aria-label="BEAST FITNESS home">
          <div className="logo" aria-hidden>
            <img src="/images/beast-logo.jpg" alt="Beast Fitness" className="logo-img" />
          </div>
          <div className="brand-text">
            <span className="brand-title">BEAST FITNESS</span>
            <span className="brand-sub">Strength has no limits</span>
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

