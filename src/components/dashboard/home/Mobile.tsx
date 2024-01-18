import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DataPageI, Optimized } from "../../../interfaces/data";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDevioz } from "../../../hooks";

interface Props {
  dataPage: DataPageI;
  toast: any;
}

const Mobile = ({ dataPage, toast }: Props) => {
  const { handleUpdateOptimized } = useDevioz();
  const [dataOptimized, setDataOptimized] = useState<Optimized>();
  const { register, handleSubmit, setValue } = useForm<Optimized | any>();
  const [isLoadingOptimized, setIsLoadingOptimized] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any[]>([]);

  const handleFileChangeMobile = (event: any, index: number) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => {
          const newPreviews = [...prev];
          newPreviews[index] = reader.result;
          return newPreviews;
        });

        const fieldNames = [
          `optimized.img`,
          `optimized.icon_1`,
          `optimized.icon_2`,
        ];
        setValue(fieldNames[index] as any, file);
      };

      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: Optimized | any) => {
    setIsLoadingOptimized(true);
    const formData = new FormData();

    const fields = [
      "img",
      "icon_1",
      "icon_2",
      "title_main",
      "title_1",
      "title_2",
      "text_1",
      "text_2",
    ];

    fields.forEach((field) => {
      const value = data.optimized[field];

      if (value.length === 0) {
        data.optimized[field] = (dataOptimized as any)?.[field];
      }

      formData.append(field, data.optimized[field]);
    });

    try {
      formData.append(`sectionName`, "optimized");
      const { response, ok } = await handleUpdateOptimized(formData);

      if (ok) {
        toast.success("Se actualizaron los datos con éxito");
        setIsLoadingOptimized(false);
        setDataOptimized(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar");
      setIsLoadingOptimized(false);
    }
  };

  useEffect(() => {
    setDataOptimized(dataPage.sections?.optimized);
  }, []);

  useEffect(() => {
    if (dataOptimized) {
      setValue("optimized", dataOptimized);
    }
  }, [dataOptimized]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Mobile Responsive</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 overflow-x-auto">
            <div className="">
              <div className="flex justify-center gap-x-4">
                {/* Imagen */}
                <div className="flex flex-col gap-4 p-3 mb-4 transition-all duration-300 bg-slate-100 hover:bg-slate-200">
                  <div className="relative flex items-center justify-center overflow-hidden h-fit w-[10rem] gap-x-4">
                    <label
                      htmlFor="dropzone-file-mobile-0"
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineCloudUpload size={40} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Subir imagen
                        </p>
                      </div>
                      <input
                        id="dropzone-file-mobile-0"
                        type="file"
                        className="hidden"
                        {...register("optimized.img" as any)}
                        onChange={(e) => handleFileChangeMobile(e, 0)}
                      />
                    </label>

                    {imagePreviews[0] ? (
                      <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                        <img
                          src={imagePreviews[0]}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                        />
                      </div>
                    ) : (
                      <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                        <img
                          src={dataPage.sections.optimized.img}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                          {...register("optimized.img" as any)}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Titulo principal"
                      defaultValue={dataPage.sections.optimized.title_main}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      {...register(`optimized.title_main` as any)}
                    />
                  </div>
                </div>

                {/* Contenido 1 */}
                <div className="flex p-3 mb-4 transition-all duration-300 gap-x-4 bg-slate-100 hover:bg-slate-200">
                  <div className="flex flex-col gap-4">
                    <div className="relative flex items-center justify-center overflow-hidden h-fit w-[10rem]">
                      <label
                        htmlFor={`dropzone-file-mobile-1`}
                        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <AiOutlineCloudUpload size={40} />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Subir icono
                          </p>
                        </div>
                        <input
                          id={`dropzone-file-mobile-1`}
                          type="file"
                          className="hidden"
                          {...register(`optimized.icon_1` as any)}
                          onChange={(e) => handleFileChangeMobile(e, 1)}
                        />
                      </label>

                      {imagePreviews[1] ? (
                        <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                          <img
                            src={imagePreviews[1]}
                            alt="imagePreview"
                            className="w-full h-full bg-white"
                          />
                        </div>
                      ) : (
                        <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                          <img
                            src={dataPage.sections.optimized.icon_1}
                            alt="imagePreview"
                            className="w-full h-full bg-white"
                            {...register(`optimized.icon_1` as any)}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Nombre proyecto"
                        defaultValue={dataPage.sections.optimized.title_1}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...register(`optimized.title_1` as any)}
                      />
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        placeholder="Texto proyecto"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={dataPage.sections.optimized.text_1}
                        {...register(`optimized.text_1` as any)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Contenido 2 */}
                <div className="flex p-3 mb-4 transition-all duration-300 gap-x-4 bg-slate-100 hover:bg-slate-200">
                  <div className="flex flex-col gap-4">
                    <div className="relative flex items-center justify-center overflow-hidden h-fit w-[10rem]">
                      <label
                        htmlFor={`dropzone-file-mobile-2`}
                        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <AiOutlineCloudUpload size={40} />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Subir icono
                          </p>
                        </div>
                        <input
                          id={`dropzone-file-mobile-2`}
                          type="file"
                          className="hidden"
                          {...register(`optimized.icon_2` as any)}
                          onChange={(e) => handleFileChangeMobile(e, 2)}
                        />
                      </label>

                      {imagePreviews[2] ? (
                        <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                          <img
                            src={imagePreviews[2]}
                            alt="imagePreview"
                            className="w-full h-full bg-white"
                          />
                        </div>
                      ) : (
                        <div className="absolute object-cover pointer-events-none w-max-60 h-max-60">
                          <img
                            src={dataPage.sections.optimized.icon_2}
                            alt="imagePreview"
                            className="w-full h-full bg-white"
                            {...register(`optimized.icon_2` as any)}
                          />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Nombre proyecto"
                        defaultValue={dataPage.sections.optimized.title_2}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...register(`optimized.title_2` as any)}
                      />
                    </div>
                    <div>
                      <textarea
                        rows={4}
                        placeholder="Texto proyecto"
                        defaultValue={dataPage.sections.optimized.text_2}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        {...register(`optimized.text_2` as any)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-400 w-fit"
            type="submit"
            disabled={isLoadingOptimized}
          >
            {isLoadingOptimized ? (
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

export default Mobile;
