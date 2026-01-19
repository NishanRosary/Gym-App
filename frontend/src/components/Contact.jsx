import React, { useState } from 'react'
import axios from 'axios'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      await axios.post('/api/contact', formData)
      setSubmitted(true)
      setFormData({ name: '', phone: '', email: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact-wrap" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className="section-title">Contact Us</h2>
        <div className="contact-grid">
          <form id="contactForm" className="contact-card card" onSubmit={handleSubmit}>
            {submitted && (
              <div style={{ color: 'var(--accent-2)', marginBottom: '12px' }}>
                Thanks! We received your message and will respond shortly.
              </div>
            )}
            <div className="input-row">
              <input
                required
                name="name"
                placeholder="Name"
                aria-label="Your name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                required
                name="phone"
                placeholder="Phone"
                aria-label="Your phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <input
              required
              type="email"
              name="email"
              placeholder="Email"
              aria-label="Your email"
              value={formData.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Message"
              aria-label="Your message"
              value={formData.message}
              onChange={handleChange}
            />
            <div style={{ textAlign: 'right' }}>
              <button
                className="btn btn-primary"
                type="submit"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>

          <aside className="contact-info card">
            <h4>Address</h4>
            <div className="muted">Pillana Garden, Richards Town, Bangalore</div>
            <h4 style={{ marginTop: '12px' }}>Phone</h4>
            <div className="muted">+91 80 1234 5678</div>
            <h4 style={{ marginTop: '12px' }}>Email</h4>
            <div className="muted">hello@beastfitness.example</div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Contact

