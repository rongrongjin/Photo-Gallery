import React from "react";
import "./landingPage.css";
import { SignOut, Eye, Swap, ShareNetwork } from "@phosphor-icons/react";

const LandingPage = (props) => {
  return (
    <div className="landingPageBackground">
      <div
        className="landingPageContainer landingPageContainerZoomAnimation"
        id="landingPageContainerButtonContainer"
        style={{
          backgroundImage: `url(${
            props.fetchImage[props.activeSlide]?.urls.regular
          })`,
        }}
      >
        <div className="buttonContainer">
          <button className="button">
            <SignOut size={20} />
            Exit
          </button>
          <button
            className="button"
            onClick={(e) => {
              props.roomChangeHandler();
              let grandParentContainer = document.querySelector(
                "#landingPageContainerButtonContainer"
              );
              grandParentContainer.classList.add(
                "landingPageContainerTransition"
              );
              grandParentContainer.classList.remove(
                "landingPageContainerZoomAnimation"
              );
              setTimeout(() => {
                grandParentContainer.classList.remove(
                  "landingPageContainerTransition"
                );
              }, 1500);
            }}
          >
            <Swap size={20} />
            Change Room
          </button>
          <button className="button" onClick={props.changeViewMode}>
            <Eye size={20} />
            Views
          </button>
          <button className="button">
            <ShareNetwork size={20} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
