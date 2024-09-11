import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background: #f9f9f9; /* Light gray background */
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`

const Header = styled.div`
  background: #4a90e2; /* Blue background */
  color: white;
  padding: 10px;
  border-radius: 6px 6px 0 0;
  font-size: 18px;
  font-weight: bold;
`

const Content = styled.div`
  padding: 20px;
  color: #333; /* Dark gray text */
`

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: none;
  font-size: 16px;
  color: white;
  cursor: pointer;
`

interface ModalProps {
  title: string
  content: React.ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ title, content, onClose }) => {
  return ReactDOM.createPortal(
    <Overlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Header>{title}</Header>
        <Content>{content}</Content>
      </ModalContent>
    </Overlay>,
    document.body
  )
}

export default Modal
