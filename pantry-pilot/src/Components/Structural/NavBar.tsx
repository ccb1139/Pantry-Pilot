import React from 'react'
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

// css import
import '../../css/NavBar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Logo Import
import Logo from '../../img/logo/logo.png'

// Bootstrap Imports
import Image from 'react-bootstrap/Image';

function NavBar() {
  return (
    <Navbar expand="lg" variant="light" className='app-font app-navbar'>
      <Navbar.Brand href="/" className='d-inline-flex align-items-center'>
        <div className='d-inline-flex align-items-center'>
          <Image className="NavBar logoimg" src={Logo} />
          
          <h3 className="logoText" >Pantry Pilot</h3>
        </div>

      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="d-flex ms-auto">
          
          <NavItem>
            <Link to="/pantry" className="nav-link">My Pantry</Link>
          </NavItem>
          <NavItem>
            <Link to="/recipes" className="nav-link ms-auto">Recipes</Link>
          </NavItem>
          <NavItem>
            <Link to="/cookbook" className="nav-link ms-auto">My Cookbook</Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar