import React, { useState } from 'react';
import ProductCard from '../../components/Products/ProductCard';

const Products = () => {
  const initialProducts = Array.from({ length: 16 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: `https://via.placeholder.com/150?text=Product${index + 1}`,
  }));

  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState(initialProducts);

  const handleSearch = (e: { target: { value: any; }; }) => {
    const term = e.target.value;
    setSearchTerm(term);
    // Filtra los productos según el término de búsqueda
    const filteredProducts = initialProducts.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Productos destacados</h2>
        <div className="mt-6">
          {/* Cuadro de búsqueda */}
          <input
            type="text"
            placeholder="Buscar productos"
            value={searchTerm}
            onChange={handleSearch}
            className="w-1/4 px-2 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
