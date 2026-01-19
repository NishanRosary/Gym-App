import React, { useState, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import axios from 'axios'

function Schedule() {
  const { openModal } = useModal()
  const [nextClass, setNextClass] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNextClass()
  }, [])

  const fetchNextClass = async () => {
    try {
      const response = await axios.get('/api/bookings/next')
      if (response.data) {
        setNextClass(response.data)
      }
    } catch (error) {
      console.error('Error fetching next class:', error)
    } finally {
      setLoading(false)
    }
  }

  const schedule = [
    { day: 'Mon', morning: 'Yoga', evening: 'Strength' },
    { day: 'Tue', morning: 'HIIT', evening: 'Cardio' },
    { day: 'Wed', morning: 'Spin', evening: 'Mobility' },
    { day: 'Thu', morning: 'Strength', evening: 'Boxing' },
    { day: 'Fri', morning: 'Yoga', evening: 'Functional' }
  ]

  return (
    <section id="schedule" className="schedule" aria-labelledby="schedule-title">
      <div className="container">
        <h2 id="schedule-title" className="section-title">Classes & Booking</h2>
        <div className="schedule-wrap">
          <div className="calendar card">
            <h3>Weekly Schedule</h3>
            <table className="schedule-table" role="table" aria-label="weekly schedule">
              <thead>
                <tr>
                  <th scope="col">Day</th>
                  <th scope="col">7AM</th>
                  <th scope="col">6PM</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.day}</td>
                    <td>{item.morning}</td>
                    <td>{item.evening}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cta-row">
              <button className="btn btn-primary" onClick={() => openModal('book')}>
                Book Class
              </button>
            </div>
          </div>

          <aside className="next-class card" aria-labelledby="next-class-title">
            <h3 id="next-class-title">Next Class</h3>
            {loading ? (
              <div className="muted">Loading...</div>
            ) : nextClass ? (
              <div>
                <div><strong>{nextClass.classType}</strong></div>
                <div className="muted small">{new Date(nextClass.date).toLocaleDateString()}</div>
              </div>
            ) : (
              <div id="notif" className="muted">
                No upcoming bookings. Book now to reserve your spot.
              </div>
            )}
            <div className="cta-row">
              <button className="btn btn-ghost" onClick={() => openModal('book')}>
                Book
              </button>
            </div>

            <h4 style={{ marginTop: '18px' }}>Notifications</h4>
            <div className="muted small">Booking reminders 1 hour before class.</div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Schedule

