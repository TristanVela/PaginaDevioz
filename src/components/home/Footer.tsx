import { BsWhatsapp } from "react-icons/bs";
import { Footer as FooterI } from "../../interfaces/data";
import { SiGmail } from "react-icons/si";

interface FooterDataI {
  data: FooterI[];
}

const Footer = ({ data }: FooterDataI) => {
  return (
    <footer className="mt-20">
      <div className="mt-4 bg-[#031019] px-14 grid gap-y-10 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-x-12 py-14">
        <div className={`flex flex-col gap-y-${data.length}`}>
          <h2 className="text-3xl font-bold text-center text-white lg:text-left">
            {data[0].title_1}
          </h2>
          <p className="text-xl text-center text-white lg:text-left">
            {data[0].text}
          </p>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold text-center text-white">
            {data[1].title_2}
          </h2>
          <ul className="flex flex-col items-center">
            {data[1].links?.map((link, index) => (
              <li
                key={index}
                className="text-xl text-white transition-all duration-300 hover:text-gray-200"
              >
                <a href={link.link}>{link.name}</a>
              </li>
            ))}
            {/* <li className="text-xl text-white transition-all duration-300 hover:text-gray-200">
              <a href="/">Sobre Nosotros</a>
            </li>
            <li className="text-xl text-white transition-all duration-300 hover:text-gray-200">
              <a href="/">Servicios</a>
            </li>
            <li className="text-xl text-white transition-all duration-300 hover:text-gray-200">
              <a href="/">Consultoria</a>
            </li>
            <li className="text-xl text-white transition-all duration-300 hover:text-gray-200">
              <a href="/">Trabaja con Nosotros</a>
            </li> */}
          </ul>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold text-center text-white">
            {data[2].title_3}
          </h2>
          <div className="flex items-center justify-center gap-x-8">
            <a href="mailto:deviozti@gmail.com" target="_blank">
              <SiGmail
                className="text-3xl transition-all duration-300 cursor-pointer hover:scale-125"
                color="#fff"
              />
            </a>
            <a href="https://wa.me/+51953704473" target="_blank">
              <BsWhatsapp
                className="text-3xl transition-all duration-300 cursor-pointer hover:scale-125"
                color="#fff"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h2 className="text-3xl font-bold text-center text-white lg:text-left">
            {data[3].title_4}
          </h2>
          <div className="flex flex-col gap-y-2">
            <span className="text-xl text-center text-white lg:text-left">
              {data[3].text}
            </span>
            <span className="text-xl text-center text-white lg:text-left">
              {data[3].text_2}
            </span>
          </div>
        </div>
      </div>

      <div className="py-4 text-center copyrigth text-[#888]">
        Devioz © 2023. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
