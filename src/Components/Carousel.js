import React from "react";
import "./carousel.css";
import {
  Check,
  PlusSquare,
  ShareNetwork,
  Heart,
  CopySimple,
} from "@phosphor-icons/react";
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
            {props.fetchImage.map((item, index) => {
              console.log(item.urls);

              return (
                <SplideSlide key={index}>
                  <img
                    className="splideImg"
                    src={item.urls.regular}
                    // src="https://source.unsplash.com/JIUjvqe2ZHg"
                    alt={item.urls.alt_description}
                  />

                  <div className="photoInfo">
                    <div className="partOne">
                      <div> {item.alt_description}</div>
                      <div className="partOneSubOne">
                        <div className="partOneSubTwo">
                          Room - {item.tags_preview[1].title}
                        </div>
                        <div>Detail - {item.tags_preview[2].title}</div>
                      </div>
                    </div>
                    <div className="partTwo">
                      <button>
                        <ShareNetwork size={20} /> SHARE
                      </button>
                      <button>
                        <Heart size={20} />
                        FAVOURITE
                      </button>
                      <button
                        onClick={() => {
                          let newFetchedImage = [
                            ...props.fetchImage.slice(0, index + 1),
                            item,
                            ...props.fetchImage.slice(index + 1),
                          ];
                          props.setFetchImage(newFetchedImage);
                        }}
                      >
                        <CopySimple size={20} />
                        DUPLICATE
                      </button>
                    </div>
                  </div>
                </SplideSlide>
              );
            })}
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
