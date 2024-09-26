import Fuse from "fuse.js";
import data from "../Data.json";

export const response = (message) => {
  const options = {
    keys: ["question"],
    threshold: 0.3, // Adjust this value for sensitivity
  };

  const fuse = new Fuse(data, options);
  const result = fuse.search(message);

  if (result.length > 0) {
    const match = result[0].item; // Get the best match
    console.log("Response:", match.response);
    return match.response;
  } else {
    console.log("No matching response found.");
    return "Sorry, I am not able to answer this 😢";   
  }
};
