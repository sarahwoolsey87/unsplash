import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [img, setImg] = useState(
    "https://images.unsplash.com/photo-1524024973431-2ad916746881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAyODd8MHwxfHNlYXJjaHwxfHxnb2F0fGVufDB8fHx8MTY5MDM2OTIyNHww&ixlib=rb-4.0.3&q=80&w=1080"
  );

  function handleSearch(event) {
    setSearchQuery(event.target.value);
  }

  async function getImage() {
    try {
      const API = `http://localhost:8090/photos?subject=${searchQuery}`;
      const res = await axios.get(API);
      if (res.data.length > 0) {
        setImg(res.data[0].img_url);
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
      {img && <img src={img} alt={searchQuery} />}
    </div>
  );
}

export default App;
