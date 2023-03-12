import React, { useState, useEffect } from "react";
import "./carousel.css";
import {
  Check,
  PlusSquare,
  ShareNetwork,
  Heart,
  CopySimple,
  Trash,
} from "@phosphor-icons/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";

const newSlideEntryAnimation = [{ opacity: "0" }, { opacity: "1" }];
const newSlideEntryAnimationTiming = {
  duration: 1000,
  iterations: 1,
};

const Carousel = (props) => {
  const [onDrag, setOnDrag] = useState("");
  const [addOnClick, setAddOnClick] = useState(false);
  useEffect(() => {
    if (addOnClick) {
      let newSlide = document.querySelector(
        `#slideImage${props.fetchImage.length - 1}`
      );
      newSlide.animate(newSlideEntryAnimation, newSlideEntryAnimationTiming);
    }
    setAddOnClick(false);
  }, [props.fetchImage]);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1200px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1200px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  async function getRandomRoom() {
    try {
      const res = await axios(
        "https://api.unsplash.com/photos/random/?client_id=rukY1OlnlbFNT-7JlrMOiAtXuKY7FVKZ-JMyn7MedbU&query=room&orientation=landscape"
      );

      console.log(res.data);
      props.setFetchImage([...props.fetchImage, res.data]);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div
      className="bkgContainer"
      onMouseUp={(e) => {
        setOnDrag("");
        e.currentTarget.classList.add("splideImgGrab");
        e.currentTarget.classList.remove("splideImgGrabbing");
      }}
    >
      <div className="btnContainer">
        <button className="btn" onClick={props.onClose}>
          <Check size={20} />
          Done
        </button>
      </div>

      <div className="mainContainerCarousel">
        <Splide
          hasTrack={false}
          aria-label="My Favorite Images"
          className="splideposition"
          options={{
            // width: 1800,
            // gap: "1rem",
            perPage: 1,
            // focus: "center",
            // type: "loop",
            // start: `${props.activeSlide}`,
            padding: "20%",
            width: "100vw",
            classes: {
              pagination: "splide__pagination customPagination",
            },
          }}
          onActive={(slide) => {
            props.setActiveSlide(slide.index);
          }}
        >
          <SplideTrack>
            {props.fetchImage.map((item, index) => {
              console.log(item.urls);

              return (
                <SplideSlide key={index}>
                  <img
                    id={`slideImage${index}`}
                    className={
                      onDrag === index || onDrag === ""
                        ? "splideImg splideImgGrab"
                        : "splideImgBlur splideImg splideImgGrab"
                    }
                    src={item.urls.regular}
                    alt={item.urls.alt_description}
                    onMouseDown={(e) => {
                      setOnDrag(index);
                      e.currentTarget.classList.remove("splideImgGrab");
                      e.currentTarget.classList.add("splideImgGrabbing");
                    }}
                    onMouseUp={(e) => {
                      setOnDrag("");
                      e.currentTarget.classList.add("splideImgGrab");
                      e.currentTarget.classList.remove("splideImgGrabbing");
                    }}
                    // draggable={true}
                  />

                  {matches && (
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
                        {props.fetchImage.length > 1 && (
                          <button
                            style={{ color: "red" }}
                            onClick={() => {
                              let arr = [
                                ...props.fetchImage.slice(0, index),
                                ...props.fetchImage.slice(index + 1),
                              ];
                              props.setFetchImage(arr);
                            }}
                          >
                            <Trash size={20} /> DELETE
                          </button>
                        )}
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
                  )}
                </SplideSlide>
              );
            })}
            <button
              className="add"
              onClick={() => {
                getRandomRoom();
                setAddOnClick(true);
              }}
            >
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
