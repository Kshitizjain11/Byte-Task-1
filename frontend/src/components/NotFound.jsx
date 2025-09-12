import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/github-404.png"; // <-- put your image inside /src/assets/

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-center">
      {/* 404 Image */}
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="max-w-7xl w-full mb-6"
      />

      {/* Button back to home */}
      <Link
        to="/"
        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
