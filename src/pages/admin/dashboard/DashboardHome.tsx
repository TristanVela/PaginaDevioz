import { ring } from "ldrs";
import { ToastContainer, toast } from "react-toastify";

import { useDevioz } from "../../../hooks";
import Sidebar from "../../../components/Sidebar";
import Plains from "../../../components/dashboard/home/Plains";
import CharacteristicsC from "../../../components/dashboard/home/Characteristics";
import Technical from "../../../components/dashboard/home/Technical";
import Bannerr from "../../../components/dashboard/home/Bannerr";
import Projects from "../../../components/dashboard/home/Projects";
import BannerInfo from "../../../components/dashboard/home/BannerInfo";
import Mobile from "../../../components/dashboard/home/Mobile";

ring.register();

const DashboardHome = () => {
  const { dataPage } = useDevioz();

  return (
    <>
      <Sidebar />
      <div className="p-4 mt-8 md:ml-64 md:mt-0">
        <div className="p-4 border-gray-200 rounded-lg">
          <div className="flex flex-col gap-y-16">
            <Bannerr dataPage={dataPage} toast={toast} />
            <BannerInfo dataPage={dataPage} toast={toast} />
            <CharacteristicsC dataPage={dataPage} toast={toast} />
            <Technical dataPage={dataPage} toast={toast} />
            <Projects dataPage={dataPage} toast={toast} />
            <Mobile dataPage={dataPage} toast={toast} />
            <Plains dataPage={dataPage} toast={toast} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default DashboardHome;
