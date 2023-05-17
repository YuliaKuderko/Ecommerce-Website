import React, { useState } from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css';
import products from '../assets/data/products';
import ProductsList from '../components/UI/ProductsList';


function Shop() {
  const [productsData, setProductsData] = useState(products);

  function handleCategoryFilter(e) {
    const filterValue = e.target.value;
    let filteredProducts;

    switch (filterValue) {
      case 'sofa':
        filteredProducts = products.filter(item => item.category === 'sofa');
        setProductsData(filteredProducts);
        break;
      case 'mobile':
        filteredProducts = products.filter(item => item.category === 'mobile');
        setProductsData(filteredProducts);
        break;
      case 'chair':
        filteredProducts = products.filter(item => item.category === 'chair');
        setProductsData(filteredProducts);
        break;
      case 'watch':
        filteredProducts = products.filter(item => item.category === 'watch');
        setProductsData(filteredProducts);
        break;
      case 'wireless':
        filteredProducts = products.filter(item => item.category === 'wireless');
        setProductsData(filteredProducts);
        break;
      default:
        setProductsData(products);
        break;
    }

    /* if (filterValue === 'sofa') {
      const filteredProducts = products.filter(item => item.category === 'sofa');
      setProductsData(filteredProducts);
    } */
  }

  function handleSortFilter(e) {
    const filterValue = e.target.value;
    if (filterValue === 'ascending') {
      const filteredProducts = products.sort((a, b) => { a.price - b.price });
      setProductsData(filteredProducts);
    }

    if (filterValue === 'descending') {
      const filteredProducts = products.sort((a, b) => { b.price - a.price });
      setProductsData(filteredProducts);
    }
  }

  function handleSearch(e) {
    const searchTerm = e.target.value;

    const searchedProducts = products.filter(item => item.productName.toLowerCase().includes(searchTerm.toLowerCase()));

    setProductsData(searchedProducts);
  }

  return (
    <Helmet title={"shop"}>
      <CommonSection title={"Products"} />
      <section>
        <Container>
          <Row>
            <Col lg='3' md='6'>
              <div className="filter-widget">
                <select onChange={handleCategoryFilter}>
                  <option>Filter By Category</option>
                  <option value="view all">View all</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='6' className='text-end'>
              <div className="filter-widget">
                <select onChange={handleSortFilter}>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='12'>
              <div className="search-box">
                <input type="text" placeholder='Search....' onChange={handleSearch} />
                <span><i class="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='pt-0'>
        <Container>
          <Row>
            {
              productsData.length === 0 ? <h1 className='text-center fs-4'>No products are found!</h1> : <ProductsList data={productsData} />
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Shop