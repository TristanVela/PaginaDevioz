import { HeroHeader } from "../../../interfaces/data";
import styles from "./Banner_hero.module.css";

interface dataHeroHeaderI {
  data: HeroHeader[];
}

export default function Banner_hero({ data }: dataHeroHeaderI) {
  return (
    <>
      <div
        className={`${styles.bg_headerAbout} flex justify-center items-center !h-[75vh] md:!h-[75vh] lg:!h-[40vh] xl:h-[30vh] 2xl:h-[60vh]`}
        style={{
          backgroundImage: `url('${data[0]?.image}')`,
        }}
      ></div>
      <div
        className={
          "text-center items-center h-full px-2 pt-40 pb-40 sm:px-10 w-[100%] cus:w-full sm:w-[80%] md:w-[75%]"
        }
      >
        <h5 className="text-[#ffffff] text-[3.5rem] lg:text-center text-center font-bold">
          NOSOTROS {/* TEXT - ABOUT US  data[0].texts.text_1 */}
        </h5>
      </div>
    </>
  );
}
