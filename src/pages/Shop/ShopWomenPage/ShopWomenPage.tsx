import React from 'react';
import styles from "./ShopWomenPage.module.scss"
import ProductCard from '../../../components/product/ProductCard';
import data from "../../../data/WomenProducts";

const ShopWomenPage = () => {

    return (
        <div className={styles.shopContainer}>
            <h1 className={styles.title}>Our Women Products</h1>
            <div className={styles.grid}>
                <ProductCard products={data} />
            </div>
        </div>
    );
}

export default ShopWomenPage;
