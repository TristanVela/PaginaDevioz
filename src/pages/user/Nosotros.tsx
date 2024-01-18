import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./About_us.module.css";

const AboutUsPage = () => {
  return (
    <div>
      {/* Nuevo componente de sección */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("imgs/servicios-TI.jpg")' }}>
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-left">
            <h1 className="text-4xl font-extrabold sm:text-5xl text-white mb-4">
              Acerca de <br /> Nosotros
            </h1>
            <p className="max-w-lg text-xl text-white">
              ¡Bienvenido a Devioz, tu socio confiable en soluciones tecnológicas de vanguardia! Con más de 18 clientes satisfechos, nos enorgullece ser una consultora de TI líder, comprometida con la excelencia y la innovación.
            </p>
          </div>

        </div>
      </section>

      {/* Primera sección */}
      <section className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between p-8">
        {/* Texto a la izquierda */}
        <div className="md:w-1/2 p-4">
          <div className="max-w-prose mx-auto">
            <div className="section-title style1 left">
              <h4 className="title text-xl md:text-6xl font-bold mb-2">Misión</h4>
              <p className="description text-sm md:text-base leading-relaxed">
                En Devioz, nos dedicamos a transformar la visión tecnológica de nuestros clientes en soluciones innovadoras y eficientes. Nuestra misión es ofrecer servicios de consultoría de TI de la más alta calidad, trabajando de la mano con nuestros clientes para comprender sus necesidades y desafíos específicos. Buscamos no solo satisfacer, sino superar las expectativas, brindando soluciones que impulsen el éxito de nuestros clientes y fortalezcan sus operaciones tecnológicas.
              </p>
            </div>
          </div>
        </div>

        {/* Imagen a la derecha */}
        <div className="w-full md:w-1/2">
          <div className="relative">
            <img
              decoding="async"
              className="w-full md:max-w-xs lg:max-w-lg"
              src="https://urnothemes.com/solute/wp-content/uploads/2023/02/about2-img.png"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Segunda sección */}
      <section className="container mx-auto flex flex-col md:flex-row items-center justify-between p-8">
        {/* Imagen a la izquierda */}
        <div className="md:w-1/2">
          <div className="relative">
            <img
              decoding="async"
              className="w-full md:max-w-xs lg:max-w-lg"
              src="https://urnothemes.com/solute/wp-content/uploads/2023/02/about2-img.png"
              alt=""
            />
          </div>
        </div>

        {/* Texto a la derecha */}
        <div className="md:w-1/2 p-4">
          <div className="max-w-prose mx-auto">
            <div className="section-title style1 left">
              <h4 className="title text-xl md:text-6xl font-bold mb-2">Visión</h4>
              <p className="description text-sm md:text-base leading-relaxed">
                Nos vemos como líderes en la consultoría de TI, reconocidos por nuestra excelencia, creatividad y compromiso con la entrega de soluciones excepcionales. En Devioz, aspiramos a ser el socio preferido de empresas que buscan optimizar sus procesos, adoptar tecnologías de vanguardia y alcanzar nuevos niveles de eficiencia. Visualizamos un futuro donde nuestras contribuciones continúen siendo reconocidas y aplaudidas, y donde nuestro éxito esté intrínsecamente ligado al éxito continuo de nuestros valiosos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="banner-contact bg-[#031019] py-12 px-7 flex justify-center items-center flex-col overflow-hidden mt-20">
        <h2 className="text-5xl font-bold text-center text-white">Nuestros clientes</h2>
        <div className="select-none">
          <div className="flex overflow-x-hidden whitespace-no-wrap">
            <div className="relative">
              <div className="flex animate-marquee">
                {/* Aquí comienza la sección de habilidades técnicas */}
                <div className="flex flex-col items-center w-32 mx-12 gap-y-4">
                  <img className="w-full h-full" src="https://deviozpagebackend-production.up.railway.app/images/1aws.png" alt="AWS" />
                  <span className="w-full font-bold text-center text-white">AWS</span>
                </div>
                {/* Repite este bloque para cada habilidad técnica */}
                {/* ... (bloques de habilidades técnicas) */}
                {/* Aquí termina la sección de habilidades técnicas */}
              </div>
              <div className="absolute top-0 flex animate-marquee2">
                {/* Aquí comienza la segunda parte de la animación */}
                {/* Repite los mismos bloques de habilidades técnicas aquí */}
                {/* ... (bloques de habilidades técnicas) */}
                {/* Aquí termina la segunda parte de la animación */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>

      </section>
    </div>
  );
};

export default AboutUsPage;
