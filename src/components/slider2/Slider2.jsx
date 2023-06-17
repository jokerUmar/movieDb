import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./slider2.css";
import { Pagination, Navigation } from "swiper";

export default function Slider2({ movieInfo }) {
  const [youTubeBox, setYouTubeBox] = useState([]);

  useEffect(() => {
    if (movieInfo?.data?.videos.results.length > 0) {
      setYouTubeBox(movieInfo?.data?.videos.results.slice(1, 5));
    }
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {youTubeBox &&
          youTubeBox.map((e) => {
            return (
              <SwiperSlide key={e.key}>
                <iframe
                  src={"https://www.youtube.com/embed/" + e.key}
                  frameborder="0"
                  style={{
                    width: "70%",
                    height: "90%",
                  }}
                ></iframe>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
