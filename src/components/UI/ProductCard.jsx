import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

function ProductsCard({ item }) {

  const dispatch = useDispatch();

  function addToCart() {
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.productName,
      price: item.price,
      image: item.imgUrl
    }))

    toast.success('Product added successfully')
  }

  return (
    <Col lg='3' md='4' className='mb-2'>
      <div className="product-item">
      <Link to={`/shop/${item.id}`}>
        <div className="product-img">
          <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
        </div>
        <div className='p-2 product-info text-start'>
          <h3 className='product-name'>{item.productName}</h3>
          <span>{item.category}</span>
        </div>
      </Link>
        
        <div className="product-card-bottom d-flex align-items-center justify-content-between p-2">
          <span className='price'>${item.price}</span>
          <span onClick={addToCart}><i class="ri-add-line"></i></span>
        </div>
      </div>
    </Col>
  )
}

export default ProductsCard