import React, { useState } from 'react'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What are opening hours?',
      answer: 'Daily from 5AM to 12PM.'
    },
    {
      question: 'Do you offer trials?',
      answer: 'Yes — a 7-day free trial for new members.'
    },
    {
      question: 'What equipment is available?',
      answer: 'We have state-of-the-art strength training equipment, cardio machines, free weights, and functional training areas.'
    },
    {
      question: 'Can I cancel my membership?',
      answer: 'Yes, you can cancel your membership at any time. Please contact our support team for assistance.'
    }
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="container faq" aria-labelledby="faq-title">
      <h2 id="faq-title" className="section-title">FAQ</h2>
      <div>
        {faqs.map((faq, index) => (
          <React.Fragment key={index}>
            <button 
              className="q" 
              aria-expanded={openIndex === index}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question} <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            <div 
              className="faq-a" 
              style={{ display: openIndex === index ? 'block' : 'none' }}
            >
              {faq.answer}
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  )
}

export default FAQ

