import { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";

import { Footer, Navbar } from "../../../interfaces/data";
import { useDevioz } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";

ring.register();

const DashboardNavbar = () => {
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [inputNewLink, setInputNewLink] = useState<{
    name: string;
    link: string;
  }>({ name: "", link: "" });
  const [inputNewLinkFooter, setInputNewLinkFooter] = useState<{
    name: string;
    link: string;
  }>({ name: "", link: "" });
  const { register, handleSubmit, setValue, reset } = useForm<Navbar>();
  const {
    register: registerFooter,
    handleSubmit: handleSubmitFooter,
    reset: resetFooter,
  } = useForm<Footer[]>();
  const {
    handleUpdateDataSection,
    handleUpdateDataSectionWithImage,
    dataPage,
    setDataPage,
  } = useDevioz();

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `footer[${sectionIndex}].${fieldName}`;
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file);
      setValue("logo", file);
    }
  };

  const onSubmit = async (data: Navbar) => {
    if (dataPage.sections && dataPage.sections.navbar) {
      onUpdateNavbar("navbar", dataPage.sections.navbar, data);
    }
  };

  const onSubmitFooter = async (data: Footer[]) => {
    if (dataPage.sections && dataPage.sections.footer) {
      onUpdateFooter("footer", dataPage.sections.footer, data);
    }
  };

  const onUpdateNavbar = async (
    section: string,
    dataOld: Navbar,
    dataNew: Navbar
  ) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const image = dataNew.logo;

      if (Object.prototype.hasOwnProperty.call(dataNew, "logo")) {
        // @ts-ignore
        delete dataNew.logo;
      }

      const nuevoLink = { name: inputNewLink.name, link: inputNewLink.link };
      let dataNew2 = [];
      let dataOriginal = {};

      if (
        nuevoLink.name !== "" &&
        nuevoLink.link !== "" &&
        nuevoLink.name.trim() !== "" &&
        nuevoLink.link.trim() !== ""
      ) {
        dataNew2 = [...dataNew.links, nuevoLink];
        dataOriginal = {
          ...dataOld,
          links: [
            ...dataNew2.map((link) => ({
              name: link.name,
              link: link.link,
            })),
          ],
        };
      } else {
        dataOriginal = {
          ...dataOld,
          links: [
            ...dataNew.links.map((link) => ({
              name: link.name,
              link: link.link,
            })),
          ],
        };
      }

      formData.append("sectionName", section);
      formData.append("newData", JSON.stringify(dataOriginal));
      formData.append("image", image || dataOld.logo);

      const response = await handleUpdateDataSectionWithImage(formData);

      if (response.ok) {
        setImagePreview(null);
        setIsLoading(false);
        setInputNewLink({ name: "", link: "" });
        toast.success("Datos actualizados correctamente", {
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Error al actualizar datos");
    }
  };

  const onDeleteLinkNavbar = async (data: {
    _id: string;
    link: string;
    name: string;
  }) => {
    const { name } = data;

    if (dataPage.sections && dataPage.sections.navbar) {
      const updatedLinks = dataPage.sections.navbar.links!.filter(
        (linkItem) => linkItem.name !== name
      );

      const navbarCopy = JSON.parse(JSON.stringify(dataPage.sections.navbar));
      navbarCopy.links = updatedLinks;
      setDataPage((prevData) => ({
        ...prevData,
        sections: {
          ...prevData.sections,
          navbar: navbarCopy,
        },
      }));

      await onUpdateNavbar("navbar", dataPage.sections.navbar, navbarCopy);
    }
  };

  const onUpdateFooter = async (
    section: string,
    dataOld: Footer[],
    dataNew: Footer[] | any
  ) => {
    try {
      setIsLoading2(true);
      const dataCombined = [...dataOld, ...dataNew.footer];
      const mergedData = {} as any;

      dataCombined.forEach((obj) => {
        const normalizedObj = {} as any;
        Object.keys(obj).forEach((key) => {
          if (key.startsWith("title_")) {
            normalizedObj[key] = obj[key];
          }
        });

        const keys = Object.keys(normalizedObj);
        const uniqueKey = keys.join("-");

        if (mergedData[uniqueKey]) {
          Object.assign(mergedData[uniqueKey], obj);
        } else {
          mergedData[uniqueKey] = { ...normalizedObj };
        }
      });

      const objectValuesMergedData = Object.values(mergedData) as any;
      const linksFooter = objectValuesMergedData[1].links;

      if (
        (inputNewLinkFooter.name !== "" && inputNewLinkFooter.link !== "") ||
        (inputNewLinkFooter.name.trim() !== "" &&
          inputNewLinkFooter.link.trim() !== "")
      ) {
        linksFooter.push({
          name: inputNewLinkFooter.name,
          link: inputNewLinkFooter.link,
        });
        setInputNewLinkFooter({ name: "", link: "" });
      }

      objectValuesMergedData[1].links = linksFooter;
      const resultArray = Object.values(mergedData);
      const response = await handleUpdateDataSection({
        sectionName: section,
        newData: resultArray,
      });
      if (response.ok) {
        setIsLoading2(false);
        toast.success("Datos actualizados correctamente", {
          theme: "colored",
        });
      }
    } catch (error) {
      setIsLoading2(false);
      toast.error("Error al actualizar datos");
      console.error("Error al actualizar datos:", error, {
        theme: "colored",
      });
    }
  };

  const onDeleteLinkFooter = (data: {
    _id: string;
    link: string;
    name: string;
  }) => {
    const { name } = data;

    if (dataPage.sections && dataPage.sections.footer) {
      const sectionIndex = 1;
      const dataNew = {
        ...dataPage.sections.footer,
        [sectionIndex]: {
          ...dataPage.sections.footer[sectionIndex],
          links: [
            ...dataPage.sections.footer[sectionIndex].links!.filter(
              (link) => link.name !== name
            ),
          ],
        },
      };

      const dataNewArray = Object.values(dataNew);

      onUpdateFooter("footer", dataPage.sections.footer, {
        footer: dataNewArray,
      });
    }
  };

  // if (
  //   !dataPage ||
  //   !dataPage.sections?.navbar ||
  //   !dataPage.sections?.footer ||
  //   !dataPage === null
  // )
  //   return (
  //     <>
  //       <Sidebar />
  //     </>
  //   );

  return (
    <>
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold">Navbar</h3>
              <div className="bg-[#070f26] flex items-center justify-center">
                <div className="flex items-center justify-between w-full gap-2 p-2 px-4">
                  <img
                    className="w-40"
                    src={dataPage.sections?.navbar.logo}
                    alt=""
                  />
                  <div className="flex gap-x-4">
                    {dataPage.sections?.navbar.links.map((link) => (
                      <p
                        key={uuidv4()}
                        className="text-sm font-bold text-white"
                      >
                        {link.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <form
                  className="flex flex-wrap gap-4"
                  encType="multipart/form-data"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {dataPage.sections?.navbar.links.map((link, index) => (
                    <div
                      className="flex items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200 w-52"
                      key={index}
                    >
                      <div>
                        <input
                          type="text"
                          defaultValue={link.name}
                          className="w-full bg-transparent"
                          {...register(`links.${index}.name`)}
                        />
                        <input
                          type="text"
                          defaultValue={link.link}
                          className="w-full bg-transparent"
                          {...register(`links.${index}.link`)}
                        />
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          className="cursor-pointer"
                          onClick={() => onDeleteLinkNavbar(link as any)}
                        >
                          <BsTrash
                            size={20}
                            className="transition-all duration-300 hover:text-red-500"
                          />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* New Input navbar */}
                  <div className="flex flex-col items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200 w-52">
                    <input
                      type="text"
                      placeholder="Nuevo nombre"
                      className="w-full bg-transparent"
                      value={inputNewLink.name}
                      onChange={(e) =>
                        setInputNewLink({
                          ...inputNewLink,
                          name: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Nuevo enlace"
                      className="w-full bg-transparent"
                      value={inputNewLink.link}
                      onChange={(e) =>
                        setInputNewLink({
                          ...inputNewLink,
                          link: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="relative flex items-center justify-center w-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineCloudUpload size={40} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Sube tu logo
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        {...register("logo")}
                        onChange={handleFileChange}
                      />
                    </label>

                    {imagePreview && (
                      <div className="h-full w-[30rem] object-cover absolute pointer-events-none">
                        <img
                          src={imagePreview}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                          {...register("logo")}
                        />
                      </div>
                    )}
                  </div>

                  <button
                    className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <l-ring
                        size="19"
                        speed="2"
                        color="white"
                        stroke={4}
                      ></l-ring>
                    ) : (
                      "Guardar cambios"
                    )}
                  </button>
                  {imagePreview && (
                    <button
                      className="px-4 py-2 font-bold text-white transition-all duration-300 bg-red-500 rounded hover:bg-red-700"
                      type="button"
                      onClick={() => setImagePreview(null)}
                    >
                      Eliminar imagen
                    </button>
                  )}
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-4">
              <h3 className="text-3xl font-bold">Footer</h3>
              <div className="bg-[#070f26] flex items-center justify-center">
                <div className="grid items-start w-full grid-cols-4 gap-2 p-2 px-4 justify-items-center">
                  {/* Devioz */}
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataPage.sections.footer[0].title_1}
                    </h3>
                    <p>{dataPage.sections.footer[0].text}</p>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataPage.sections.footer[1]?.title_2}
                    </h3>
                    <ul className="text-center">
                      {dataPage.sections?.footer[1].links?.map(
                        (link, index) => (
                          <li key={index}>
                            <p>{link.name}</p>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataPage.sections.footer[2].title_3}
                    </h3>
                    ICONOS DE REDES
                    {/* <p>{dataPage.sections.footer[2].text}</p> */}
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">
                      {dataPage.sections.footer[3].title_4}
                    </h3>
                    <p>{dataPage.sections.footer[3].text}</p>
                    <p>{dataPage.sections.footer[3].text_2}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <form
                  className="grid items-start grid-cols-4 gap-4"
                  onSubmit={handleSubmitFooter(onSubmitFooter)}
                >
                  {/* Sección 1 */}
                  <div className="flex flex-col items-center">
                    <input
                      type="text"
                      defaultValue={dataPage.sections.footer[0].title_1}
                      className="w-full text-2xl font-bold bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 0,
                          fieldName: "title_1",
                        }) as any
                      )}
                    />
                    <textarea
                      defaultValue={dataPage.sections.footer[0].text}
                      className="w-full bg-transparent resize-none h-44"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 0,
                          fieldName: "text",
                        }) as any
                      )}
                    ></textarea>
                  </div>

                  {/* Sección 2 */}
                  <div className="flex flex-col gap-y-4">
                    <input
                      type="text"
                      defaultValue={dataPage.sections.footer[1].title_2}
                      className="w-full text-2xl font-bold text-center bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 1,
                          fieldName: "title_2",
                        }) as any
                      )}
                    />
                    {dataPage.sections.footer[1].links?.map((link, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200"
                      >
                        <div>
                          <input
                            type="text"
                            defaultValue={link.name}
                            className="w-full bg-transparent"
                            {...registerFooter(
                              getFieldName({
                                sectionIndex: 1,
                                fieldName: `links.${index}.name`,
                              }) as any
                            )}
                          />
                          <input
                            type="text"
                            defaultValue={link.link}
                            className="w-full bg-transparent"
                            {...registerFooter(
                              getFieldName({
                                sectionIndex: 1,
                                fieldName: `links.${index}.link`,
                              }) as any
                            )}
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() => onDeleteLinkFooter(link as any)}
                          >
                            <BsTrash
                              size={20}
                              className="transition-all duration-300 hover:text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200">
                      <div>
                        <input
                          type="text"
                          className="w-full bg-transparent"
                          placeholder="Nuevo nombre"
                          value={inputNewLinkFooter.name}
                          onChange={(e) =>
                            setInputNewLinkFooter({
                              ...inputNewLinkFooter,
                              name: e.target.value,
                            })
                          }
                        />
                        <input
                          type="text"
                          className="w-full bg-transparent"
                          placeholder="Nuevo enlace"
                          value={inputNewLinkFooter.link}
                          onChange={(e) =>
                            setInputNewLinkFooter({
                              ...inputNewLinkFooter,
                              link: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sección 3 */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={dataPage.sections.footer[2].title_3}
                      className="w-full text-2xl font-bold text-center bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 2,
                          fieldName: "title_3",
                        }) as any
                      )}
                    />
                  </div>

                  {/* Sección 4 */}
                  <div className="flex flex-col">
                    <input
                      type="text"
                      defaultValue={dataPage.sections.footer[3].title_4}
                      className="w-full text-2xl font-bold bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 3,
                          fieldName: "title_4",
                        }) as any
                      )}
                    />
                    <input
                      type="text"
                      defaultValue={dataPage.sections.footer[3].text}
                      className="w-full bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 3,
                          fieldName: "text",
                        }) as any
                      )}
                    />
                    <input
                      type="text"
                      defaultValue={dataPage.sections.footer[3].text_2}
                      className="w-full bg-transparent"
                      {...registerFooter(
                        getFieldName({
                          sectionIndex: 3,
                          fieldName: "text_2",
                        }) as any
                      )}
                    />
                  </div>

                  {/* Botón de enviar */}
                  <button
                    className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 w-fit"
                    type="submit"
                  >
                    {isLoading2 ? (
                      <l-ring
                        size="19"
                        speed="2"
                        color="white"
                        stroke={4}
                      ></l-ring>
                    ) : (
                      "Guardar cambios"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default DashboardNavbar;
