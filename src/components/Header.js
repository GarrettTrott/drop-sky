import React from 'react'
import { Navbar } from 'react-bootstrap'
import DateTime from './DateTime'

export const Header = (props) => {
  const dropzone = props.dropzone

  return (
    <div>
      <div>
        <Navbar className="justify-content-between" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo.svg"
              width="30"
              height="20"
              className="d-inline-block align-top"
            />{' '}
            DropSky
          </Navbar.Brand>
          <h1 className="dropzoneTitle">{dropzone}</h1>
          <DateTime />
        </Navbar>
      </div>
    </div>
  )
}

export default Header
