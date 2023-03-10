import React from "react";
import "./carousel.css";
import { Check } from "@phosphor-icons/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Carousel = (props) => {
  return (
    <div className="bkgContainer">
      <div className="btnContainer">
        <button className="btn" onClick={props.onClose}>
          <Check size={20} />
          Done
        </button>
      </div>

      <div
        className="mainContainer mainContainerCarousel"
        style={{
          // backgroundImage: `url(${"https://source.unsplash.com/JIUjvqe2ZHg"})`,
          zIndex: "-2",
        }}
      >
        <Splide
          aria-label="My Favorite Images"
          options={{
            perPage:1,
            rewind: true,
            width: 4000,
            gap: "1rem",
          }}
        >
          <SplideSlide>
            <img src="https://source.unsplash.com/JIUjvqe2ZHg" alt="Image 1" />
          </SplideSlide>
          <SplideSlide>
            <img src="https://source.unsplash.com/JIUjvqe2ZHg" alt="Image 2" />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
};

export default Carousel;
