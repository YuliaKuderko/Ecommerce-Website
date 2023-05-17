import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import useGetData from '../custom-hooks/useGetData';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function Users() {

    const { data: usersData, loading } = useGetData('users')
    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id));
        toast.success('User deleted!')
    }
    return (
        <section>
            <Row>
                <Col lg='12'><h4 className='fw-bold'>Users</h4></Col>
                <Col lg='12' className='pt-5'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <td>Image</td>
                                <td>Username</td>
                                <td>Email</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <Col lg='12 m-5' className='text-center'><div class="spinner-border" role="status"></div></Col>
                                    : usersData?.map(user => (
                                        <tr key={user.uid}>
                                            <td><img src={user.photoURL} alt='' /></td>
                                            <td>{user.displayName}</td>
                                            <td>{user.email}</td>
                                            <td><button className='btn btn-danger' onClick={() => deleteUser(user.uid)}>Delete</button></td>
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </section>
    )
}

export default Users