import React from 'react'
import { useModal } from '../context/ModalContext'

function Pricing() {
  const { openModal } = useModal()

  const plans = [
    {
      name: 'Starter',
      subtitle: 'Beginner-friendly',
      price: '₹999',
      period: '/mo',
      description: 'Gym floor, group classes, basic tracking.'
    },
    {
      name: 'Pro',
      subtitle: 'Recommended',
      price: '₹1999',
      period: '/mo',
      description: 'All Starter + 4 PT sessions / month.',
      featured: true
    },
    {
      name: 'Annual',
      subtitle: 'Best value',
      price: '₹14,999',
      period: '/yr',
      description: 'Unlimited classes, priority booking.'
    }
  ]

  const handlePurchase = (planName) => {
    openModal('purchase', { plan: planName })
  }

  return (
    <section id="pricing" className="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <h2 id="pricing-title" className="section-title">Pricing & Plans</h2>
        <div className="pricing-row">
          {plans.map(plan => (
            <div key={plan.name} className={`price-card ${plan.featured ? 'featured' : ''}`}>
              <div className="price-head">
                <div>
                  <strong>{plan.name}</strong>
                  <div className="muted small">{plan.subtitle}</div>
                </div>
                <div className="price">
                  {plan.price}
                  <span className="small muted">{plan.period}</span>
                </div>
              </div>
              <p className="muted">{plan.description}</p>
              <div className="cta-row">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePurchase(plan.name)}
                >
                  Choose plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing

