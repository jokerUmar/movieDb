import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import { NavLink } from "react-router-dom";

 function SimpleSlider({ genreList }) {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 580,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 440,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <Slider {...settings}>
      {genreList.length > 0
        && genreList.map((element) => {
            return (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "active__genre slider_el"
                    : "unActive__genre slider_el"
                }
                to={`MoviesByType/Genres/` + element.id}
                key={element.id}
              >
                <h3 key={element.id} className="slider_text">
                  {element.name}
                </h3>
              </NavLink>
            );
          })
        }
    </Slider>
  );
}

export default memo(SimpleSlider);