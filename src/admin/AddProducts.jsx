import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { db, storage } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function AddProducts() {

  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const productTitleInput = document.getElementById('productTitleInput');
    const shortDescInput = document.getElementById('shortDescInput');
    const descInput = document.getElementById('descInput');
    const priceInput = document.getElementById('priceInput');

    const product = {
      title: enterTitle,
      description: enterDescription,
      category: enterCategory,
      price: enterPrice,
      imgUrl: enterProductImg
    }

    //adding product to the firebase database
    try {
      const docRef = collection(db, 'products');
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
      const uploadTask = uploadBytesResumable(storageRef, enterProductImg);

      uploadTask.on(() => {
        toast.error('images not uploaded!');
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            title: enterTitle,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL
          })
        })
      })
      setLoading(false);
      toast.success('Product successfully added!');
      navigate('/dashboard/all-products');
    } catch (error) {
      setLoading(false);
      toast.error('product not added!');
    }

    console.log(product)
    document.getElementById("addProductForm").reset();
    productTitleInput.value = '';
    shortDescInput.value = '';
    descInput.value = '';
    priceInput.value = '';
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            {
              loading ? <Col lg='12' className='text-center'><div class="spinner-border" role="status"></div></Col>
                : <>
                  <h4 className='mb-5'>Add product</h4>
                  <Form onSubmit={addProduct} id='addProductForm'>
                    <FormGroup className='form-group'>
                      <label for='productTitleInput'>Product title</label>
                      <input id='productTitleInput' type="text" placeholder='Double sofa' value={enterTitle} onChange={e => setEnterTitle(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <label for='shortDescInput'>Short Description</label>
                      <input id='shortDescInput' type="text" placeholder='lorem....' value={enterShortDesc} onChange={e => setEnterShortDesc(e.target.value)} required />
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <label for='descInput'>Description</label>
                      <input id='descInput' type="text" placeholder='Description...' value={enterDescription} onChange={e => setEnterDescription(e.target.value)} required />
                    </FormGroup>
                    <div className='d-flex align-items-center justify-content-between gap-5'>
                      <FormGroup className='form-group w-50'>
                        <label for='priceInput'>Price</label>
                        <input id='priceInput' type="text" placeholder='$100' value={enterPrice} onChange={e => setEnterPrice(e.target.value)} required />
                      </FormGroup>
                      <FormGroup className='form-group d-flex flex-column w-50'>
                        <label for='categoryInput'>Category</label>
                        <select id='categoryInput' className='p-2' value={enterCategory} onChange={e => setEnterCategory(e.target.value)} required>
                          <option value="chair">Chair</option>
                          <option value="sofa">Sofa</option>
                          <option value="mobile">Mobile</option>
                          <option value="watch">Watch</option>
                          <option value="wireless">Wireless</option>
                        </select>
                      </FormGroup>
                    </div>
                    <div>
                      <FormGroup className='form-group'>
                        <label for='productImgInput'>Product Image</label>
                        <input id='productImgInput' type="file" onChange={e => setEnterProductImg(e.target.files[0])} required />
                      </FormGroup>
                    </div>
                    <button type='submit' className='shop-btn'>Add Product</button>
                  </Form>
                </>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AddProducts