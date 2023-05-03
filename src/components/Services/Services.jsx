import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { motion } from 'framer-motion';
import './services.css';
import serviceData from '../../assets/data/serviceData';

function Services() {
    return (
        <section className="services">
            <Container>
                <Row>
                    {serviceData.map((item, i) => (
                        <Col lg='3' md='4' key={i}>
                            <motion.div whileHover={{scale: 1.05}} className="service-item" style={{background: item.bg}}>
                                <span><i class={item.icon}></i></span>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.subtitle}</p>
                                </div>
                            </motion.div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    )
}

export default Services