import { useState, useRef } from 'react';
import './custom.css'; // Create a separate CSS file for styling

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [customUrl,setCustomUrl] = useState('');
  const reference = useRef(null);

  const url = `https://trimly-1-1.onrender.com/my`
  const generate = () => {
    fetch("https://trimly-1-1.onrender.com", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ redirectUrl: originalUrl })
    })
      .then((res) => res.json())
      .then((res) => {
        let shortId = res.shortId;
        shortId = `${url}/${shortId}`;
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
        <h1>CUSTOM URL</h1>
        <div className="input-section">
          <input 
            type="text" 
            placeholder='Custom URL'
            value={customUrl}
            onChange={(e) => setCustomUrl(e.target.value)}
            className='inputs'
          />
          <input
            type="text"
            placeholder='Original URL'
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className='inputs'
          />
          <button onClick={generate} className='btn inputs'>Generate</button>
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
