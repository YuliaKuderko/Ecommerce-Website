import React from 'react';
import '../styles/cart.css';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Col, Row } from 'reactstrap';
import { motion } from 'framer-motion';
import { cartActions } from '../redux/slices/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function Cart() {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount);
  return (
    <Helmet title={"cart"}>
      <CommonSection title={"Shopping Cart"} />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? <h2 className='fs-4 mb-5 text-center'>No items added to the cart!</h2>
                  : <table className='table bordered'>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        cartItems.map((item, i) => (
                          <Tr item={item} key={i} />
                        ))
                      }
                    </tbody>
                  </table>
              }
            </Col>
            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal <span className='fs-4 fw-bold '>${totalAmount}</span></h6>
              </div>
              <p className='fs-6 mt-2'>taxes and shipping will be calculated in checkout</p>
              <div>
                <Link to={cartItems.length === 0 ? '/cart' : '/checkout'}><button className="shop-btn w-100" onClick={()=>cartItems.length === 0 ? toast.warning('Please add items to cart') : ''}>Checkout</button></Link>
                <Link to='/shop'><button className="shop-btn w-100 mt-3">Continue Shopping</button></Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

const Tr = ({ item }) => {

  const dispatch = useDispatch();

  function deleteProduct() {
    dispatch(cartActions.deleteItem(item.id));
  }

  return <tr>
    <td><img src={item.imgUrl} alt="" /></td>
    <td>{item.productName}</td>
    <td>${item.price}</td>
    <td>{item.quantity}px</td>
    <td><motion.i class="ri-delete-bin-line" whileTap={{ scale: 1.1 }} onClick={deleteProduct}></motion.i></td>
  </tr>
}

export default Cart