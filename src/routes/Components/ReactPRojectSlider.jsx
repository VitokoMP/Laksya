import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ReactProjectsSlider = () => {
  return (
    <div className="w-full h-screen">

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
        className="mySwiper"
      >
        
        <SwiperSlide>
          <div className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/img/andrea/mandala1.jpg')` }}>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Mandalas</h2>
          </div>
        </SwiperSlide> 

        <SwiperSlide>
          <div className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/img/andrea/mandala2.jpg')` }}>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Geometría Sagrada</h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/img/andrea/mandala3.jpg')` }}>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Murales</h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/img/andrea/geo1.jpg')` }}>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Flor de la Vida</h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/img/andrea/geo2.jpg')` }}>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Metatrón</h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="w-full h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: `url('/img/andrea/mural1.jpg')` }}>
            <h2 className="text-5xl font-bold text-white" style={{ fontFamily: "'Cormorant Garamond', serif", textShadow: '2px 2px 10px rgba(0,0,0,0.5)' }}>Arte en Espacios</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ReactProjectsSlider;
