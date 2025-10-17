import React from 'react';
import styles from "./ShopMenPage.module.scss"
import ProductCard from '../../../components/product/ProductCard';
import data from "../../../data/products";

const ShopMenPage = () => {

    return (
        <div className={styles.shopContainer}>
            <h1 className={styles.title}>Our Men Products</h1>
            <div className={styles.grid}>
                <ProductCard products={data} />
            </div>
        </div>
    );
}

export default ShopMenPage;
