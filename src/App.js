import Main from "./Components/Main";
import Carousel from "./Components/Carousel";
import { useState } from "react";

function App() {
  const [carouIsShown, setCarouIsShown] = useState(false);

  const showCarouHandler = () => {
    setCarouIsShown(true);
  };

  const hideCarouHandler = () => {
    setCarouIsShown(false);
  };
  return (
    <div>
      {carouIsShown ? (
        <Carousel onClose={hideCarouHandler} />
      ) : (
        <Main onShowCarou={showCarouHandler} />
      )}
    </div>
  );
}

export default App;
