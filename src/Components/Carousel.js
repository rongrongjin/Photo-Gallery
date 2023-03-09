import React from "react";
import "./carousel.css";
import { Check } from "@phosphor-icons/react";

const Carousel = (props) => {
  return (
    <div className="bkgContainer">
      <div className="btnContainer">
        <button className="btn" onClick={props.onClose}>
          <Check size={20} />
          Done
        </button>
      </div>
    </div>
  );
};

export default Carousel;
