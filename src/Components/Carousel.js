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
import getRandomRoom from "../Service/randomRoom";

// animation properties for slide addition,deletion, and duplication
const newSlideEntryAnimation = [{ opacity: "0" }, { opacity: "1" }];
const newSlideExitAnimation = [{ opacity: "1" }, { opacity: "0" }];
const newSlideEntryAndExitAnimationTiming = {
  duration: 1000,
  iterations: 1,
};

const Carousel = (props) => {
  const [onDrag, setOnDrag] = useState(""); //state for storing the current index of slide that is being dragged

  //supporting state to identify if the addition, duplication or deletion button is clicked, used for animation purpose
  const [addOnClick, setAddOnClick] = useState(false);
  const [addOnDuplicate, setAddOnDuplicate] = useState(false);
  const [deleteOnClick, setDeleteOnClick] = useState(false);

  // when fetchImage state changes, check condition on which button is pressed and play animation accordingly
  useEffect(() => {
    if (addOnClick) {
      let newSlide = document.querySelector(
        `#slideImage${props.fetchImage.length - 1}`
      );
      newSlide.animate(
        newSlideEntryAnimation,
        newSlideEntryAndExitAnimationTiming
      );
    }
    if (addOnDuplicate) {
      let newSlide = document.querySelector(
        `#slideImage${props.activeSlide + 1}`
      );
      newSlide.animate(
        newSlideEntryAnimation,
        newSlideEntryAndExitAnimationTiming
      );
    }

    setAddOnDuplicate(false);
    setAddOnClick(false);
  }, [props.fetchImage]);

  // use different set of animation properties for deletion
  useEffect(() => {
    if (deleteOnClick) {
      let newSlide = document.querySelector(`#slideImage${props.activeSlide}`);
      newSlide.animate(
        newSlideExitAnimation,
        newSlideEntryAndExitAnimationTiming
      );
    }
    setDeleteOnClick(false);
  }, [deleteOnClick]);

  //Use to detect tablet view
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 1200px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 1200px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    // parent carousel container
    <div
      className="carouselViewContainer"
      // for removing the blur of images and the grabbing cursor when user move the cursor out of the slide
      onMouseUp={(e) => {
        setOnDrag("");
        e.currentTarget.classList.add("splideImgGrab");
        e.currentTarget.classList.remove("splideImgGrabbing");
      }}
    >
      {/* Done button */}
      <div className="btnContainer">
        <button className="btn" onClick={props.changeViewMode}>
          <Check size={20} />
          Done
        </button>
      </div>

      {/* Carousel Container */}
      <div className="mainContainerCarousel">
        <Splide
          hasTrack={false}
          aria-label="My Favorite Images"
          className="splidePosition"
          options={{
            pagination: false,
            perPage: 1,
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
                  {/* Adding blur effect on images not selected */}
                  <img
                    id={`slideImage${index}`}
                    className={
                      onDrag === index || onDrag === ""
                        ? "splideImg splideImgGrab"
                        : "splideImgBlur splideImg splideImgGrab"
                    }
                    src={item.urls.regular}
                    alt={item.urls.alt_description}
                    // for applying blur effect and grabbing cursor when user select a slide
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
                  />

                  {/* if window size is in tablet version, remove photo descriptions and buttons */}
                  {matches && (
                    <div className="photoNavigationContainer">
                      <div className="photoDescription">
                        <div> {item.alt_description}</div>
                        <div className="photoDescriptionTop">
                          <div className="photoDescriptionBot">
                            Room - {item.tags_preview[1].title}
                          </div>
                          <div>Detail - {item.tags_preview[2].title}</div>
                        </div>
                      </div>
                      <div className="photoButtons">
                        {props.fetchImage.length > 1 && (
                          <button
                            style={{ color: "red" }}
                            onClick={() => {
                              setDeleteOnClick(true);
                              setTimeout(() => {
                                let arr = [
                                  ...props.fetchImage.slice(0, index),
                                  ...props.fetchImage.slice(index + 1),
                                ];
                                props.setFetchImage(arr);
                              }, 1000);
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
                            setAddOnDuplicate(true);
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
                getRandomRoom(props.setFetchImage, props.fetchImage);
                setAddOnClick(true);
              }}
            >
              <PlusSquare size={60} />
            </button>
          </SplideTrack>
        </Splide>
      </div>
    </div>
  );
};

export default Carousel;
