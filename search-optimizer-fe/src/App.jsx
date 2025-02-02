import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";

const API_URL = 'http://localhost:8000';

function App() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cancelTokenRef = useRef(null);

  const handleSearch = useCallback(
    async (query) => {

      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Operation canceled due to a new request");
      }

      cancelTokenRef.current = axios.CancelToken.source();

      setLoading(true);
      setError(null);
      
      if (query.trim() === "") {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/search`, {
          params: { query },
          cancelToken: cancelTokenRef.current.token,
        });

        setResults(response.data.files);
      } catch (err) {
        console.error('error occured: ', err);
        if (axios.isCancel(err)) {
          console.log("Request canceled:", err.message);
        } else {
          setError("Error fetching data");
          console.error("Error:", err);
        }
      } finally {
        setLoading(false);
      }
    },[]
  );

  return (
    <div style={{ padding: "1%" }}>
      <div style={{ marginTop: "3rem", textAlign: "left" }}>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {results && results.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
