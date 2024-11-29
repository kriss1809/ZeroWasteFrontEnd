import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../entities/Product';
import { GetProductList, DeleteProduct, UpdateProduct, AddProduct } from './apiClient';
import { useAuth } from './authProvider';
import { useWebSocket } from './WebSocketProvider';

interface ProductListContextValue {
    products: Product[];
    getProductList: () => Promise<void>;
    deleteProduct: (product_id: number) => Promise<void>;
    updateProduct: (id: number,productName:string, expirationDate:string, openingDate:string, recommendedDays:string ) => Promise<void>;
    addProduct: (productName:string, expirationDate:string, openingDate:string, recommendedDays:string) => Promise<void>;
}

const ProductListContext = createContext<ProductListContextValue | undefined>(undefined);

export const ProductListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const { isAuthenticated, refreshAccessToken, accessToken, setShareCode } = useAuth();
    const { messages, isConnected } = useWebSocket();

    useEffect(() => {
        if (accessToken) {
            getProductList();
        }
    }, [accessToken, isConnected, messages]);

    const getProductList = async () => {
        const response = await GetProductList();
        if (response) {
            setProducts(response.products);
            setShareCode(response.share_code);
        }
        else {
        if(localStorage.getItem("refreshToken")){
          refreshAccessToken();}
        }
    };

    const deleteProduct = async (product_id: number) => {
        await DeleteProduct(product_id);
    };

    const updateProduct = async (id: number,productName:string, expirationDate:string, openingDate:string, recommendedDays:string ) => {
        await UpdateProduct(id, productName, expirationDate, openingDate, recommendedDays);
    };

    const addProduct = async (productName:string, expirationDate:string, openingDate:string, recommendedDays:string) => {
        await AddProduct(productName, expirationDate, openingDate, recommendedDays);
    };

    return (
        <ProductListContext.Provider value={{ products, getProductList, deleteProduct, updateProduct, addProduct }}>
            {children}
        </ProductListContext.Provider>
    );
};

export const useProductList = () => {
    const context = useContext(ProductListContext);
    if (!context) {
        throw new Error('useProductList must be used within a ProductListProvider');
    }
    return context;
};
