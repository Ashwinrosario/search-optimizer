import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search node_modules..."
      value={query}
      onChange={(e) => { setQuery(e.target.value) }}
      style={{
        width: "60%",
        padding: "10px",
        fontSize: "16px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    />
  );
};

export default SearchBar;
