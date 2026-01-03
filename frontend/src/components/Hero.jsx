import React from 'react'
import { useModal } from '../context/ModalContext'

function Hero() {
  const { openModal } = useModal()

  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-left">
          <h1 className="hero-title">Elevate your fitness. Unleash the night.</h1>
          <p className="lead">Personalised programs, elite trainers and fight-ready conditioning. Start with a 7-day trial.</p>
          <div className="actions">
            <button className="btn btn-primary" onClick={() => openModal('signup')}>
              Create account
            </button>
            <a href="#pricing" className="btn btn-ghost">View plans</a>
          </div>

          <ul className="meta-row">
            <li><strong>📍</strong><span className="muted">Pillana Garden — Bangalore</span></li>
            <li><strong>⏱</strong><span className="muted">Open: 5AM — 12PM</span></li>
          </ul>
        </div>

        <div className="hero-right" role="img" aria-label="Gym interior background">
          <img src="/images/logo.png" alt="ShadowFit Logo" className="hero-logo" />
          <div className="bat-signal" aria-hidden="true"></div>
        </div>
      </div>
    </section>
  )
}

export default Hero

