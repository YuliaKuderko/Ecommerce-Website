import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


function AllProducts() {

  const { data: productData, loading } = useGetData('products');

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Deleted!')
  }


  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  loading ? <Col lg='12' ><div class="spinner-border m-5" role="status"></div></Col>
                    : productData.map((item, i) => (
                      <tr key={i}>
                        <td><img src={item.imgUrl} alt="" /></td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>${item.price}</td>
                        <td><button onClick={() => { deleteProduct(item.id) }} className='btn btn-danger'>Delete</button></td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllProducts