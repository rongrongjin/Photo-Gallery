import axios from "axios";

//Async function to fetch service call when adding a new slide with a random room image
async function getRandomRoom(setFetchImage, fetchImage) {
  try {
    const res = await axios(
      "https://api.unsplash.com/photos/random/?client_id=rukY1OlnlbFNT-7JlrMOiAtXuKY7FVKZ-JMyn7MedbU&query=room&orientation=landscape"
    );
    setFetchImage([...fetchImage, res.data]);
  } catch (error) {
    console.log(error);
  }
}

export default getRandomRoom;
