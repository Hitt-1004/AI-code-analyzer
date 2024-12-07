import React, { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      alert("Please provide a code snippet!");
      return;
    }

    setIsLoading(true); 
    setResult(""); // Reset previous results

    try {
      const response = await fetch("http://localhost:3000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: code }),  // Make sure the input is being sent
      });

      if (!response.ok) {
        throw new Error("Failed to analyze code.");
      }

      const data = await response.json();
      console.log(data);  // Log the response data to ensure it's correct
      setResult(data.generated_text);  // Display the generated_text from the response
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Code Performance Optimizer</h1>
      <textarea
        rows="10"
        cols="50"
        placeholder="Paste your code snippet here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze Code"}
      </button>
      <div className="result">
        <h3>Analysis Result:</h3>
        <pre>{result}</pre>  {/* This will display the generated text */}
      </div>
    </div>
  );
}

export default App;
