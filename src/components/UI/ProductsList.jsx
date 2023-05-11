import React from 'react';
import ProductCard from './ProductCard';
import { Row } from 'reactstrap';

function ProductsList({ data }) {
    return (
        <Row>
            {
                data?.map((item, i) => (
                    <ProductCard item={item} key={i}/>
                ))
            }
        </Row>
    )
}

export default ProductsList