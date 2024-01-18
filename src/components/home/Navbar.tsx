import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { Navbar as NavbarI } from "../../interfaces/data";
import { Link, useLocation } from "react-router-dom";

interface NavbarDataI {
  data: NavbarI;
}

export const Navbar = ({ data }: NavbarDataI) => {
  const [isCollapsed, setCollapsed] = useState(true);
  const location = useLocation();
  const [navbarBackground, setNavbarBackground] = useState("transparent");

  const toggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    const changePoint = 100;

    const handleScroll = () => {
      if (window.scrollY > changePoint) {
        setNavbarBackground("[#031019] backdrop-blur-lg");
      } else {
        setNavbarBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`md:bg-${navbarBackground} bg-[#031019] fixed top-0 z-20 w-full transition-all duration-300`}
    >
      <div className="flex flex-wrap items-center justify-between px-8 mx-auto max-w-screen-2xl">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={data.logo}
            alt="Devioz Logo"
            style={{
              width: "180px",
              height: "100px",
            }}
          />
        </a>
        <button
          onClick={toggleCollapse}
          data-collapse-toggle="navbar-solid-bg"
          type="button"
          className="inline-flex items-center justify-center w-12 h-10 p-2 text-sm text-gray-500 transition-all duration-300 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 group"
          aria-controls="navbar-solid-bg"
          aria-expanded={isCollapsed ? "false" : "true"}
        >
          <BsList className="button-burguer group-hover:text-black" />
        </button>
        <div
          className={`w-full md:flex md:w-auto ${
            isCollapsed ? "hidden" : "flex"
          }`}
          id="navbar-solid-bg"
        >
          <ul className="flex flex-col w-full mt-4 font-medium text-center rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {data.links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.link}
                  className={`transition-all text-xl duration-300 block py-2 px-3 md:p-0 rounded md:bg-transparent md:hover:text-[#2ed1ad]  hover:text-white ${
                    location.pathname === link.link
                      ? "text-white"
                      : "text-gray-300"
                  }`}
                  aria-current="page"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
