import React from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';

function Shop() {
  return (
    <Helmet title={"shop"}>
      <CommonSection title={"Products"} />
    </Helmet>
  )
}

export default Shop