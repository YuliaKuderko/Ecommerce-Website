import React from 'react';
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/eco-logo.png';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='4' md='6' className='mb-4'>
            <div className="logo">
                <h1 className='text-white'>MyStore</h1>
            </div>
            <p className="footer-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus neque similique voluptatum accusantium deleniti soluta. Illo inventore nam molestiae pariatur asperiores sit exercitationem? Fuga soluta amet iste voluptatum sit odit?</p>
          </Col>
          <Col lg='3' md='3' className='mb-4'>
            <div className="footer-quick-links">
              <h4 className="quick-links-titles">Top Categories</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Mobile Phones</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Modern sofas</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Armchairs</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Smart Watches</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='2' md='3' className='mb-4'>
            <div className="footer-quick-links">
              <h4 className="quick-links-titles">Useful Links</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Privacy Policy</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3'>
            <div className="footer-quick-links">
              <h4 className="quick-links-titles">Contact</h4>
              <ListGroup>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span className='fs-5'><i class="ri-phone-line"></i></span>
                  <p>+972-544353091</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span className='fs-5'><i class="ri-mail-line"></i></span>
                  <p>yulia2232@gmail.com</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span className='fs-5'><i class="ri-linkedin-box-fill"></i></span>
                  <p><a href='https://www.linkedin.com/in/yuliakuderko/'>LinkedIn</a></p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-2'>
                  <span className='fs-5'><i class="ri-github-fill"></i></span>
                  <p><a href='https://github.com/YuliaKuderko/Ecommerce-Website'>GitHub</a></p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className="footer-copyright">&copy; Copyright {year} developed by Yulia Kuderko. All rights reserved. </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer