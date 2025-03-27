import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8000";

export default function App() {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");
  const [documents, setDocuments] = useState([]);
  const [results, setResults] = useState(null);

  const fetchAll = async () => {
    const res = await fetch(`${API_URL}/get_all`);
    const data = await res.json();
    setDocuments(data);
  };

  const handleAdd = async () => {
    await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    fetchAll();
  };

  const handleQuery = async () => {
    const res = await fetch(`${API_URL}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await res.json();
    setResults(data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>🧠 Vector DB Demo (ChromaDB)</h1>

      <div style={{ marginTop: "1rem" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter sentence to store"
          style={{ padding: "0.5rem", width: "60%" }}
        />
        <button onClick={handleAdd} style={{ marginLeft: "1rem", padding: "0.5rem" }}>
          Add to DB
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search similar sentence"
          style={{ padding: "0.5rem", width: "60%" }}
        />
        <button onClick={handleQuery} style={{ marginLeft: "1rem", padding: "0.5rem" }}>
          Search
        </button>
      </div>

      <h2 style={{ marginTop: "2rem" }}>📦 Stored Sentences</h2>
      <ul>
        {documents?.documents?.map((doc, idx) => (
          <li key={idx}>
            <strong>{documents.ids[idx]}:</strong> {doc}
          </li>
        ))}
      </ul>

      {results && (
        <>
          <h2 style={{ marginTop: "2rem" }}>🔍 Search Results</h2>
          <ul>
            {results.documents[0].map((doc, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <strong>{results.ids[0][idx]}:</strong> {doc} (Distance:{" "}
                {results.distances[0][idx].toFixed(4)})
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
