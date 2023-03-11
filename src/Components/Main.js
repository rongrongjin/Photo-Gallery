import React from "react";
import "./main.css";
import { SignOut, Eye, Swap, ShareNetwork } from "@phosphor-icons/react";

const Main = (props) => {
  return (
    <div
      className="mainContainer"
      style={{
        height: "100vh",
        width: "100vw",
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
        <button className="button" onClick={props.roomChangeHandler}>
          <Swap size={20} />
          Change Room
        </button>
        <button className="button" onClick={props.onShowCarou}>
          <Eye size={20} />
          Views
        </button>
        <button className="button">
          <ShareNetwork size={20} />
          Share
        </button>
      </div>
    </div>
  );
};

export default Main;
