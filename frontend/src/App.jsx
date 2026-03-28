import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const frameSources = Array.from({ length: 26 }, (_, index) => {
  const frameNumber = String(index + 1).padStart(3, '0')
  return `/ezgif-4b0c98abcffed112-png-split/ezgif-frame-${frameNumber}.png`
})

const storyBeats = [
  {
    id: 'hero',
    start: 0,
    end: 0.15,
    align: 'center',
    eyebrow: 'Shadow Forge',
    title: 'Built Different.',
    body: [
      'Where strength meets precision.',
      'Premium equipment. Elite training. Zero compromise.',
    ],
  },
  {
    id: 'engineering',
    start: 0.15,
    end: 0.4,
    align: 'left',
    eyebrow: 'Engineering Reveal',
    title: 'Engineered for the relentless.',
    body: [
      'Solid iron core wrapped in military-grade rubber. Built to take every rep, every drop, every day.',
      'Precision-knurled chrome grip. No slip, no compromise, no excuses.',
    ],
  },
  {
    id: 'materials',
    start: 0.4,
    end: 0.65,
    align: 'right',
    eyebrow: 'Performance Materials',
    title: 'Every detail, intentional.',
    body: [
      'Hexagonal anti-roll design stays where you put it.',
      'Chrome steel handle, precision knurled for maximum grip.',
      'Vulcanized rubber coating protects floors and withstands impact.',
    ],
  },
  {
    id: 'results',
    start: 0.65,
    end: 0.85,
    align: 'left',
    eyebrow: 'Strength & Results',
    title: 'The tool that builds legends.',
    body: [
      'From first rep to final set, equipment that matches your ambition. No excuses. Just results.',
      'Used by athletes. Trusted by champions. Built for you.',
    ],
  },
  {
    id: 'cta',
    start: 0.85,
    end: 1,
    align: 'center',
    eyebrow: 'Reassembly',
    title: 'Your strongest self starts here.',
    body: [
      'Premium gym. Elite equipment. Relentless community.',
      'First session free. No contracts. Just commitment.',
    ],
  },
]

const navLinks = [
  { label: 'Training', href: '#training' },
  { label: 'Equipment', href: '#equipment' },
  { label: 'Programs', href: '#programs' },
  { label: 'Nutrition', href: '#nutrition' },
  { label: 'Join', href: '#join' },
]

const metrics = [
  { value: '24/7', label: 'Member access with concierge coaching support' },
  { value: '12', label: 'Elite coaches across strength, mobility, and conditioning' },
  { value: '0', label: 'Compromises in equipment, recovery, or atmosphere' },
]

const equipmentCards = [
  {
    title: 'Hexagonal Balance',
    text: 'Anti-roll geometry and controlled weighting keep every movement planted, stable, and brutally efficient.',
  },
  {
    title: 'Chrome Precision',
    text: 'Deep-knurled handles create a locked-in grip for heavy pulls, carries, presses, and endless volume.',
  },
  {
    title: 'Impact Shield',
    text: 'Vulcanized rubber absorbs punishment, protects the floor, and preserves that premium matte finish.',
  },
]

const programCards = [
  {
    title: 'Strength Lab',
    text: 'Periodized barbell and dumbbell training designed to build force, structure, and confidence week after week.',
  },
  {
    title: 'Conditioning Blackout',
    text: 'High-output circuits, sled work, and metabolic sessions that sharpen your engine without wasting motion.',
  },
  {
    title: 'Recovery Protocol',
    text: 'Mobility flows, guided breathwork, and coach-led reset blocks that keep performance sustainable.',
  },
]

const nutritionPoints = [
  'Precision macro coaching tailored to training intensity and recovery demand.',
  'Chef-inspired meal frameworks built for consistency, not restriction.',
  'Supplement guidance focused on performance, sleep, and long-term adherence.',
]

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getActiveBeat(progress) {
  for (let index = storyBeats.length - 1; index >= 0; index -= 1) {
    if (progress >= storyBeats[index].start) {
      return storyBeats[index]
    }
  }

  return storyBeats[0]
}

function App() {
  const canvasRef = useRef(null)
  const scrollyRef = useRef(null)
  const imageCacheRef = useRef([])
  const [scrollProgress, setScrollProgress] = useState(0)
  const [navVisible, setNavVisible] = useState(false)
  const [loadedFrames, setLoadedFrames] = useState(0)

  useEffect(() => {
    let mounted = true

    frameSources.forEach((src, index) => {
      const image = new Image()
      image.src = src
      image.decoding = 'async'
      image.onload = () => {
        if (!mounted) {
          return
        }

        imageCacheRef.current[index] = image
        setLoadedFrames((current) => current + 1)
      }
      imageCacheRef.current[index] = image
    })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    let ticking = false

    const updateProgress = () => {
      ticking = false

      const section = scrollyRef.current
      if (!section) {
        return
      }

      const rect = section.getBoundingClientRect()
      const maxTravel = Math.max(section.offsetHeight - window.innerHeight, 1)
      const nextProgress = clamp(-rect.top / maxTravel, 0, 1)

      setScrollProgress(nextProgress)
      setNavVisible(window.scrollY > 48)
    }

    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(updateProgress)
      }
    }

    updateProgress()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const firstImage = imageCacheRef.current.find((image) => image?.naturalWidth)

    if (!canvas || !firstImage) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    const frameIndex = Math.min(
      frameSources.length - 1,
      Math.round(scrollProgress * (frameSources.length - 1)),
    )

    const currentImage = imageCacheRef.current[frameIndex] || firstImage
    const devicePixelRatio = window.devicePixelRatio || 1
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    canvas.width = Math.floor(viewportWidth * devicePixelRatio)
    canvas.height = Math.floor(viewportHeight * devicePixelRatio)
    canvas.style.width = `${viewportWidth}px`
    canvas.style.height = `${viewportHeight}px`

    context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    context.clearRect(0, 0, viewportWidth, viewportHeight)
    context.fillStyle = '#050505'
    context.fillRect(0, 0, viewportWidth, viewportHeight)

    const imageRatio = currentImage.naturalWidth / currentImage.naturalHeight
    const viewportRatio = viewportWidth / viewportHeight

    let drawWidth = viewportWidth
    let drawHeight = viewportHeight

    if (imageRatio > viewportRatio) {
      drawHeight = viewportHeight * 0.96
      drawWidth = drawHeight * imageRatio
    } else {
      drawWidth = viewportWidth * 0.88
      drawHeight = drawWidth / imageRatio
    }

    const offsetX = (viewportWidth - drawWidth) / 2
    const offsetY = (viewportHeight - drawHeight) / 2

    context.imageSmoothingEnabled = true
    context.drawImage(currentImage, offsetX, offsetY, drawWidth, drawHeight)
  }, [scrollProgress, loadedFrames])

  const activeBeat = getActiveBeat(scrollProgress)
  const isHeroActive = activeBeat.id === 'hero'

  return (
    <div className="app-shell">
      <header className={`top-nav ${navVisible ? 'is-visible' : ''}`}>
        <div className="top-nav__brand">
          <span className="top-nav__mark">SF</span>
          <span className="top-nav__name">Shadow Forge</span>
        </div>

        <nav className="top-nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="top-nav__cta" href="#join">
          Start Your Journey
        </a>
      </header>

      <main>
        <section className="scrolly-story" ref={scrollyRef}>
          <div className={`scrolly-story__sticky ${isHeroActive ? 'is-hero-active' : ''}`}>
            <div className="ambient-glow ambient-glow--hero" />
            <div className="ambient-glow ambient-glow--rim" />

            <canvas
              ref={canvasRef}
              aria-label="Shadow Forge cinematic dumbbell sequence"
              className="scrolly-story__canvas"
            />

            <div className={`story-copy story-copy--${activeBeat.align} ${isHeroActive ? 'is-hero-active' : ''}`}>
              {storyBeats.filter((beat) => beat.id !== 'hero').map((beat) => {
                const isActive = beat.id === activeBeat.id

                return (
                  <motion.div
                    key={beat.id}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      y: isActive ? 0 : 24,
                      filter: isActive ? 'blur(0px)' : 'blur(8px)',
                    }}
                    className={`story-copy__panel ${isActive ? 'is-active' : ''}`}
                    initial={false}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="story-copy__eyebrow">{beat.eyebrow}</p>
                    <h1>{beat.title}</h1>
                    {beat.body.map((paragraph) => (
                      <p key={paragraph} className="story-copy__body">
                        {paragraph}
                      </p>
                    ))}

                    {beat.id === 'cta' ? (
                      <div className="story-copy__actions">
                        <a className="button button--primary" href="#join">
                          Join Now
                        </a>
                        <a className="button button--secondary" href="#programs">
                          Explore Programs
                        </a>
                      </div>
                    ) : null}
                  </motion.div>
                )
              })}
            </div>

            <div className="scroll-indicator">
              <span>Scroll to disassemble the story</span>
            </div>
          </div>
        </section>

        <section className="content-section intro-section" id="training">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Luxury Performance Club</p>
            <h2>High discipline. Higher design.</h2>
          </div>

          <div className="metrics-grid">
            {metrics.map((item) => (
              <article key={item.label} className="metric-card">
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" id="equipment">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Signature Equipment</p>
            <h2>Crafted like performance hardware.</h2>
          </div>

          <div className="card-grid">
            {equipmentCards.map((card) => (
              <article key={card.title} className="glass-card">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section content-section--split" id="programs">
          <div className="section-heading">
            <p className="section-heading__eyebrow">Coaching Systems</p>
            <h2>Programs built for unstoppable momentum.</h2>
          </div>

          <div className="card-grid">
            {programCards.map((card) => (
              <article key={card.title} className="glass-card glass-card--warm">
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section nutrition-section" id="nutrition">
          <div className="nutrition-section__copy">
            <p className="section-heading__eyebrow">Fuel With Intention</p>
            <h2>Nutrition that respects the work.</h2>
            <p className="nutrition-section__lead">
              Your body composition, energy, and recovery are coached with the same
              precision as every set on the floor.
            </p>
          </div>

          <div className="nutrition-list">
            {nutritionPoints.map((point) => (
              <article key={point} className="nutrition-list__item">
                <span />
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section join-section" id="join">
          <p className="section-heading__eyebrow">Membership</p>
          <h2>Your strongest self starts here.</h2>
          <p className="join-section__lead">
            Step into a training environment built for serious results, elevated design,
            and a relentless community.
          </p>

          <div className="join-section__actions">
            <a className="button button--primary" href="mailto:hello@shadowforge.fit">
              Join Now
            </a>
            <a className="button button--secondary" href="#training">
              Explore The Club
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
