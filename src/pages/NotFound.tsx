import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaHome, FaSearchMinus } from "react-icons/fa";
import { BiErrorCircle } from "react-icons/bi";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-6 py-8 max-w-lg mx-4">
        <div className="flex justify-center mb-8">
          <BiErrorCircle className="text-9xl text-red-500 dark:text-red-400 animate-bounce" />
        </div>
        <h1 className="text-8xl font-bold mb-6 bg-gradient-to-r from-red-500 to-purple-600 text-transparent bg-clip-text">
          404
        </h1>
        <div className="flex justify-center mb-8">
          <FaSearchMinus className="text-5xl text-gray-400 dark:text-gray-500 animate-pulse" />
        </div>
        <p className="text-3xl text-gray-700 dark:text-gray-200 mb-6 font-semibold">
          Oops! Page not found
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-xl mb-10">
          The page you're looking for seems to have vanished into the digital
          void!
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
        >
          <FaHome className="mr-2 text-xl" />
          Return to Home
        </button>
        <p className="mt-8 text-base text-gray-500 dark:text-gray-400">
          Path: <span className="font-mono">{location.pathname}</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
