import Main from "./Components/Main";
import Carousel from "./Components/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

const imageID = ["JIUjvqe2ZHg", "GqbU78bdJFM", "gREquCUXQLI"];
function App() {
  const [fetchImage, setFetchImage] = useState([]);
  const [carouIsShown, setCarouIsShown] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const roomChangeHandler = () => {
    activeSlide + 1 < fetchImage.length
      ? setActiveSlide(activeSlide + 1)
      : setActiveSlide(0);
  };

  const showCarouHandler = () => {
    setCarouIsShown(true);
  };

  const hideCarouHandler = () => {
    setCarouIsShown(false);
  };

  async function test(id) {
    try {
      const res = await axios(
        `https://api.unsplash.com/photos/${id}?client_id=rukY1OlnlbFNT-7JlrMOiAtXuKY7FVKZ-JMyn7MedbU`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let imageList = [];
    imageID.map((item) => {
      imageList.push(test(item));
    });
    console.log(imageList);
    Promise.all(imageList).then((values) => {
      setFetchImage(values);
    });
  }, []);

  return (
    <div>
      {carouIsShown ? (
        <Carousel
          onClose={hideCarouHandler}
          fetchImage={fetchImage}
          setFetchImage={setFetchImage}
          setActiveSlide={setActiveSlide}
        />
      ) : (
        <Main
          onShowCarou={showCarouHandler}
          activeSlide={activeSlide}
          fetchImage={fetchImage}
          roomChangeHandler={roomChangeHandler}
        />
      )}
    </div>
  );
}

export default App;
