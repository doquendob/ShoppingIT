import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import styles from "./CartIcon.module.scss";
import Badge from '../Badge/Badge';
import { useCart } from '../../../context/CartContext';

const CartIcon = () => {
    const {itemsCount} = useCart();

    const toggleCart = () => {
        // here we should show the Cart Page with all selected products
    }

    return (
        <button onClick={toggleCart} className={styles.cart}>
            <FaCartShopping />
            {itemsCount ? <Badge count={itemsCount} /> : ""}
        </button>
    );
}

export default CartIcon;
