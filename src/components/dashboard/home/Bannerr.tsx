import { useEffect, useState } from "react";
import { DataPageI, Hero } from "../../../interfaces/data";
import { useForm } from "react-hook-form";
import { useDevioz } from "../../../hooks";
import { AiOutlineCloudUpload } from "react-icons/ai";

interface Props {
  dataPage: DataPageI;
  toast: any;
}

const Bannerr = ({ dataPage, toast }: Props) => {
  const { handleUpdateHeros } = useDevioz();
  const [dataBanner, setDataBanner] = useState<Hero[]>([]);
  const { register, handleSubmit, setValue } = useForm<Hero[] | any>();
  const [isLoadingBanners, setIsLoadingBanners] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<any>([] as any);
  const [videoPreview, setVideoPreview] = useState<any>([] as any);

  const handleFileChangeVideo = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const handleReaderLoadEnd = (result: string) => {
      setVideoPreview((prevPreviews: any) => {
        const newPreviews = [...prevPreviews];
        newPreviews[index] = result;
        return newPreviews;
      });

      setValue(
        getFieldName({ sectionIndex: index, fieldName: "video" }) as any,
        file
      );
    };

    const reader = new FileReader();
    reader.onloadend = () => handleReaderLoadEnd(reader.result as string);
    reader.onerror = () => console.error("Error reading the file");
    reader.readAsDataURL(file);
  };

  const handleFileChangeCharacter = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const handleReaderLoadEnd = (result: string) => {
      setImagePreviews((prevPreviews: any) => {
        const newPreviews = [...prevPreviews];
        newPreviews[index] = result;
        return newPreviews;
      });

      setValue(
        getFieldName({ sectionIndex: index, fieldName: "image" }) as any,
        file
      );
    };

    const reader = new FileReader();
    reader.onloadend = () => handleReaderLoadEnd(reader.result as string);
    reader.onerror = () => console.error("Error reading the file");

    reader.readAsDataURL(file);
  };

  const getFieldName = ({
    sectionIndex,
    fieldName,
  }: {
    sectionIndex: number;
    fieldName: string;
  }): string => {
    return `heros[${sectionIndex}].${fieldName}`;
  };

  const onSubmit = async (data: Hero[] | any) => {
    setIsLoadingBanners(true);
    const formData = new FormData();

    const dataFinal = data.heros
      ? data.heros.map((hero: any, index: any) => ({
          ...hero,
          image: hero.image || dataBanner![index]?.image,
          video: hero.video || dataBanner![index]?.video,
        }))
      : dataBanner!;

    dataFinal.forEach((hero: any, index: any) => {
      const { texts, video, image } = hero;

      formData.append(`heros[${index}][texts][text_1]`, texts.text_1);

      for (let i = 2; i <= 3; i++) {
        if (texts[`text_${i}`]) {
          formData.append(
            `heros[${index}][texts][text_${i}]`,
            texts[`text_${i}`]
          );
        }
      }

      formData.append(`heros[${index}][texts][text_button]`, texts.text_button);

      if (video instanceof File) {
        formData.append(`heroVideo_${index}`, video);
      } else if (typeof video === "string") {
        formData.append(`heros[${index}][video]`, video);
      }

      if (image instanceof File) {
        formData.append(`heroImage_${index}`, image);
      } else if (typeof image === "string") {
        formData.append(`heros[${index}][image]`, image);
      }
    });

    try {
      formData.append(`sectionName`, "heros");
      const { response, ok } = await handleUpdateHeros(formData);

      if (ok) {
        toast.success("Se actualizaron los datos con éxito");
        setIsLoadingBanners(false);
        setDataBanner(response.data);
      }
    } catch (error) {
      toast.error("Ocurrió un error al actualizar");
      setIsLoadingBanners(false);
    }
  };

  useEffect(() => {
    setDataBanner(dataPage.sections?.heros);
  }, []);

  useEffect(() => {
    if (dataBanner) {
      setValue("heros", dataBanner);
    }
  }, [dataBanner]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-bold">Heros / Banners</h3>
      <div className="flex flex-col gap-4">
        <form
          className="flex flex-col gap-4"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            {dataBanner.map((hero, index) => (
              <div
                className="flex items-center justify-center w-64 p-3 mb-4 transition-all duration-300 gap-x-8 bg-slate-100 hover:bg-slate-200 h-fit rounded-xl"
                key={index}
              >
                <div className="flex flex-col gap-x-4 gap-y-2">
                  <div className="relative flex items-center justify-center w-48 overflow-hidden h-36">
                    <label
                      htmlFor={`dropzone-file-banners-${index}`}
                      className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <AiOutlineCloudUpload size={40} />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          Subir icono
                        </p>
                      </div>
                      <input
                        id={`dropzone-file-banners-${index}`}
                        type="file"
                        className="hidden"
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "image",
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
                      <div className="absolute object-cover w-48 pointer-events-none h-36">
                        <img
                          src={hero.image}
                          alt="imagePreview"
                          className="w-full h-full bg-white"
                          {...register(
                            getFieldName({
                              sectionIndex: index,
                              fieldName: "image",
                            }) as any
                          )}
                        />
                      </div>
                    )}
                  </div>

                  {hero.texts.text_1 && (
                    <div className="flex flex-col gap-x-4">
                      <input
                        type="text"
                        placeholder="Texto 1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={hero.texts.text_1}
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "texts.text_1",
                          }) as any
                        )}
                      />
                    </div>
                  )}

                  {hero.texts.text_2 && (
                    <div className="flex flex-col gap-x-4">
                      <input
                        type="text"
                        placeholder="Texto 2"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={hero.texts.text_2}
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "texts.text_2",
                          }) as any
                        )}
                      />
                    </div>
                  )}

                  {hero.texts.text_3 && (
                    <div className="flex flex-col gap-x-4">
                      <textarea
                        rows={4}
                        placeholder="Texto 3"
                        className="block p-2.5 w-full max-h-[10rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={hero.texts.text_3}
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "texts.text_3",
                          }) as any
                        )}
                      ></textarea>
                    </div>
                  )}

                  {hero.texts.text_button && (
                    <div className="flex flex-col gap-x-4">
                      <input
                        type="text"
                        placeholder="Texto del boton"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        defaultValue={hero.texts.text_button}
                        {...register(
                          getFieldName({
                            sectionIndex: index,
                            fieldName: "texts.text_button",
                          }) as any
                        )}
                      />
                    </div>
                  )}

                  {index === 0 && (
                    <div className="flex flex-col gap-x-4">
                      <label
                        htmlFor={`dropzone-file-banners-video-${index}`}
                        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-36 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <AiOutlineCloudUpload size={40} />
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            Subir video
                          </p>
                        </div>
                        <input
                          id={`dropzone-file-banners-video-${index}`}
                          type="file"
                          className="hidden"
                          {...register(
                            getFieldName({
                              sectionIndex: index,
                              fieldName: "video",
                            }) as any
                          )}
                          onChange={(e) => handleFileChangeVideo(e, index)}
                        />
                      </label>

                      {(videoPreview[index] || hero.video) && (
                        <div className="absolute object-cover w-48 overflow-hidden pointer-events-none h-36">
                          <video
                            src={videoPreview[index] || hero.video}
                            className="w-full bg-white h-36"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="metadata"
                          ></video>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="px-4 py-2 font-bold text-white transition-all duration-300 bg-blue-500 rounded w-fit hover:bg-blue-700 disabled:bg-gray-400"
            type="submit"
            disabled={isLoadingBanners}
          >
            {isLoadingBanners ? (
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

export default Bannerr;
