import React, { useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import './header.css';
import { Container } from 'reactstrap';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { cartActions } from '../../redux/slices/cartSlice';

const nav_links = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'shop',
        display: 'Shop'
    },
    {
        path: 'cart',
        display: 'Cart'
    }
]

function Header() {

    const headerRef = useRef(null);
    const totalQuantity = useSelector(state => state.cart.totalQuantity);

    const profileActionRef = useRef(null);
    const menuRef = useRef(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { currentUser } = useAuth();

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant',
          });
    };

    function stickyHeader() {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky-header');
            } else {
                headerRef.current.classList.remove('sticky-header');
            }
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            toast.success('Logged out');
            dispatch(cartActions.clearCart());
            navigate('/');
        }).catch(err => {
            toast.error(err.message);
        })
    }

    useEffect(() => {
        stickyHeader();

        return () => {
            window.removeEventListener('scroll', stickyHeader);
        }
    },);

    const menuToggle = () => { menuRef.current.classList.toggle('active-menu') }
    const profileActionsToggle = () => { profileActionRef.current.classList.toggle('show-profileActions') }

    return (
        <header className='header' ref={headerRef}>
            <Container>
                <div className="nav-wrapper">
                    <div className="logo">
                        <img src={logo} alt="logo" />
                        <div>
                            <h1><Link to='' onClick={scrollToTop}>MyStore</Link></h1>
                        </div>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <ul className="menu">
                            {nav_links.map((item, i) => (
                                <li className="nav-item" key={i}>
                                    <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav-active' : ''}>{item.display}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='nav-icons'>
                        <span className='fav-icon'>
                            <i class="ri-heart-line"></i>
                            <span className='badge'>2</span>
                        </span>
                        <span className='cart-icon' onClick={() => navigate('/cart')}>
                            <i class="ri-shopping-bag-line"></i>
                            <span className='badge'>{totalQuantity}</span>
                        </span>
                        <span className='profile-pic' onClick={profileActionsToggle}>
                            <img src={currentUser ? currentUser.photoURL : userIcon} alt="" />
                            <span><i class="ri-arrow-drop-down-fill"></i></span>
                        </span>
                        <div className='profile'>
                            <div className="profile-actions" ref={profileActionRef} onClick={profileActionsToggle}>
                                {
                                    currentUser ? <span onClick={logout}>Logout</span> :
                                        <div className='d-flex align-items-start justify-content-center flex-column'>
                                            <Link to='/signup'>Signup</Link>
                                            <Link to='/login'>Login</Link>
                                            <Link to='/dashboard'>Dashboard</Link>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className='mobile-menu'>
                            <span className='mobile-icon' onClick={menuToggle}><i class="ri-menu-line"></i></span>
                        </div>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header