import { useState, useRef } from 'react';
import './custom.css'; // Create a separate CSS file for styling

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const reference = useRef(null);

  const url = `http://localhost:8000/my/`
  const generate = () => {
    fetch("http://localhost:8000", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ redirectUrl: originalUrl })
    })
      .then((res) => res.json())
      .then((res) => {
        let shortId = res.shortId;
        shortId = `${url}${shortId}`;
        setShortUrl(shortId);
      });
  }

  const copyPass = () => {
    reference.current?.select();
    window.navigator.clipboard.writeText(shortUrl);
  }

  return (
    <div className="container">
      <div className="content">
        <h1>URL Shortener</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder='Original URL'
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
          />
          <button onClick={generate}>Generate</button>
        </div>
        <div className="output-section">
          <input
            type="text"
            readOnly
            value={shortUrl}
            ref={reference}
          />
          <button onClick={copyPass}>Copy</button>
        </div>
      </div>
    </div>
  );
}

export default App;
