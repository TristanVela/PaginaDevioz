import { useEffect, useState } from "react";
import { Characteristics, DataPageI } from "../../../interfaces/data";
import { useForm } from "react-hook-form";
import { useDevioz } from "../../../hooks";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";

interface Props {
  dataPage: DataPageI;
  toast: any;
}

const CharacteristicsC = ({ dataPage, toast }: Props) => {
  const [dataCharacteristics, setDataCharacteristics] = useState<
    Characteristics[]
  >([]);
  const { handleUpdateCharacteristics } = useDevioz();
  const { register, handleSubmit, setValue } = useForm<
    Characteristics[] | any
  >();
  const [isLoadingCharacteristics, setIsLoadingCharacteristics] =
    useState(false);
  const [imagePreviews, setImagePreviews] = useState<any>([] as any);
  const [inputNewCharacter, setInputNewCharacter] = useState<Characteristics>({
    icon: "",
    quantity: "",
    text: "",
    isVisibled: false,
  });

  const resetInputsAndImage = () => {
    setInputNewCharacter({
      icon: "",
      quantity: "",
      text: "",
      isVisibled: false,
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

        const updateCharacterIcon = (newIcon: File) => {
          if (index === dataCharacteristics?.length) {
            setInputNewCharacter((prevInput: any) => ({
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

        updateCharacterIcon(file);
      };

      reader.readAsDataURL(file);
    }
  };

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `characteristics[${sectionIndex}].${fieldName}`;
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoadingCharacteristics(true);

      const formData = new FormData();
      const updatedCharacteristics = data.characteristics
        ? data.characteristics.map((character: any, index: any) => ({
            ...character,
            icon: character.icon || dataCharacteristics![index]?.icon,
          }))
        : dataCharacteristics || [];

      if (
        inputNewCharacter.icon ||
        inputNewCharacter.text ||
        inputNewCharacter.quantity
      ) {
        updatedCharacteristics.push({
          ...inputNewCharacter,
          isVisibled: inputNewCharacter.isVisibled,
        });
      }

      updatedCharacteristics.forEach((character: any, index: any) => {
        formData.append(
          `characteristics[${index}][quantity]`,
          character.quantity
        );
        formData.append(`characteristics[${index}][text]`, character.text);
        formData.append(
          `characteristics[${index}][isVisibled]`,
          character.isVisibled
        );

        if (character.icon instanceof File) {
          formData.append(`characterIcon_${index}`, character.icon);
        } else if (typeof character.icon === "string") {
          formData.append(`characteristics[${index}][icon]`, character.icon);
        }
      });

      formData.append(`sectionName`, "characteristics");

      const { response, ok } = await handleUpdateCharacteristics(formData);

      if (ok) {
        toast.success("Se actualizaron las características con éxito");
        setIsLoadingCharacteristics(false);
        setDataCharacteristics(response.data);
        resetInputsAndImage();
      }
    } catch (error) {
      console.error(
        "Ocurrió un error al actualizar las características",
        error
      );
      toast.error("Ocurrió un error al actualizar las características");
      setIsLoadingCharacteristics(false);
    }
  };

  const onDeleteCharacter = async (_id: string) => {
    try {
      const dataFilter = dataCharacteristics?.filter(
        (character) => character._id !== _id
      );

      setDataCharacteristics(dataFilter);
      await onSubmit({ characteristics: dataFilter });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setDataCharacteristics(dataPage.sections?.characteristics);
  }, []);

  useEffect(() => {
    if (dataCharacteristics) {
      setValue("characteristics", dataCharacteristics);
    }
  }, [dataCharacteristics]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Características</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col flex-wrap gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-wrap gap-4">
            {dataCharacteristics.map((character, index) => (
              <div
                className="flex items-center w-64 p-3 mb-4 transition-all duration-300 sjustify-center gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit"
                key={index}
              >
                <div className="flex flex-col gap-x-4 gap-y-2">
                  <div className="relative flex items-center justify-center overflow-hidden h-fit">
                    <label
                      htmlFor={`dropzone-file-characteristics-${index}`}
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineCloudUpload size={40} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Subir icono
                        </p>
                      </div>
                      <input
                        id={`dropzone-file-characteristics-${index}`}
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
                  <div className="flex flex-col gap-y-2">
                    <input
                      type="text"
                      placeholder="Cantidad"
                      defaultValue={character.quantity}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(
                        getFieldName({
                          sectionIndex: index,
                          fieldName: "quantity",
                        }) as any
                      )}
                    />
                    <input
                      type="text"
                      placeholder="Caracteristica"
                      defaultValue={character.text}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(
                        getFieldName({
                          sectionIndex: index,
                          fieldName: "text",
                        }) as any
                      )}
                    />
                    <div className="flex items-center">
                      <input
                        defaultChecked={character.isVisibled}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "isVisibled",
                          }) as any
                        )}
                      />
                      <label
                        htmlFor="checked-checkbox"
                        className="text-gray-900 ms-2"
                      >
                        Visible
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => onDeleteCharacter(character._id!)}
                  >
                    <BsTrash
                      size={20}
                      className="transition-all duration-300 hover:text-red-500"
                    />
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col justify-center p-3 mb-4 transition-all duration-300 gap-y-2 gap-x-8 bg-slate-100 hover:bg-slate-200 w-52">
              <div className="relative flex items-center justify-center w-full overflow-hidden h-fit">
                <label
                  htmlFor={`dropzone-file-new`}
                  className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <AiOutlineCloudUpload size={40} />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      Subir icono
                    </p>
                  </div>
                  <input
                    id={`dropzone-file-new`}
                    type="file"
                    className="hidden"
                    defaultValue={inputNewCharacter.icon}
                    onChange={(e) =>
                      handleFileChangeCharacter(e, dataCharacteristics.length)
                    }
                  />
                </label>

                {imagePreviews[dataCharacteristics.length] && (
                  <div className="absolute object-cover pointer-events-none w-fit h-fit">
                    <img
                      src={imagePreviews[dataCharacteristics.length]}
                      alt="imagePreview"
                      className="w-full h-full bg-white"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <input
                  type="text"
                  placeholder="Cantidad"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={inputNewCharacter.quantity}
                  onChange={(e) =>
                    setInputNewCharacter({
                      ...inputNewCharacter,
                      quantity: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Caracteristica"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={inputNewCharacter.text}
                  onChange={(e) =>
                    setInputNewCharacter({
                      ...inputNewCharacter,
                      text: e.target.value,
                    })
                  }
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-blue-600 border-blue-600 rounded focus:ring-blue-500"
                    checked={inputNewCharacter.isVisibled}
                    onChange={(e) =>
                      setInputNewCharacter({
                        ...inputNewCharacter,
                        isVisibled: e.target.checked,
                      })
                    }
                  />
                  <label
                    htmlFor="checked-checkbox"
                    className="text-gray-900 ms-2"
                  >
                    Visible
                  </label>
                </div>
              </div>
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingCharacteristics}
          >
            {isLoadingCharacteristics ? (
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

export default CharacteristicsC;
