import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import '../styles/checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { cartActions } from '../redux/slices/cartSlice';


function Checkout() {
  let [id, setId] = useState(1);

  const totalQty = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameInput = document.getElementById('nameInput');
  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const streetInput = document.getElementById('streetInput');
  const cityInput = document.getElementById('cityInput');
  const zipInput = document.getElementById('zipInput');
  const countryInput = document.getElementById('countryInput');

  function handleOrder() {
    if (nameInput.value && emailInput.value && phoneInput.value && streetInput.value && cityInput.value && zipInput.value && countryInput.value) {
      navigate(`/order/${id}`);
      dispatch(cartActions.clearCart());
      setId(id + 1);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    }
  }

  return (
    <Helmet title={"Checkout"}>
      <CommonSection title={"Checkout"} />
      <section>
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className='billing-form' action='submit' id="myform">
                <FormGroup className="form-group">
                  <input type="text" id='nameInput' placeholder='Enter your name' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="email" id='emailInput' placeholder='Enter your email' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="number" id='phoneInput' placeholder='Phone number' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" id='streetInput' placeholder='Street address' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" id='cityInput' placeholder='City' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="number" id='zipInput' placeholder='Postal code' required />
                </FormGroup>

                <FormGroup className="form-group">
                  <input type="text" id='countryInput' placeholder='Country' required />
                </FormGroup>
              </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout-cart">
                <h6>Total Qty: <span>{totalQty > 1 ? `${totalQty} items` : `${totalQty} item`}</span></h6>
                <h6>Subtotal: <span>${totalAmount}</span></h6>
                <h6>Shipping: <br />free shipping <span>$0</span></h6>
                <h4>Total cost: <span>${totalAmount}</span></h4>
                <button type='submit' form='myform' className="shop-btn store-btn w-100" onClick={handleOrder}>Place an order</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Checkout