import { Heart, MessagesSquare } from "lucide-react";

const InstagramHeader = () => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-instagram-dark">
      <div className="flex items-center">
        <h1 className="text-2xl font-semibold text-instagram-text font-['Instagram Sans']">
          Pepsico
        </h1>
        <svg
          className="w-3 h-3 ml-1 mt-2 text-instagram-text"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      <div className="flex items-center space-x-4">
        <Heart className="w-6 h-6 text-instagram-text" />
        <MessagesSquare className="w-6 h-6 text-instagram-text" />
      </div>
    </div>
  );
};

export default InstagramHeader;
