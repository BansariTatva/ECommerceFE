import React from 'react';

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
