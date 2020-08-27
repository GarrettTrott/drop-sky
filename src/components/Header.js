import React from 'react'
import { Navbar } from 'react-bootstrap'
import DateTime from './DateTime'

export const Header = ({ dropzone }) => {
  return (
    <div>
      <div>
        <Navbar className="justify-content-between" bg="dark" variant="dark">
          <Navbar.Brand href="#home">DropSky</Navbar.Brand>
          <h1 className="dropzoneTitle">{dropzone}</h1>
          <DateTime />
        </Navbar>
      </div>
    </div>
  )
}

export default Header
