import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../styles/dashboard.css';
import useGetData from '../custom-hooks/useGetData';
import { motion } from 'framer-motion';

function Dashboard() {
  const {data: products} = useGetData('products');
  const {data: users} = useGetData('users');

  return (
    <section>
      <Container>
        <Row>
          <Col lg='3'>
            <motion.div whileHover={{scale: 1.02}} className="revenue-box">
              <h5>Total Sales</h5>
              <span>$7890</span>
            </motion.div>
          </Col>
          <Col lg='3'>
            <motion.div whileHover={{scale: 1.02}} className="orders-box">
              <h5>Orders</h5>
              <span>789</span>
            </motion.div>
          </Col>
          <Col lg='3'>
            <motion.div whileHover={{scale: 1.02}} className="products-box">
              <h5>Total Products</h5>
              <span>{products.length}</span>
            </motion.div>
          </Col>
          <Col lg='3'>
            <motion.div whileHover={{scale: 1.02}} className="users-box">
              <h5>Total Users</h5>
              <span>{users.length}</span>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Dashboard