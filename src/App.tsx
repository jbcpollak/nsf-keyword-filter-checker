import { useState, ChangeEvent, KeyboardEvent } from "react";
import { countWords, countLines, highlightKeywords } from "./utils";
import { nsfKeywords } from "./constants";
import "./App.css";

function App() {
  const [text, setText] = useState<string>(() => {
    return localStorage.getItem("savedText") || "";
  });
  const [highlightedText, setHighlightedText] = useState<string>("");
  const [isAnalyzed, setIsAnalyzed] = useState(false);

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Text copied to clipboard!");
    } catch (_) {
      alert("Failed to copy text");
    }
  };

  const handleClear = () => {
    setText("");
    setHighlightedText("");
    setIsAnalyzed(false);
  };

  const handleSubmit = () => {
    const highlighted = highlightKeywords(text, nsfKeywords);
    setHighlightedText(highlighted);
    setIsAnalyzed(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Check for Ctrl+Enter (Windows) or Cmd+Enter (Mac)
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="app">
      <h1>NSF Filter Word Checker</h1>
      <div className="card">
        <textarea
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Paste your text here..."
          rows={10}
          className="text-input"
        />
        <div className="button-group">
          <button onClick={handleCopy} disabled={!text}>
            Copy
          </button>
          <button onClick={handleClear} disabled={!text} className="clear-btn">
            Clear
          </button>
          <button
            onClick={handleSubmit}
            disabled={!text}
            className="submit-btn"
          >
            Submit (Ctrl+Enter)
          </button>
        </div>
        {isAnalyzed && (
          <div
            className="highlighted-text"
            dangerouslySetInnerHTML={{ __html: highlightedText }}
          />
        )}
        <div className="stats">
          <div>Characters: {text.length}</div>
          <div>Words: {countWords(text)}</div>
          <div>Lines: {countLines(text)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
