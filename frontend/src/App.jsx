import React from 'react'
import { ModalProvider } from './context/ModalContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Pricing from './components/Pricing'
import Trainers from './components/Trainers'
import Schedule from './components/Schedule'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Modal from './components/Modal'

function App() {
  return (
    <ModalProvider>
      <div className="page">
        <Header />
        <main>
          <Hero />
          <Features />
          <Pricing />
          <Trainers />
          <Schedule />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <Modal />
      </div>
    </ModalProvider>
  )
}

export default App

