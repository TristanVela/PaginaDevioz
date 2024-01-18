import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataPageI, Projects } from "../../../interfaces/data";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDevioz } from "../../../hooks";

interface Props {
  dataPage: DataPageI;
  toast: any;
}

const Projectss = ({ dataPage, toast }: Props) => {
  const { handleUpdateProjects } = useDevioz();
  const [dataProjects, setDataProjects] = useState<Projects[]>([]);
  const { register, handleSubmit, setValue, reset } = useForm<
    Projects[] | any
  >();
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([]);
  const [imageSrc, setImageSrc] = useState("");
  const [inputNewProject, setInputNewProject] = useState<Projects>({
    name_project: "",
    list_projects: [
      {
        cover: "",
        link: "",
        name: "",
      },
    ],
  });

  const handleFileChangeCharacter = (
    event: any,
    index: number,
    index2: number
  ) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = newPreviews[index] || [];
          newPreviews[index][index2] = reader.result;
          return newPreviews;
        });

        const updateInput = (input: any, property: any, value: any) => {
          return {
            ...input,
            [property]: input[property].map((item: any, i: number) =>
              i === index2 ? { ...item, [property]: value } : item
            ),
          };
        };

        if (index === dataProjects.length) {
          setInputNewProject((prevInput) =>
            updateInput(prevInput, "list_projects", {
              cover: file,
            })
          );
          setImageSrc(reader.result as any);
        } else {
          setValue(
            `projects[${index}].list_projects[${index2}].cover` as any,
            file
          );
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    setIsLoadingProjects(true);

    const formData = new FormData();
    let dataFinal = [];

    if (data.projects && data.projects.length > 0) {
      dataFinal = data.projects.map((project: any, index: number) => {
        const dataFinalR = project.list_projects.map(
          (listProject: any, index2: number) => {
            return {
              ...listProject,
              cover:
                listProject.cover ||
                (dataProjects && dataProjects[index]
                  ? dataProjects[index].list_projects[index2]?.cover
                  : ""),
            };
          }
        );

        return {
          ...project,
          list_projects: dataFinalR.filter(
            (subProject: any) => subProject.name !== ""
          ),
        };
      });
    } else {
      dataFinal = dataProjects;
    }

    if (inputNewProject.name_project !== "") {
      const newProject = {
        name_project: inputNewProject.name_project,
        list_projects: [
          {
            name: inputNewProject.list_projects[0].name,
            link: inputNewProject.list_projects[0].link,
            cover: inputNewProject.list_projects[0].cover,
          },
        ],
      };

      dataFinal.push(newProject);
    }

    dataFinal.forEach((project: any, index: any) => {
      formData.append(`projects[${index}][name_project]`, project.name_project);

      project.list_projects.forEach((subProject: any, indexP: any) => {
        formData.append(
          `projects[${index}][list_projects][${indexP}][name]`,
          subProject.name
        );
        formData.append(
          `projects[${index}][list_projects][${indexP}][link]`,
          subProject.link
        );

        if (subProject.cover instanceof File) {
          formData.append(`projectCover_${indexP}`, subProject.cover);
        } else if (typeof subProject.cover === "string") {
          formData.append(
            `projects[${index}][list_projects][${indexP}][cover]`,
            subProject.cover
          );
        }
      });
    });

    try {
      formData.append(`sectionName`, "projects");
      const { response, ok } = await handleUpdateProjects(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setInputNewProject({
          name_project: "",
          list_projects: [
            {
              cover: "",
              link: "",
              name: "",
            },
          ],
        });
        setIsLoadingProjects(false);
        setImagePreviews([]);
        reset();
        setDataProjects(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingProjects(false);
    }
  };

  const onDeleteTechnicalSkill = async (id: any) => {
    try {
      const dataFilter = dataProjects
        .map((project) => {
          project.list_projects = project.list_projects.filter(
            (listProject) => listProject._id !== id
          );
          return project;
        })
        .filter((project) => project.list_projects.length > 0);

      setDataProjects(dataFilter);
      await onSubmit({ projects: dataFilter });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataProjects(dataPage.sections?.projects);
  }, []);

  useEffect(() => {
    if (dataProjects) {
      setValue("projects", dataProjects);
    }
  }, [dataProjects]);

  if (!dataProjects) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Proyectos</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 overflow-x-auto">
            {dataProjects.map((project, index) => (
              <div
                className="flex items-center justify-center p-3 mb-4 transition-all duration-300 w-fit gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit"
                key={index}
              >
                <div className="flex flex-col gap-x-4 gap-y-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre proyecto"
                      defaultValue={project.name_project}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(`projects[${index}].name_project` as any)}
                    />
                  </div>

                  {project.list_projects.map((project_u, index2) => (
                    <div key={index2}>
                      <div className="flex gap-x-4">
                        {/* Imagen */}
                        <div className="relative flex items-center justify-center overflow-hidden h-fit w-[12rem] ">
                          <label
                            htmlFor={`dropzone-file-project-${index}-${index2}`}
                            className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <AiOutlineCloudUpload size={40} />
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                Subir icono
                              </p>
                            </div>
                            <input
                              id={`dropzone-file-project-${index}-${index2}`}
                              type="file"
                              className="hidden"
                              {...register(
                                `projects[${index}].list_projects[${index2}].cover` as any
                              )}
                              onChange={(e) =>
                                handleFileChangeCharacter(e, index, index2)
                              }
                            />
                          </label>

                          {imagePreviews[index] &&
                          imagePreviews[index][index2] ? (
                            <div className="absolute object-cover pointer-events-none w-[9rem] h-[6rem]">
                              <img
                                src={imagePreviews[index][index2]}
                                alt="imagePreview"
                                className="w-[9rem] h-[6rem] bg-white"
                              />
                            </div>
                          ) : (
                            <div className="absolute object-cover pointer-events-none w-[9rem] h-[6rem]">
                              <img
                                src={project_u.cover}
                                alt="imagePreview"
                                className="w-[9rem] h-[6rem] bg-white"
                                {...register(
                                  `projects[${index}].list_projects[${index2}].cover` as any
                                )}
                              />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-4">
                          <div>
                            <input
                              type="text"
                              placeholder="Nombre proyecto"
                              defaultValue={project_u.name}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              {...register(
                                `projects[${index}].list_projects[${index2}].name` as any
                              )}
                            />
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Enlace proyecto"
                              defaultValue={project_u.link}
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                              {...register(
                                `projects[${index}].list_projects[${index2}].link` as any
                              )}
                            />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="button"
                            className="cursor-pointer"
                            onClick={() =>
                              onDeleteTechnicalSkill(project_u._id)
                            }
                          >
                            <BsTrash
                              size={20}
                              className="transition-all duration-300 hover:text-red-500"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Nuevo proyecto de la lista de proyectos */}
                  <div className="flex flex-col mb-4 transition-all duration-300 w-fit gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit">
                    <div className="flex gap-x-4">
                      <div className="relative flex items-center justify-center overflow-hidden h-fit w-[10rem]">
                        <label
                          htmlFor={`dropzone-file-project-${index}`}
                          className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <AiOutlineCloudUpload size={40} />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              Subir icono
                            </p>
                          </div>
                          <input
                            id={`dropzone-file-project-${index}`}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              handleFileChangeCharacter(
                                e,
                                index,
                                dataProjects[index].list_projects.length
                              )
                            }
                          />
                        </label>

                        {imagePreviews[index] &&
                          imagePreviews[index][
                            dataProjects[index].list_projects.length
                          ] && (
                            <div className="absolute object-cover pointer-events-none w-max-60 h-max-60 ">
                              <img
                                src={
                                  imagePreviews[index][
                                    dataProjects[index].list_projects.length
                                  ]
                                }
                                alt="imagePreview"
                                className="w-full h-full bg-white"
                              />
                            </div>
                          )}
                      </div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <input
                            type="text"
                            placeholder="Nombre proyecto"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register(
                              `projects[${index}].list_projects[${dataProjects[index].list_projects.length}].name` as any
                            )}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            placeholder="Enlace proyecto"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            {...register(
                              `projects[${index}].list_projects[${dataProjects[index].list_projects.length}].link` as any
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Nuevo tipo de proyecto */}
            <div className="flex flex-col p-3 mb-4 transition-all duration-300 w-fit gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit">
              <input
                type="text"
                placeholder="Tipo de proyecto"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                defaultValue={inputNewProject.name_project}
                onChange={(e) =>
                  setInputNewProject({
                    ...inputNewProject,
                    name_project: e.target.value,
                  })
                }
              />
              <div className="flex gap-x-4">
                {/* Imagen */}
                <div className="relative flex items-center justify-center overflow-hidden h-fit w-[10rem]">
                  <label
                    htmlFor={`dropzone-file-project`}
                    className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <AiOutlineCloudUpload size={40} />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Subir icono
                      </p>
                    </div>
                    <input
                      id={`dropzone-file-project`}
                      type="file"
                      className="hidden"
                      defaultValue={inputNewProject.list_projects[0].cover}
                      onChange={(e) =>
                        handleFileChangeCharacter(e, dataProjects.length, 0)
                      }
                    />
                  </label>

                  {imageSrc && (
                    <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                      <img
                        src={imageSrc}
                        alt="imagePreview"
                        className="w-full h-full bg-white"
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Nombre proyecto"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={inputNewProject.list_projects[0].name}
                      onChange={(e) =>
                        setInputNewProject({
                          ...inputNewProject,
                          list_projects: [
                            {
                              ...inputNewProject.list_projects[0],
                              name: e.target.value,
                            },
                          ],
                        })
                      }
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Enlace proyecto"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      defaultValue={inputNewProject.list_projects[0].link}
                      onChange={(e) =>
                        setInputNewProject({
                          ...inputNewProject,
                          list_projects: [
                            {
                              ...inputNewProject.list_projects[0],
                              link: e.target.value,
                            },
                          ],
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 w-fit"
            type="submit"
            disabled={isLoadingProjects}
          >
            {isLoadingProjects ? (
              <l-ring size="19" speed="2" color="white" stroke={4}></l-ring>
            ) : (
              "Guardar cambios"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Projectss;
