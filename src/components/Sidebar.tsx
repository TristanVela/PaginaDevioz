import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [sideElementSelected, setSideElementSelected] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split("/")[3];
    const pathSelected = path ? path : "navfooter";
    setSideElementSelected(pathSelected);
  }, []);

  return (
    <>
      <div className="fixed top-0 z-50 w-full pb-2 bg-gray-100 dark:bg-gray-700 md:hidden">
        <button
          type="button"
          className="inline-flex items-center p-2 mt-2 text-sm text-gray-500 rounded-lg ms-3 md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      </div>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-[99] w-64 h-screen transition-transform ${
          isSidebarOpen
            ? "translate-x-0 w-full"
            : "-translate-x-full md:translate-x-0 w-64"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#f9fafc]">
          <a href="#" className="flex items-center ps-2.5 mb-5">
            <img
              src="/images/Logo_icon.webp"
              className="w-16 h-14 me-3"
              alt="Devioz Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap">
              Devioz
            </span>
          </a>
          <hr />
          <ul className="space-y-2 font-medium">
            <li
              onClick={() => {
                navigate("/admin/dashboard/navfooter");
                setSideElementSelected("navfooter");
                setIsSidebarOpen(false);
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-[#070f26] group cursor-pointer hover:text-white
                 ${
                   sideElementSelected === "navfooter" &&
                   "bg-[#070f26] text-[#fff] font-bold"
                 }
                `}
                onClick={() => setSideElementSelected("navfooter")}
              >
                <span className="ms-3">NavFooter</span>
              </div>
            </li>
            <li
              onClick={() => {
                navigate("/admin/dashboard/inicio");
                setSideElementSelected("inicio");
                setIsSidebarOpen(false);
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-[#070f26] group cursor-pointer hover:text-white
                ${
                  sideElementSelected === "inicio" &&
                  "bg-[#070f26] text-[#fff] font-bold"
                }
                `}
                onClick={() => setSideElementSelected("inicio")}
              >
                <span className="ms-3">Inicio</span>
              </div>
            </li>
            <li
              onClick={() => {
                navigate("/admin/dashboard/nosotros");
                setSideElementSelected("nosotros");
                setIsSidebarOpen(false);
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-[#070f26] group cursor-pointer hover:text-white $${
                  sideElementSelected === "nosotros" &&
                  "bg-[#070f26] text-[#fff] font-bold"
                }`}
                onClick={() => setSideElementSelected("nosotros")}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Nosotros</span>
              </div>
            </li>
            <li
              onClick={() => {
                navigate("/admin/dashboard/productos");
                setSideElementSelected("productos");
                setIsSidebarOpen(false);
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-[#070f26] group cursor-pointer hover:text-white $${
                  sideElementSelected === "productos" &&
                  "bg-[#070f26] text-[#fff] font-bold"
                }`}
                onClick={() => setSideElementSelected("productos")}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Productos</span>
              </div>
            </li>
            <li
              onClick={() => {
                navigate("/admin/dashboard/servicios");
                setSideElementSelected("servicios");
                setIsSidebarOpen(false);
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-[#070f26] group cursor-pointer hover:text-white $${
                  sideElementSelected === "servicios" &&
                  "bg-[#070f26] text-[#fff] font-bold"
                }`}
                onClick={() => setSideElementSelected("servicios")}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Servicios</span>
              </div>
            </li>
            <li
              onClick={() => {
                navigate("/admin/dashboard/contactanos");
                setSideElementSelected("contactanos");
                setIsSidebarOpen(false);
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-[#070f26] group cursor-pointer hover:text-white $${
                  sideElementSelected === "contactanos" &&
                  "bg-[#070f26] text-[#fff] font-bold"
                }`}
                onClick={() => setSideElementSelected("contactanos")}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Contactanos
                </span>
              </div>
            </li>
            <li
              onClick={() => {
                setIsSidebarOpen(false);
                navigate("/");
              }}
            >
              <div
                className={`flex items-center p-2 pb-4 pt-4 text-[#070f26] rounded-lg hover:bg-red-500 group cursor-pointer hover:text-white $${
                  sideElementSelected === "contactanos" &&
                  "bg-[#070f26] text-[#fff] font-bold"
                }`}
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Cerrar Sesión
                </span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
