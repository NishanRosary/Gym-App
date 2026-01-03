import React, { createContext, useContext, useState } from 'react'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(null)
  const [modalData, setModalData] = useState(null)

  const openModal = (type, data = null) => {
    setModalType(type)
    setModalData(data)
  }

  const closeModal = () => {
    setModalType(null)
    setModalData(null)
  }

  return (
    <ModalContext.Provider value={{ modalType, modalData, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}

