import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase.config';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';
import { setDoc, doc } from 'firebase/firestore';


function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const useCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = useCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on((error) => {
        toast.error(error.message)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          //update user profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL
          });

          //store user data in firestore database
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoURL: downloadURL
          });

        })
      })

      setLoading(false);
      toast.success('Account created');
      navigate('/');

    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  }

  return (
    <Helmet title={"Signup"}>
      <section>
        <Container>
          <Row>
            {
              loading ? <Col lg='12' className='text-center'><div class="spinner-border" role="status"></div></Col>
                : <Col lg='6' className='m-auto text-center'>
                  <h3 className='fw-bold mb-4'>Signup</h3>
                  <Form className='auth-form' onSubmit={signup}>
                    <FormGroup className='form-group'>
                      <input type="text" placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <input type="email" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    </FormGroup>
                    <FormGroup className='form-group'>
                      <input type="file" onChange={e => setFile(e.target.files[0])} />
                    </FormGroup>
                    <button type='submit' className="shop-btn auth-btn">Create an Account</button>
                    <p>Already have an account? <Link to='/login'>Login</Link> </p>
                  </Form>
                </Col>
            }
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Signup