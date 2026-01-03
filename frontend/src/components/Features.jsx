import React from 'react'

function Features() {
  const features = [
    {
      id: 'f1',
      title: 'Adaptive Programs',
      description: 'Training plans that evolve with your progress — strength, endurance, mobility or fat loss.'
    },
    {
      id: 'f2',
      title: 'Live Scheduling',
      description: 'Reserve classes, sync with calendar and get reminders — never miss a session.'
    },
    {
      id: 'f3',
      title: 'Nutrition & Recovery',
      description: 'Smart meal plans, macro tracking and recovery advice to accelerate gains.'
    }
  ]

  return (
    <section id="features" className="container features" aria-labelledby="features-title">
      <h2 id="features-title" className="section-title">Key Features</h2>
      <div className="features-grid">
        {features.map(feature => (
          <article key={feature.id} className="card" aria-labelledby={feature.id}>
            <h3 id={feature.id}>{feature.title}</h3>
            <p className="muted">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features

