import React, { useState } from "react";
import { BsChevronLeft, BsWhatsapp } from "react-icons/bs";
import { MdContactSupport } from "react-icons/md";
import { SiGmail } from "react-icons/si";

import { Banner, Drawer, Footer, Navbar, Pages } from "../components";
import { useDevioz } from "../hooks";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllSocials, setShowAllSocials] = useState(false);
  const { dataPage } = useDevioz();
  const [sectionProjectSelected, setSectionProjectSelected] = useState("");

  return (
    <div
      className={`${
        isOpen
          ? document.body.classList.toggle("overflow-hidden")
          : document.body.classList.remove("overflow-hidden")
      }`}
    >
      <div>
        <Navbar data={dataPage.sections.navbar} />
        <Banner
          data={dataPage.sections.heros}
          dataBanner={dataPage.sections.banner_info}
        />
      </div>

      <section className="mt-20">
        <div className="flex flex-col items-center justify-center gap-y-20">
          <h2 className="relative text-5xl font-bold text-center">
            Características
          </h2>
          <div className="flex flex-wrap justify-between w-full my-10 px-14 gap-y-24">
            {dataPage.sections.characteristics.map(
              (characteristic, index) =>
                characteristic.isVisibled && (
                  <div
                    className="flex flex-col w-full gap-4 text-center lg:w-1/5 md:w-2/5 sm:w-1/2"
                    key={index}
                  >
                    <img
                      className="mx-auto w-[100px] h-[100px]"
                      src={characteristic.icon}
                      alt={characteristic.text}
                    />
                    <span className="text-4xl font-bold">
                      {characteristic.quantity}
                    </span>
                    <h5 className="text-2xl">{characteristic.text}</h5>
                  </div>
                )
            )}
          </div>
        </div>
      </section>

      <section className="banner-contact bg-[#031019] py-14 px-14 flex justify-center items-center flex-col gap-14 overflow-hidden mt-20">
        <h2 className="text-5xl font-bold text-center text-white">
          Nuestras habilidades técnicas
        </h2>
        <div className="select-none">
          <div className="flex overflow-x-hidden whitespace-no-wrap">
            <div className="relative">
              <div className="flex animate-marquee">
                {dataPage.sections.technical_skills.map((skill, index) => (
                  <div
                    className="flex flex-col items-center w-32 mx-12 gap-y-4"
                    key={index}
                  >
                    <img
                      className="w-full h-full"
                      src={skill.icon}
                      alt={skill.skill}
                    />
                    <span className="w-full font-bold text-center text-white">
                      {skill.skill}
                    </span>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 flex animate-marquee2">
                {dataPage.sections.technical_skills.map((skill, index) => (
                  <div
                    className="flex flex-col items-center w-32 mx-12 gap-y-4"
                    key={index}
                  >
                    <img
                      className="w-full h-full"
                      src={skill.icon}
                      alt={skill.skill}
                    />
                    <span className="w-full font-bold text-center text-white">
                      {skill.skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pages data={dataPage.sections.projects} />

      <section className="flex items-center bg-[#031019] gap-x-8 px-10 mt-20 py-20 lg:py-0">
        <div className="hidden lg:block">
          <img
            className="mb-[-55px] relative w-[60rem] h-[30rem] lg:block hidden lg:pt-20 pt-0"
            src={dataPage.sections.optimized.img}
            alt=""
          />
        </div>
        <div className="flex flex-col items-center justify-center lg:items-start gap-11">
          <h2 className="text-4xl font-bold text-center text-white md:text-left md:text-5xl ">
            {dataPage.sections.optimized.title_main}
          </h2>
          <div className="flex flex-col items-center md:flex-row gap-x-6 gap-y-6 lg:items-start">
            <div className="flex flex-col items-center w-9/12 md:w-1/2 lg:items-start">
              <div className="flex flex-col items-center gap-3 sm:flex-row ">
                <img
                  src={dataPage.sections.optimized.icon_1}
                  alt="Icon 1"
                  className="w-12 h-12"
                />
                <h5 className="text-xl font-bold text-white">
                  {dataPage.sections.optimized.title_1}
                </h5>
              </div>
              <p className="mt-5 text-lg text-center text-white lg:text-start">
                {dataPage.sections.optimized.text_1}
              </p>
            </div>
            <div className="flex flex-col items-center w-9/12 md:w-1/2 lg:items-start">
              <div className="flex flex-col items-center gap-3 sm:flex-row ">
                <img
                  src={dataPage.sections.optimized.icon_2}
                  alt="Icon 2"
                  className="w-12 h-12"
                />
                <h5 className="text-xl font-bold text-white">
                  {dataPage.sections.optimized.title_2}
                </h5>
              </div>
              <p className="mt-5 text-lg text-center text-white lg:text-start">
                {dataPage.sections.optimized.text_2}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mt-24 px-14 gap-14">
        <h2 className="text-5xl font-bold text-center text-black">
          Obten el mejor plan de DevOps
        </h2>
        <div className="flex flex-col items-center justify-center w-full gap-20 mt-10 lg:flex-row">
          {dataPage.sections.payment_plans.map((plan, index) => (
            <div
              className="w-full bg-white border-2 lg:w-1/4 sm:w-1/2"
              style={{
                borderColor: plan.color,
                transform:
                  plan.title_1 === "Ultimate" ? "scale(1.2)" : "scale(1)",
              }}
              key={index}
            >
              <div
                className="w-full h-3"
                style={{
                  backgroundColor: plan.color,
                }}
              ></div>
              <div className="p-8 ">
                <img
                  className="m-auto"
                  src="/images/sales/confetti-1.png"
                  alt="confetti"
                />
                <div className="flex flex-col items-center justify-center py-4 mb-4">
                  <h3 className="text-4xl font-bold">{plan.title_1}</h3>
                  <p className="text-xl text-center">{plan.text_title_1}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-5xl">${plan.price}</span>
                  <span className="ml-1 text-gray-600">{plan.text_1}</span>
                  <span className="mb-4 text-gray-600">{plan.span_1}</span>
                </div>

                <button
                  type="button"
                  className={`hover:bg-black w-full p-3 text-xl font-bold transition-all duration-300 border-2 border-black rounded-lg hover:text-white`}
                >
                  Solicitar
                </button>
                <ul className="mt-4 text-gray-600 list-disc list-inside">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index}>{benefit.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* <Variety /> */}
      {/* <Content /> */}

      <Footer data={dataPage.sections.footer} />

      <button
        type="button"
        className="fixed bottom-0 right-0 z-50 p-2 m-auto text-black translate-x-0 bg-white shadow-lg -top-60 h-fit"
        onClick={() => setIsOpen(true)}
      >
        <BsChevronLeft className="sm:!text-[35px] text-[20px]" />
      </button>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="flex flex-col items-center justify-center gap-2 overflow-hidden">
          <button
            type="button"
            className="bg-[#2ed3ae] p-4 text-white font-bold"
          >
            Button
          </button>

          <div className="flex flex-wrap items-center justify-center w-full gap-6 mt-16">
            <select
              id="countries"
              defaultValue={"DEFAULT"}
              onChange={(e) => setSectionProjectSelected(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={"DEFAULT"} disabled>
                Selecciona tipo de proyecto
              </option>
              {dataPage.sections.projects.map((project, index) => (
                <option key={index} value={project.name_project}>
                  {project.name_project}
                </option>
              ))}
            </select>
          </div>

          {}
          <div className="grid grid-cols-2 gap-4 mt-8 overflow-y-auto items-start h-[calc(70vh)] overflow-x-hidden">
            {dataPage.sections.projects.map((project, index) => {
              return (
                <React.Fragment key={index}>
                  {project.list_projects.map(
                    (eleme, index) =>
                      sectionProjectSelected == project.name_project && (
                        <div
                          key={index}
                          className="flex flex-col items-center justify-center gap-4 cursor-pointer animate__animated animate__zoomIn animate__faster h-fit"
                        >
                          <div className="transition-all duration-300 shadow-md hover:shadow-2xl">
                            <img
                              src={eleme.cover}
                              alt={eleme.name}
                              className="min-w-[150px] max-w-[150px] min-h-[150px] max-h-[150px]"
                            />
                          </div>
                          <span className="text-base text-center">
                            {eleme.name}
                          </span>
                        </div>
                      )
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </Drawer>

      {/* Buttons socials */}
      <div
        className={`fixed z-40 flex flex-col items-end justify-end gap-8 p-2 overflow-hidden rounded-lg shadow-lg bottom-10 left-4 transition-height duration-300 bg-white h-max-fit ${
          showAllSocials ? "h-fit" : "h-16"
        }`}
      >
        <a
          href="mailto:deviozti@gmail.com"
          target="_blank"
          className="text-[#F23535]"
        >
          <SiGmail className="sm:!text-[45px] text-[45px] transition-all duration-300 hover:scale-110 hover:shadow-['#0860e9'] hover:shadow-lg" />
        </a>
        <a
          href="https://wa.me/+51953704473"
          target="_blank"
          className="text-[#48c856]"
        >
          <BsWhatsapp className="sm:!text-[45px] text-[45px] transition-all duration-300 hover:scale-110 hover:drop-shadow-[#48c856] hover:text-[#48c856]" />
        </a>
        <button
          type="button"
          className="text-[#0860e9] "
          onClick={() => setShowAllSocials(!showAllSocials)}
        >
          <MdContactSupport className="sm:!text-[45px] text-[45px] transition-all duration-300 hover:scale-110 hover:shadow-['#0860e9'] hover:shadow-lg" />
        </button>
      </div>
    </div>
  );
}
