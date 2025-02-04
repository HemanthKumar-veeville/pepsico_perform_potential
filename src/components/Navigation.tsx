import { Home, Search, PlusSquare, Play, User } from "lucide-react";

const Navigation = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center py-3 bg-instagram-dark border-t border-gray-800">
      <Home className="w-6 h-6 text-instagram-text" />
      <Search className="w-6 h-6 text-instagram-text" />
      <PlusSquare className="w-6 h-6 text-instagram-text" />
      <Play className="w-6 h-6 text-instagram-text" />
      <div className="w-6 h-6 rounded-full overflow-hidden">
        <img
          src="/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Navigation;