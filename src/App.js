import Main from "./Components/Main";
import Carousel from "./Components/Carousel";
import { useState, useEffect } from "react";
import axios from "axios";

const imageID = ["JIUjvqe2ZHg", "GqbU78bdJFM", "gREquCUXQLI"];
function App() {
  const [fetchImage, setFetchImage] = useState([]);
  const [carouIsShown, setCarouIsShown] = useState(false);

  const showCarouHandler = () => {
    setCarouIsShown(true);
  };

  const hideCarouHandler = () => {
    setCarouIsShown(false);
  };

  // const [photo, setPhoto] = useState([
  //   {
  //     id: "JIUjvqe2ZHg",
  //     name: "Bedroom",
  //     floor: "Dark forest hardwood",
  //     wall: "Pearl whilte",
  //   },
  //   { id: "GqbU78bdJFM", name: "Living room" },
  // ]);

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

  useEffect(() => {
    console.log("here is fetchimage", fetchImage);
  }, [fetchImage]);
  return (
    <div>
      {carouIsShown ? (
        <Carousel onClose={hideCarouHandler} onResponse={fetchImage} />
      ) : (
        <Main onShowCarou={showCarouHandler} onResponse={fetchImage} />
      )}
    </div>
  );
}

export default App;
