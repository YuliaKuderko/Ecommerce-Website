import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import '../styles/product-details.css';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent'
};

function ProductDetails() {
  const [tab, setTab] = useState('desc');
  const [reviewValue, setReviewValue] = useState(0);
  const [reviewHover, setReviewHover] = useState(-1);
  const reviewUser = useRef('');
  const reviewMsg = useRef('');
  const dispatch = useDispatch();

  const { id } = useParams();
  const product = products.find(item => item.id === id);
  const { imgUrl, productName, price, avgRating, reviews, description, shortDesc, category } = product;
  const relatedProducts = products.filter(item => item.category === category);
  
  function submitHandler(e){
    e.preventDefault();

    const reviewUserName = reviewUser.current.valueOf;
    const reviewUserMsg = reviewMsg.current.valueOf;
  }

  function addToCart() {
    dispatch(cartActions.addItem({
      id,
      productName,
      price,
      image: imgUrl
    }))

    toast.success('Product added successfully')
  }

  return (
    <Helmet title={productName}>
      <CommonSection title={productName} />
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt="" />
            </Col>
            <Col lg='6'>
              <div className="product-details">
                <h2>{productName}</h2>
                <div className="product-rating">
                  <Box
                    sx={{
                      width: 450,
                      display: 'flex',
                      alignItems: 'center',
                      textAlign: 'center',
                      mt: 2,
                      mb: 2
                    }}>
                    <Rating
                      value={avgRating}
                      max={5}
                      readOnly
                      precision={0.5}
                      size='medium'
                      emptyIcon={<StarIcon style={{ color: "grey", opacity: 0.4 }} fontSize="inherit" />}
                      sx={{ color: "coral" }}
                    />
                    <Box sx={{ ml: 1, mt: 0.4, fontSize: 15, color: 'grey', textAlign: 'center', fontWeight: 500 }}>{avgRating} ratings</Box>
                  </Box>
                </div>
                <div className='d-flex align-items-center gap-5'>
                <span className='product-price'>${price}</span>
                <span>Category: {category.toUpperCase()}</span>
                </div>
                <p className='mt-3'>{shortDesc}</p>
                <motion.button whileTap={{ scale: 1.1 }} className="shop-btn" onClick={addToCart}>Add to Cart</motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="tab-wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active-tab' : ''}`} onClick={() => setTab('desc')}>Description</h6>
                <h6 className={`${tab === 'rev' ? 'active-tab' : ''}`} onClick={() => setTab('rev')}>Reviews ({reviews.length})</h6>
              </div>
              {
                (tab === 'desc')
                  ? <div className="tab-content mt-4">
                    <p>{description}</p>
                  </div>
                  : <div className="product-review mt-4">
                    <div className="review-wrapper">
                      <ul>
                        {
                          reviews?.map((item, i) => (
                            <li key={i} className='mb-5'>
                              <h6>John Doe</h6>
                              <span>{item.rating}</span>
                              <p>{item.text}</p>
                            </li>
                          ))
                        }
                      </ul>
                      <div className="review-form">
                        <h4>Leave your experience</h4>
                        <form action="submit" onSubmit={submitHandler}>
                          <div className="form-group">
                            <input type="text" placeholder='Enter name' ref={reviewUser} />
                          </div>
                          <div className="star-form-group">
                            <Rating
                              name="hover-feedback"
                              value={reviewValue}
                              sx={{ color: "coral" }}
                              onChange={(event, newValue) => {
                                setReviewValue(newValue);
                              }}
                              onChangeActive={(event, newHover) => {
                                setReviewHover(newHover);
                              }}
                            />
                            {reviewValue !== null && <Box ml={2}>{labels[reviewHover !== -1 ? reviewHover : reviewValue]}</Box>}
                          </div>
                          <div className="form-group">
                            <textarea rows={4} type="text" placeholder='Review Message..' ref={reviewMsg}/>
                          </div>
                          <button type='submit' className='shop-btn'>Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
              }
            </Col>
            <Col lg='12'>
              <h2 className="related-title">You may also like</h2>
              <ProductsList data={relatedProducts} />
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default ProductDetails