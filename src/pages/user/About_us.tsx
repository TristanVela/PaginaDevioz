import {
  Navbar,
  Banner_hero,
  CardInfo,
  CardInfoPersonal,
} from "../../components";
import { useDevioz } from "../../hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./About_us.module.css";

export default function About_us() {
 // const { dataPage } = useDevioz();

 /* if (!dataPage) {
    return (
    <div className="flex items-center justify-center w-screen h-screen bg-[#070f26] flex-col gap-y-10">
      <img src="/images/Logo.webp" alt="Logo" className="w-64 h-32" /> 
        <l-ring
          size="50"
          stroke="5"
          bg-opacity="0"
          speed="2"
          color="white"
        ></l-ring>
      </div>
    );
  }*/

 return (
    <section className="flex flex-col gap-y-20">
      <div>
      {/*<Navbar data={dataPage.sections.navbar} />
        <Banner_hero data={dataPage.sections.heros} />{" "}*/}
        {/* POR EL MOMENTOS - DEBERIA HABER UNA SECCION ABOUT US */}
      </div>

      <section className="flex flex-row items-center justify-center gap-x-10">
        <CardInfo /> {/* data={dataPage.sections.cards} */} {/* MISION */}
        <CardInfo /> {/* data={dataPage.sections.cards} */} {/* VISION */}
        <CardInfo /> {/* data={dataPage.sections.cards} */} {/* VALORES */}
      </section>

      <div className="flex flex-col gap-y-6">
        <h5 className="text-[#070f26] relative text-4xl font-bold text-center">
          Representantes
        </h5>
        <div className="flex items-center justify-center gap-x-10">
          <CardInfoPersonal /> {/* data={dataPage.sections.cardPersonalInfo} */}
          <CardInfoPersonal /> {/* data={dataPage.sections.cardPersonalInfo} */}
          <CardInfoPersonal /> {/* data={dataPage.sections.cardPersonalInfo} */}
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <h5 className="text-[#070f26] relative text-4xl font-bold text-center">
          Nuestros Clientes
        </h5>
        <div>
          <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            navigation
            // onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
            className="swiper-container swiper-wrapper bg-brighness-50 bg-[#121212]"
          >
            <SwiperSlide className={`${styles.swiper_slide_custom}`}>
              <img src="/images/Logo.webp" alt="Logo" className="w-auto" />
            </SwiperSlide>
            <SwiperSlide className={`${styles.swiper_slide_custom}`}>
              <img src="/images/Logo.webp" alt="Logo" className="w-auto" />
            </SwiperSlide>
            <SwiperSlide className={`${styles.swiper_slide_custom}`}>
              <img src="/images/Logo.webp" alt="Logo" className="w-auto" />
            </SwiperSlide>
            <SwiperSlide className={`${styles.swiper_slide_custom}`}>
              <img src="/images/Logo.webp" alt="Logo" className="w-auto" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
