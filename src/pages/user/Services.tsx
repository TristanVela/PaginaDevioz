import React, { useState } from 'react';
import Slider from 'react-slick';

const ServicesPage = () => {
  const services = [
    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },
    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },

    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },
    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },

    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },
    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },

    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },
    {
      image: 'imgs/DSW.png',
      description: 'Creación de sitios web a medida, adaptados a sus requisitos y objetivos comerciales.',
    },
    // Agrega más servicios según sea necesario
  ];

  

  return (
    <>
      <section
        className="bg-cover bg-center h-80 relative flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url('https://urnothemes.com/solute/wp-content/themes/solute/assets/images/breadcrumb-bg.jpg')`,
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="text-white">
          <h1 className="text-5xl font-bold mb-4">Servicios generales de TI</h1>
          <div className="max-w-2xl mx-auto">
            {/* Agrega el contenido que desees mostrar en la sección de contacto */}
          </div>
        </div>
        <div className="absolute bottom-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md mx-auto">
            Contacto
          </button>
        </div>
      </section>

      <div className="container mx-auto mt-10 p-8">
        <h1 className="text-4xl font-bold mb-8">Nuestros Servicios</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md relative">
              <img
                src={service.image}
                className="w-full h-64 object-cover mb-4 transition-opacity duration-300 hover:opacity-90"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-gray-400 bg-opacity-70">
                <p className="text-gray-600 text-center text-white">{service.description}</p>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
                  Ver más
                </button>
              </div>
              <div className="absolute top-10 left-0 right-0 text-white font-bold text-center">
                Desarrollo Web
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Sección adicional */}
      <section className="bg-black text-white py-16">
      <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Solicitar más informacion acerca de los servicios de Devioz</h2>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Más Información
          </button>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;