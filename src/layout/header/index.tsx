import {Col, Container} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import Style from './style'
import React from 'react'

function Header() {
  return (
    <Style>
      <header className='col-12 mainHeader py-4'>
        <Container>
          <div className='d-flex align-items-center'>
            <Col
              xs='12'
              className='d-flex align-items-center justify-content-center'
            >
              <div className='logo mx-4'>
                <NavLink to='/'>
                  <img
                    src='/logo.png'
                    alt='logo'
                  />
                </NavLink>
              </div>
              <nav className='navbar-default'>
                <ul className='d-flex justify-content-center list-unstyled'>
                  <li className='mx-1 text-uppercase'>
                    <NavLink
                      className={({isActive}) =>
                        `${
                          isActive
                            ? 'text-decoration-line fw-bold'
                            : 'fw-medium text-decoration-none'
                        } `
                      }
                      to='/'
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className='mx-1 text-uppercase'>
                    <NavLink
                      className={({isActive}) =>
                        `${
                          isActive
                            ? 'text-decoration-line fw-bold'
                            : 'fw-medium text-decoration-none'
                        } `
                      }
                      to='/show-shapes'
                    >
                      Show Shapes
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </Col>
          </div>
        </Container>
      </header>
    </Style>
  )
}
export default Header
