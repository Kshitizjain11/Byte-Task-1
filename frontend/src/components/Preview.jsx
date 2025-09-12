import React, { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import "../markdown.css";
import { useLocation } from 'react-router-dom';
import axios from "axios"

const Preview = () => {
  const [markdown, setMarkdown] = useState("");
  const location = useLocation()
  
   useEffect(() => {
    const data = location.state?.markdown;
    if (!data) {
      console.log("Something is wrong, data didn't arrive");
      setMarkdown("# Nothing is here to be shown");
    } else {
      setMarkdown(data);
    }
  }, [location.state]);

  


  return (
    <div className="flex items-center justify-center w-full h-screen">

    <div className="flex flex-row justify-between gap-6 h-[90vh] w-full p-4 bg-gray-50">
      {/* Left: Markdown Editor */}
      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-2">Markdown Code</h2>
        <textarea
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
          className="flex-1 w-full min-h-0 resize-y font-mono text-base p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
        />
      </div>
      {/* Right: Markdown Preview */}
      <div className="flex flex-col flex-1 bg-white rounded-lg shadow-md p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Preview</h2>
        <div className="markdown max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Preview;