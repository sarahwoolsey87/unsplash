import { useState } from "react";
import "./App.css";
import axios from "axios";

const unsplashAccessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [img, setImg] = useState([]);

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  async function getImage() {
    try {
      const API = `https://api.unsplash.com/search/photos/?client_id=${unsplashAccessKey}&query=${encodeURIComponent(
        searchQuery
      )}`;
      const res = await axios.get(API);
      if (res.data.results.length > 0) {
        setImg(res.data.results);
      } else {
        console.log("No images found for the search query.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <h1>Find any image</h1>
      <input type="text" placeholder="enter image subject" onChange={handleSearch} />
      <button onClick={getImage}>Explore!</button>
      {img && img.length > 0 ? (
        <div>
          {img.map((photo) => (
            <img key={photo.id} src={photo.urls.small} alt={photo.alt_description} />
          ))}
        </div>
      ) : (
        img === null ? <p>Enter a search query and click "Explore" to find images.</p> : <p>No images found for the search query.</p>
      )}
    </div>
  );
}

export default App;
