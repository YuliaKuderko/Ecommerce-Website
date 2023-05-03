import React, { useRef, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './header.css';
import { Container } from 'reactstrap';
import logo from '../../assets/images/eco-logo.png';
import userIcon from '../../assets/images/user-icon.png';
import { motion } from 'framer-motion';

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

    function scrollToTop() {
        window.scrollTo({
            top: 0
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

    useEffect(() => {
        stickyHeader();

        return () => {
            window.removeEventListener('scroll', stickyHeader)
        }
    },)


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
                    <div className="navigation">
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
                        <span className='cart-icon'>
                            <i class="ri-shopping-bag-line"></i>
                            <span className='badge'>1</span>
                        </span>
                        <span><motion.img whileTap={{ scale: 1.1 }} src={userIcon} alt="user" /></span>
                    </div>
                    <div className='mobile-menu'>
                        <span className='mobile-icon'><i class="ri-menu-line"></i></span>
                    </div>
                </div>
            </Container>
        </header>
    )
}

export default Header