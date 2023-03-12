import LandingPage from "./Components/LandingPage";
import Carousel from "./Components/Carousel";
import { useState, useEffect } from "react";
import fetchImg from "./Service/fetchImg";

//Default Unsplash Image ID List (show on initial render)
const imageID = ["JIUjvqe2ZHg", "GqbU78bdJFM", "gREquCUXQLI"];

function App() {
  const [fetchImage, setFetchImage] = useState([]); // state use to store api call to retrieve images from unsplash
  const [viewMode, setViewMode] = useState(false); // state use to control current view mode
  const [activeSlide, setActiveSlide] = useState(0); // state use to store the current active slide that the use is on

  // function to change rooms on the landing page
  const roomChangeHandler = () => {
    activeSlide + 1 < fetchImage.length
      ? setActiveSlide(activeSlide + 1)
      : setActiveSlide(0);
  };

  // function to swap between view mode and landing page
  const changeViewMode = () => {
    setViewMode(!viewMode);
  };

  // fetch image from the inital image IDs
  // once promise resolves all fetch calls, return the promise and store it in fetchImage state
  useEffect(() => {
    let imageList = [];
    imageID.map((item) => {
      imageList.push(fetchImg(item));
    });
    console.log(imageList);
    Promise.all(imageList).then((values) => {
      setFetchImage(values);
    });
  }, []);

  return (
    <div>
      {viewMode ? (
        <Carousel
          changeViewMode={changeViewMode}
          fetchImage={fetchImage}
          setFetchImage={setFetchImage}
          setActiveSlide={setActiveSlide}
          activeSlide={activeSlide}
        />
      ) : (
        <LandingPage
          changeViewMode={changeViewMode}
          activeSlide={activeSlide}
          fetchImage={fetchImage}
          roomChangeHandler={roomChangeHandler}
        />
      )}
    </div>
  );
}

export default App;
