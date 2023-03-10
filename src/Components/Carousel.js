import React from "react";
import "./carousel.css";
import { Check, PlusSquare } from "@phosphor-icons/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
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

      <div className="mainContainer mainContainerCarousel">
        <Splide
          hasTrack={false}
          aria-label="My Favorite Images"
          className="splideposition"
          options={{
            // width: 1800,
            // gap: "1rem",
            // perPage: 1,
            // focus: "center",
            // type: "loop",
            padding: "20%",
            width: "100vw",
          }}
        >
          <SplideTrack>
            <SplideSlide>
              <img
                className="splideImg"
                // src={props.onResponse.urls}
                src="https://source.unsplash.com/JIUjvqe2ZHg"
                // alt={props.onResponse.urls[0]}
                alt="Image 2"
              />

              <div>
                <span>Hello</span>
                <button>test</button>
              </div>
            </SplideSlide>

            <SplideSlide>
              <img
                className="splideImg"
                // src={props.onResponse[1].urls}
                src="https://source.unsplash.com/GqbU78bdJFM"
                alt="Image 2"
              />
            </SplideSlide>

            <SplideSlide>
              <img
                className="splideImg"
                // src={props.onResponse.urls}
                src="https://source.unsplash.com/gREquCUXQLI"
                alt="Image 2"
              />
            </SplideSlide>
            <button className="add">
              <PlusSquare size={60} />
            </button>
          </SplideTrack>
        </Splide>
      </div>
    </div>
    // </div>
  );
};

export default Carousel;
