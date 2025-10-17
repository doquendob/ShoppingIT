import React from 'react';
import styles from "./Navbar.module.scss";
import CartIcon from '../../ui/CartIcon/CartIcon';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>ShoppingIT</div>
            <ul className={styles.menu}>
                <li className={styles.menuItem}><NavLink to="/">Home</NavLink></li>
                <li className={styles.menuItem}><NavLink to="/men">Men</NavLink></li>
                <li className={styles.menuItem}><NavLink to="/women">Women</NavLink></li>
                <li className={styles.menuItem}><NavLink to="/about">About</NavLink></li>
            </ul>
            <CartIcon />
        </nav>
    );
}

export default Navbar;
