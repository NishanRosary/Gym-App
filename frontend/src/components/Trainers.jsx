import React, { useState, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import axios from 'axios'

function Trainers() {
  const { openModal } = useModal()
  const [trainers, setTrainers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTrainers()
  }, [])

  const fetchTrainers = async () => {
    try {
      const response = await axios.get('/api/trainers')
      setTrainers(response.data)
    } catch (error) {
      console.error('Error fetching trainers:', error)
      // Fallback to default trainers with images
      setTrainers([
        { id: 1, name: 'Surya Prajin', specialty: 'Powerlifting · Hypertrophy', image: '/images/trainer-suryaa.png' },
        { id: 2, name: 'Jaisees', specialty: 'HIIT · Mobility', image: '/images/trainer-jaisees.png' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleContactTrainer = (trainerName) => {
    openModal('contact', { trainer: trainerName })
  }

  if (loading) {
    return (
      <section id="trainers" className="container trainers" aria-labelledby="trainers-title">
        <h2 id="trainers-title" className="section-title">Our Trainers</h2>
        <div className="muted">Loading trainers...</div>
      </section>
    )
  }

  return (
    <section id="trainers" className="container trainers" aria-labelledby="trainers-title">
      <h2 id="trainers-title" className="section-title">Our Trainers</h2>
      <div className="trainers-grid">
        {trainers.map(trainer => {
          // Map trainer names to images
          let trainerImage = trainer.image
          if (!trainerImage) {
            if (trainer.name.toLowerCase().includes('surya')) {
              trainerImage = '/images/trainer-suryaa.png'
            } else if (trainer.name.toLowerCase().includes('jaisees')) {
              trainerImage = '/images/trainer-jaisees.png'
            }
          }
          
          return (
            <figure key={trainer.id} className="trainer">
              {trainerImage ? (
                <img src={trainerImage} alt={`${trainer.name} — ${trainer.specialty}`} />
              ) : (
                <div className="placeholder-avatar" aria-hidden="true">
                  {trainer.name.charAt(0)}
                </div>
              )}
              <figcaption>
                <h4>{trainer.name}</h4>
                <p className="muted">{trainer.specialty}</p>
                <div className="trainer-actions">
                  <button 
                    className="btn btn-ghost" 
                    onClick={() => handleContactTrainer(trainer.name)}
                  >
                    Contact
                  </button>
                </div>
              </figcaption>
            </figure>
          )
        })}
        <figure className="trainer placeholder">
          <div className="placeholder-avatar" aria-hidden="true">?</div>
          <figcaption>
            <h4>Apply to join</h4>
            <p className="muted">We're hiring fitness pros.</p>
            <div className="trainer-actions">
              <button className="btn btn-ghost" onClick={() => openModal('apply')}>
                Apply
              </button>
            </div>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}

export default Trainers

