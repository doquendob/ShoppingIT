import React from 'react';
import styles from "../product/ProductCard.module.scss";
import { Product } from '../../types/product';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
    const { addItem, storeItem, storedItems } = useCart();

    const handleCartItems = (product: Product) => {
        addItem();
        storeItem(product);
        console.log(storedItems);
    }

    return (
        <>
            {products.map((product: Product) => (
                <div className={styles.cardContainer} key={product.id}>
                    <h3>{product.title}</h3>
                    <img src={product.image} alt="" />
                    <p>{product.description}</p>
                    <span>{product.price}</span>
                    <div>
                        <Button children="Add to Cart" onClick={() => handleCartItems(product)} />
                    </div>
                    <></>
                </div>
            ))}
        </>
    );
}

export default ProductCard;
