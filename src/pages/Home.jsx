import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png';
import '../styles/home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Home() {
  const year = new Date().getFullYear();

  return (
    <Helmet title={"Home"}>
      <section className='hero-section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero-content">
                <p className="hero-subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam accusantium consequuntur eos perferendis error? Adipisci omnis ab accusantium suscipit, libero deserunt, quasi earum incidunt facere blanditiis repudiandae placeat quibusdam nihil.</p>
                <motion.button whileTap={{scale:1.1}} className="shop-btn"><Link to='/shop'>SHOP NOW</Link></motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero-img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home