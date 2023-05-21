import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartActions } from '../redux/slices/cartSlice';


function Checkout() {
  let [id, setId] = useState(1);

  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const dispatch = useDispatch();

  function handleOrder() {
    setId(id + 1);
    dispatch(cartActions.clearCart());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }

  return (
    <Helmet title={"Checkout"}>
      <CommonSection title={"Checkout"} />
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className='billing-form'>
                <FormGroup className="form-group">
                  <input type="text" placeholder='Enter your name' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="email" placeholder='Enter your email' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="number" placeholder='Phone number' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" placeholder='Street address' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" placeholder='City' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="number" placeholder='Postal code' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" placeholder='Country' required />
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout-cart">
                <h6>Total Qty: <span>{totalQty > 1 ? `${totalQty} items` : `${totalQty} item`}</span></h6>
                <h6>Subtotal: <span>${totalAmount}</span></h6>
                <h6>Shipping: <br />free shipping <span>$0</span></h6>
                <h4>Total cost: <span>${totalAmount}</span></h4>
                <Link to={`/order/${id}`}><button type='submit' className="shop-btn store-btn w-100" onClick={handleOrder}>Place an order</button></Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout