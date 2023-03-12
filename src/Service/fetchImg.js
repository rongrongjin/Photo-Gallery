import axios from "axios";

//async function to handle service call
//client id will be deleted after 7 days
async function fetchImg(id) {
  try {
    const res = await axios(
      `https://api.unsplash.com/photos/${id}?client_id=rukY1OlnlbFNT-7JlrMOiAtXuKY7FVKZ-JMyn7MedbU`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export default fetchImg;
