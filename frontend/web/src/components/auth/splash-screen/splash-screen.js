import React from "react";
import { useNavigate } from "react-router-dom";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./splash-screen.scss";
import LoginScreen1 from "../../../assets/login-splash-1.webp";
import LoginScreen2 from "../../../assets/login-splash-2.jpeg";
import LoginScreen3 from "../../../assets/login-splash-3.jpeg";
import Logo from "../../../assets/logo.svg";

const LoginSplash = ({getStarted}) => {
  const navigate = useNavigate();
  return (
    <div className="LoginSplash">
      <div className="logo">
   <img src={Logo} alt="" />
      </div>
      <div className="splash-container">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          <SwiperSlide>
            <div className="slide-image">
              <img src={LoginScreen1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image">
              <img src={LoginScreen2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide-image">
              <img src={LoginScreen3} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="get-started" onClick={e=>getStarted()}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSplash;
