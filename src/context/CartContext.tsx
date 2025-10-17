import { Product } from "../types/product";
import React, { useState, useEffect, createContext, useContext } from "react";

interface CartContextType {
    itemsCount: number;
    storedItems: Product[];
    addItem: () => void;
    removeItem: () => void;
    storeItem: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [storedItems, setStoredItems] = useState<Product[]>(() => {
        const storedItems = localStorage.getItem('storedItems');
        return storedItems ? JSON.parse(storedItems) : [];
    });

    const [itemsCount, setItemsCount] = useState(() => {
        const storedCount = localStorage.getItem('itemsCount');
        return storedCount ? JSON.parse(storedCount) : 0;
    });

    const addItem = () => setItemsCount((prev: number) => prev + 1);
    const removeItem = () => setItemsCount((prev: number) => Math.max(0, prev - 1));
    const storeItem = (product: Product) => setStoredItems((prev) => [...prev, product]);

    useEffect(() => {
        const storedCart = localStorage.getItem('storedItems');
        const storedCount = localStorage.getItem('itemsCount');
        if (storedCart) {
            setStoredItems(JSON.parse(storedCart));
        }
        if (storedCount) {
            setItemsCount(JSON.parse(storedCount));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('storedItems', JSON.stringify(storedItems));
        localStorage.setItem('itemsCount', JSON.stringify(itemsCount));
    }, [storedItems, itemsCount]);

    return (
        <CartContext.Provider value={{ itemsCount, storedItems, addItem, removeItem, storeItem }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};