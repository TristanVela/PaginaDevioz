import React from 'react';

type Service = {
  title: string;
  description: string;
  link: string;
};

const ServiceBox: React.FC<{ service: Service }> = ({ service }) => (
  <div className="ct-div-block oxy-superbox">
    <div className="oxy-superbox-wrap">
      <div className="ct-div-block oxy-superbox-primary">
        <h3 className="ct-headline">{service.title}</h3>
      </div>
      <div className="ct-div-block oxy-superbox-secondary">
        <div className="ct-text-block text-center"> {/* Cambié 'align' a 'text-center' */}
          {service.description}
        </div>
        <a className="ct-link-button" href={service.link} target="_self">
          Leer Más
        </a>
      </div>
    </div>
  </div>
);

export default ServiceBox;
