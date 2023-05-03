import React from 'react';
import ProductCard from './ProductCard';
import { Row } from 'reactstrap';

function ProductsList({ data }) {
    return (
        <Row>
            {
                data?.map(item => (
                    <ProductCard item={item} />
                ))
            }
        </Row>
    )
}

export default ProductsList