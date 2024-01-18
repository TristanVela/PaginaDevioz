// ProductCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define un tipo para la prop 'product'
type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
};

// Usa el tipo 'Product' para la prop 'product'
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

  const navigate = useNavigate();

  const handleViewDetail = () => {
      navigate(`/productdetail/${product.id}`)
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full h-48 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">{product.description}</p>
      </div>
      <div className="px-6 py-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={handleViewDetail}
        >
          Ver
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => console.log('Añadir a carrito')}
        >
          Añadir a carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
