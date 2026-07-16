import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
 const navigate=useNavigate();
  
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        fetchResults();
      } else {
        setResults([]);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/search?q=${query}`
      );
      setResults(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="searchbox">
    
      <input
        type="text"
        
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
       
      />

      {results.length > 0 && (
        <div style={{
          position: "absolute",
          top: "40px",
          width: "100%",
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          maxHeight: "200px",
          overflowY: "auto"
        }}>
{results.map((item) => (
  <div
    key={item._id}
    style={{
      padding: "10px",
      borderBottom: "1px solid #eee",
      cursor: "pointer"
    }}
    onClick={() => {
      navigate(`/category/women1/${item._id}`); // ✅ redirect
      setQuery("");                    // clear search
      setResults([]);                 // hide dropdown
    }}
  >
    {item.Product} - ₹{item.Price}
  </div>
))}        </div>
      )}
    </div>
  );
};

export default SearchBar;