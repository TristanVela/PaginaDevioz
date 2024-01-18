import React from 'react';

const ContactUs = () => {
  return (
    <div>
      {/* Aquí está el componente AboutUsPage con solo el hero */}
      <section
        className="bg-cover bg-center h-80"
        style={{
          backgroundImage: `url('https://urnothemes.com/solute/wp-content/themes/solute/assets/images/breadcrumb-bg.jpg')`,
        }}
          > 
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-white">
          <h1 className="text-5xl font-bold mb-4">Contacto</h1>
          <div className="max-w-2xl mx-auto"></div>
        </div>
      </section>
      <div className="container mx-auto flex flex-col lg:flex-row p-8">
  <div className="lg:w-1/2 mb-8 lg:mb-0">
    {/* Información de contacto (Números de teléfono, correos, direcciones, etc.) */}
    <h4 className="text-2xl font-bold mb-4 text-center">Información de Contacto</h4>
    <ul className="list-disc pl-8">
      <p>Número de Teléfono: xxx-xxx-xxxx</p>
      <p>Correo Electrónico: ejemplo@correo.com</p>
      <p>Dirección: 123 Calle Principal, Ciudad</p>
      {/* Agrega más información según sea necesario */}
    </ul>
  </div>
  <div className="lg:w-1/2">
    {/* Formulario de contacto */}
    <h4 className="text-2xl font-bold mb-4 text-center">Contacto</h4>
    <form
      action="/solute/contact/#wpcf7-f1119-p1032-o1"
      method="post"
      className="w-full max-w-lg mx-auto"
      aria-label="Contact form"
      noValidate
    >
      <div className="flex flex-wrap -mx-2 mb-6"> {/* Ajuste en el espacio entre las columnas */}
        <div className="w-full md:w-1/2 px-2 mb-6">
          <label
            htmlFor="fname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombres
          </label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Nombres"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-6">
          <label
            htmlFor="lname"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="lname"
            name="lname"
            placeholder="Apellidos"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full px-2 mb-6">
          <label
            htmlFor="user-email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Correo Electronico
          </label>
          <input
            type="email"
            id="user-email"
            name="user-email"
            placeholder="Correo Electronico"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full px-2 mb-6">
          <label
            htmlFor="services"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Servicios
          </label>
          <select
            id="services"
            name="services"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="service1">Servicio 1</option>
            <option value="service2">Servicio 2</option>
            <option value="service3">Servicio 3</option>
          </select>
        </div>
        <div className="w-full px-2 mb-6">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Número de Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Número de Teléfono"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full px-2 mb-6">
          <label
            htmlFor="subject"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Asunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="w-full px-2 mb-6">
          <label
            htmlFor="message"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mensaje
          </label>
          <textarea
            rows={5}
            id="message"
            name="message"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>
        <div className="w-full px-2 mb-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Solicitar Información
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

    </div>
  );
};

export default ContactUs;
