import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import heroImg from '../assets/images/hero-img.png';
import '../styles/home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Services from '../components/Services/Services';
import ProductsList from '../components/UI/ProductsList';
import products from '../assets/data/products';
import counterImg from '../assets/images/counter-timer-img.png';
import Clock from '../components/UI/Clock';

function Home() {
  const [trendingProducts, setTrendingProducts] = useState(products);
  const [bestSalesProducts, setBestSalesProducts] = useState(products);

  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredTrendingProducts = products.filter(item => item.category === 'chair');
    const filteredBestSalesProducts = products.filter(item => item.category === 'sofa');

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
  }, []);


  return (
    <Helmet title={"Home"}>
      <section className='hero-section'>
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero-content">
                <p className="hero-subtitle">Trending products in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam accusantium consequuntur eos perferendis error? Adipisci omnis ab accusantium suscipit, libero deserunt, quasi earum incidunt facere blanditiis repudiandae placeat quibusdam nihil.</p>
                <motion.button whileTap={{ scale: 1.1 }} className="shop-btn"><Link to='/shop'>SHOP NOW</Link></motion.button>
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
      <Services />
      <section className='trending-products'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section-title'>Trending Products</h2>
              <ProductsList data={trendingProducts} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className='best-sales'>
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section-title'>Best Sales</h2>
              <ProductsList data={bestSalesProducts} />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="timer-count">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="clock-top-content">
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-5 mb-3'>Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button whileTap={{ scale: 1.05 }} className='shop-btn store-btn'><Link to='/shop'>Visit Store</Link></motion.button>
            </Col>
            <Col lg='6' md='6' className='text-end'>
              <img src={counterImg} alt="" />
            </Col>
          </Row>
        </Container>
      </section>
      <section className="new-arrivals">
        
      </section>
    </Helmet>
  )
}

export default Home