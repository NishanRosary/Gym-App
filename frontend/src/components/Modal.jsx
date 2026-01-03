import React, { useState, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import axios from 'axios'

function Modal() {
  const { modalType, modalData, closeModal } = useModal()
  const [formData, setFormData] = useState({})

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [closeModal])

  if (!modalType) return null

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleBookSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/bookings', formData)
      alert(`Booking confirmed for ${formData.classType} on ${formData.date}`)
      closeModal()
      setFormData({})
      window.location.reload()
    } catch (error) {
      console.error('Error booking class:', error)
      alert('Failed to book class. Please try again.')
    }
  }

  const handleApplySubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/trainers/apply', formData)
      alert('Application sent — we will contact you.')
      closeModal()
      setFormData({})
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/contact', {
        ...formData,
        trainer: modalData?.trainer
      })
      alert(`Message sent to ${modalData?.trainer || 'us'}`)
      closeModal()
      setFormData({})
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    }
  }

  const handlePurchase = async () => {
    try {
      await axios.post('/api/purchases', { plan: modalData?.plan })
      alert(`Selected plan: ${modalData?.plan} — redirecting to secure checkout (placeholder).`)
      closeModal()
    } catch (error) {
      console.error('Error processing purchase:', error)
      alert('Failed to process purchase. Please try again.')
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/signup', formData)
      alert('Account created successfully!')
      closeModal()
      setFormData({})
    } catch (error) {
      console.error('Error signing up:', error)
      alert('Failed to create account. Please try again.')
    }
  }

  const renderContent = () => {
    switch (modalType) {
      case 'book':
        return (
          <>
            <h3 id="dialogTitle">Book a Class</h3>
            <form id="bookForm" onSubmit={handleBookSubmit}>
              <label>
                Name
                <input required name="name" onChange={handleChange} />
              </label>
              <label>
                Class
                <select name="classType" onChange={handleChange} required>
                  <option value="">Select a class</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Strength">Strength</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Boxing">Boxing</option>
                </select>
              </label>
              <label>
                Date
                <input required type="date" name="date" onChange={handleChange} />
              </label>
              <div className="dialog-actions">
                <button className="btn btn-primary" type="submit">Confirm</button>
              </div>
            </form>
          </>
        )
      case 'apply':
        return (
          <>
            <h3 id="dialogTitle">Apply as Trainer</h3>
            <form id="applyForm" onSubmit={handleApplySubmit}>
              <label>
                Full name
                <input required name="name" placeholder="Full name" onChange={handleChange} />
              </label>
              <label>
                Email
                <input required name="email" type="email" placeholder="Email" onChange={handleChange} />
              </label>
              <label>
                Experience
                <textarea name="experience" placeholder="Tell us about your experience" onChange={handleChange} />
              </label>
              <div className="dialog-actions">
                <button className="btn btn-primary" type="submit">Send</button>
              </div>
            </form>
          </>
        )
      case 'contact':
        return (
          <>
            <h3 id="dialogTitle">Contact {modalData?.trainer || 'Us'}</h3>
            <p className="muted">Send a message to the trainer.</p>
            <form onSubmit={handleContactSubmit}>
              <label>
                Your name
                <input required name="name" placeholder="Your name" onChange={handleChange} />
              </label>
              <label>
                Your email
                <input required name="email" type="email" placeholder="Your email" onChange={handleChange} />
              </label>
              <label>
                Message
                <textarea name="message" placeholder="Your message" onChange={handleChange} />
              </label>
              <div className="dialog-actions">
                <button className="btn btn-primary" type="submit">Send</button>
              </div>
            </form>
          </>
        )
      case 'purchase':
        return (
          <>
            <h3 id="dialogTitle">Purchase {modalData?.plan} Plan</h3>
            <p className="muted">Confirm your plan selection.</p>
            <div className="dialog-actions">
              <button className="btn btn-primary" onClick={handlePurchase}>
                Confirm Purchase
              </button>
            </div>
          </>
        )
      case 'signup':
        return (
          <>
            <h3 id="dialogTitle">Create Account</h3>
            <form onSubmit={handleSignup}>
              <label>
                Full name
                <input required name="name" placeholder="Full name" onChange={handleChange} />
              </label>
              <label>
                Email
                <input required name="email" type="email" placeholder="Email" onChange={handleChange} />
              </label>
              <label>
                Phone
                <input required name="phone" placeholder="Phone" onChange={handleChange} />
              </label>
              <label>
                Password
                <input required name="password" type="password" placeholder="Password" onChange={handleChange} />
              </label>
              <div className="dialog-actions">
                <button className="btn btn-primary" type="submit">Create Account</button>
              </div>
            </form>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div 
      className={`modal ${modalType ? 'active' : ''}`} 
      role="dialog" 
      aria-modal="true" 
      aria-hidden={!modalType}
      onClick={(e) => {
        if (e.target.classList.contains('modal')) closeModal()
      }}
    >
      <div className="dialog" role="document" aria-labelledby="dialogTitle">
        {renderContent()}
        <div className="dialog-actions" style={{ marginTop: '16px' }}>
          <button className="btn btn-ghost" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Modal

