import React, { useEffect, useState } from 'react';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import "../markdown.css";
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { saveAs } from "file-saver"
const Preview = () => {
  
  const [markdown, setMarkdown] = useState("");
  const location = useLocation()
  const handleDownload = ()=>{
    const blob = new Blob([markdown],{type:"text/markdown;charset=utf-8"})
    saveAs(blob,"repo.md")
  }
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
        <div className="flex justify-between mb-2 items-center">
        <h2 className="text-lg font-semibold mb-2">Markdown Code</h2>
        <button onClick={handleDownload} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Download
          <svg className='ml-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" color="#fff" fill="none">
          <path d="M2.99969 17.0002C2.99969 17.9302 2.99969 18.3952 3.10192 18.7767C3.37932 19.8119 4.18796 20.6206 5.22324 20.898C5.60474 21.0002 6.06972 21.0002 6.99969 21.0002L16.9997 21.0002C17.9297 21.0002 18.3947 21.0002 18.7762 20.898C19.8114 20.6206 20.6201 19.8119 20.8975 18.7767C20.9997 18.3952 20.9997 17.9302 20.9997 17.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path d="M16.4998 11.5002C16.4998 11.5002 13.1856 16.0002 11.9997 16.0002C10.8139 16.0002 7.49976 11.5002 7.49976 11.5002M11.9997 15.0002V3.00016" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
        </button>
        </div>
        
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