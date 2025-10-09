import React from 'react';
import ProductCard from './ProductCard';
import type { Product } from '../services/productService';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <div className="product-list">
      {products.length ? (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  );
};