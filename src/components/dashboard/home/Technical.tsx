import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataPageI, TechnicalSkills } from "../../../interfaces/data";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useDevioz } from "../../../hooks";
import { useNavigate } from "react-router-dom";

interface Props {
  dataPage: DataPageI;
  toast: any;
}

const Technical = ({ dataPage, toast }: Props) => {
  const [dataTechnicals, setDataTechnicals] = useState<TechnicalSkills[]>([]);
  const { handleUpdateTechnicals } = useDevioz();
  const { register, handleSubmit, setValue } = useForm<
    TechnicalSkills[] | any
  >();
  const [isLoadingTechnical, setIsLoadingTechnical] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([] as any);
  const [inputNewTechnical, setInputNewTechnical] = useState<TechnicalSkills>({
    icon: "",
    skill: "",
  });

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `technical_skills[${sectionIndex}].${fieldName}`;
  };

  const resetInputsAndImage = () => {
    setInputNewTechnical({
      icon: "",
      skill: "",
    });
    setImagePreviews([]);
  };

  const handleFileChangeCharacter = (event: any, index: number) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev: any) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result;
          return newPreviews;
        });

        const updateTechnicalIcon = (newIcon: File) => {
          if (index === dataTechnicals?.length) {
            setInputNewTechnical((prevInput) => ({
              ...prevInput,
              icon: newIcon,
            }));
          } else {
            setValue(
              getFieldName({
                sectionIndex: index,
                fieldName: "icon",
              }) as any,
              newIcon
            );
          }
        };

        updateTechnicalIcon(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: TechnicalSkills[] | any) => {
    setIsLoadingTechnical(true);
    const formData = new FormData();
    const dataFinal: any[] = [];

    if (data.technical_skills && data.technical_skills.length > 0) {
      dataFinal.push(
        ...data.technical_skills.map((technical: any, index: any) => ({
          ...technical,
          icon: technical.icon || dataTechnicals?.[index]?.icon,
        }))
      );
    } else {
      dataFinal.push(...(dataTechnicals || []));
    }

    if (inputNewTechnical.icon !== "" && inputNewTechnical.skill !== "") {
      dataFinal.push({
        ...inputNewTechnical,
        icon: inputNewTechnical.icon,
        skill: inputNewTechnical.skill,
      });
    }

    dataFinal.forEach((technical: any, index: any) => {
      formData.append(`technical_skills[${index}][skill]`, technical.skill);

      if (technical.icon instanceof File) {
        formData.append(`technicalIcon_${index}`, technical.icon);
      } else if (typeof technical.icon === "string") {
        formData.append(`technical_skills[${index}][icon]`, technical.icon);
      }
    });

    try {
      formData.append(`sectionName`, "technical_skills");
      const { ok, response } = await handleUpdateTechnicals(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingTechnical(false);
        setDataTechnicals(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingTechnical(false);
    }
  };

  const onDeleteTechnicalSkill = async (_id: string) => {
    try {
      const updatedDataTechnicals = (dataTechnicals || []).filter(
        (technical) => technical._id !== _id
      );

      setDataTechnicals(updatedDataTechnicals);
      await onSubmit({ technical_skills: updatedDataTechnicals });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setDataTechnicals(dataPage.sections?.technical_skills);
  }, []);

  useEffect(() => {
    if (dataTechnicals) {
      setValue("technical_skills", dataTechnicals);
    }
  }, [dataTechnicals]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Habilidades Técnicas</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col flex-wrap gap-4 overflow-hidden"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid max-w-full grid-flow-col grid-rows-2 gap-4 overflow-x-auto">
            {dataTechnicals.map((character, index) => (
              <div
                className="flex items-center justify-center w-64 p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit"
                key={index}
              >
                <div className="flex flex-col gap-x-4 gap-y-2">
                  <div className="relative flex items-center justify-center overflow-hidden h-fit">
                    <label
                      htmlFor={`dropzone-file-technicalss-${index}`}
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineCloudUpload size={40} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Subir icono
                        </p>
                      </div>
                      <input
                        id={`dropzone-file-technicalss-${index}`}
                        type="file"
                        className="hidden"
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "icon",
                          }) as any
                        )}
                        onChange={(e) => handleFileChangeCharacter(e, index)}
                      />
                    </label>

                    {imagePreviews[index] ? (
                      <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                        <img
                          src={imagePreviews[index]}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                        />
                      </div>
                    ) : (
                      <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                        <img
                          src={character.icon}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                          {...register(
                            getFieldName({
                              sectionIndex: index,
                              fieldName: "icon",
                            }) as any
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Habilidad técnica"
                      defaultValue={character.skill}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(
                        getFieldName({
                          sectionIndex: index,
                          fieldName: "skill",
                        }) as any
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => onDeleteTechnicalSkill(character._id!)}
                  >
                    <BsTrash
                      size={20}
                      className="transition-all duration-300 hover:text-red-500"
                    />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col items-center justify-center p-3 mb-4 transition-all duration-300 gap-y-2 gap-x-8 bg-slate-100 hover:bg-slate-200 w-52">
              <div className="relative flex items-center justify-center w-full overflow-hidden h-fit">
                <label
                  htmlFor={`dropzone-file-technical-new`}
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload size={40} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      Subir icono
                    </p>
                  </div>
                  <input
                    id={`dropzone-file-technical-new`}
                    type="file"
                    className="hidden"
                    defaultValue={inputNewTechnical.icon}
                    onChange={(e) =>
                      handleFileChangeCharacter(e, dataTechnicals.length)
                    }
                  />
                </label>

                {imagePreviews[dataTechnicals.length] && (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[dataTechnicals.length]}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                )}
              </div>
              <input
                type="text"
                placeholder="Habilidad técnica"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                value={inputNewTechnical.skill}
                onChange={(e) =>
                  setInputNewTechnical({
                    ...inputNewTechnical,
                    skill: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 w-fit"
            type="submit"
            disabled={isLoadingTechnical}
          >
            {isLoadingTechnical ? (
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

export default Technical;
