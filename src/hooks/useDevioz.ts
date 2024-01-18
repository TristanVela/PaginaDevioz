import { deviozAPI } from "../api/deviozAPI";
import { isAxiosError, AxiosError } from "axios";
import { DataPageI } from "../interfaces/data";
import { dataPageAtom } from "../store/dataPage";
import { useAtom } from "jotai";

interface ResponseI {
  response?: string;
  data?: DataPageI;
  ok: boolean;
}

const useDevioz = () => {
  const [dataPage, setDataPage] = useAtom(dataPageAtom);

  const handleGetData = async (): Promise<ResponseI> => {
    try {
      const response = await deviozAPI.get<DataPageI>("/api/data-page");

      if (response.status !== 200) {
        throw new Error("Error al momento de traer los datos");
      }

      const data = response.data;
      setDataPage(data);
      return { data: data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateDataSectionWithImage = async (data: FormData) => {
    try {
      const response = await deviozAPI.put(
        `/api/data-page/update-with-image`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataPage({
        sections: {
          ...dataPage.sections,
          [data.get("sectionName") as string]:
            response.data.data.sections.navbar,
        },
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateDataSection = async (data: any) => {
    try {
      const response = await deviozAPI.put(`/api/data-page/update`, data);

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleManagmentError = (error: AxiosError | Error) => {
    if (isAxiosError(error)) {
      return { response: error.response?.data, ok: false };
    }

    if (error instanceof Error) {
      return { response: error.message, ok: false };
    } else {
      return { response: "Error de inicio de sesión", ok: false };
    }
  };

  const handleUpdateCharacteristics = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/data-page/update-characteristics`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateTechnicals = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/data-page/update-technicals`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateProjects = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/data-page/update-projects`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateHeros = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/data-page/update-heros`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      setDataPage({
        sections: {
          ...dataPage.sections,
          heros: response.data,
        },
      });
      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleUpdateOptimized = async (data: any) => {
    try {
      const response = await deviozAPI.put(
        `/api/data-page/update-optimized`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("Error al momento de actualizar los datos");
      }

      return { response: response.data, ok: true };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    dataPage,
    setDataPage,
    handleGetData,
    handleUpdateDataSectionWithImage,
    handleUpdateDataSection,
    handleUpdateCharacteristics,
    handleUpdateTechnicals,
    handleUpdateHeros,
    handleUpdateProjects,
    handleUpdateOptimized,
  };
};

export default useDevioz;
