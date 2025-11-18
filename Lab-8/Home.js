import React, { useState } from "react";

function Home() {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleShorten = () => {
    if(longUrl && shortCode){
      setShortUrl(`https://cpt405.co/${shortCode}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Link Shrinker</h2>
      <div>
        <label>Long URL:</label>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          style={{ marginLeft: "10px", width: "400px" }}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>Enter short code:</label>
        <input
          type="text"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>
      <button onClick={handleShorten} style={{ marginTop: "10px", backgroundColor: "blue", color: "white" }}>
        Shorten
      </button>

      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <label>Short URL</label>
          <div>{shortUrl}</div>
        </div>
      )}
    </div>
  );
}

export default Home;
