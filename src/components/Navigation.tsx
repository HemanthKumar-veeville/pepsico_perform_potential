import {
  Home,
  Search,
  PlusSquare,
  Play,
  User,
  SquareActivity,
  Users,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto flex justify-around items-center py-3 bg-instagram-dark border-t border-gray-800">
      <Home
        className={`w-6 h-6 cursor-pointer transition-all ${
          isActive("/")
            ? "text-instagram-primary stroke-[2.5px] scale-110 drop-shadow-[0_0_3px_rgba(255,48,64,0.3)]"
            : "text-instagram-text hover:text-gray-300"
        }`}
        onClick={() => navigate("/")}
      />
      <SquareActivity
        className={`w-6 h-6 cursor-pointer transition-all ${
          isActive("/department")
            ? "text-instagram-primary stroke-[2.5px] scale-110 drop-shadow-[0_0_3px_rgba(255,48,64,0.3)]"
            : "text-instagram-text hover:text-gray-300"
        }`}
        onClick={() => navigate("/department")}
      />
      <PlusSquare
        className={`w-6 h-6 cursor-pointer transition-all ${
          isActive("/create")
            ? "text-instagram-primary stroke-[2.5px] scale-110 drop-shadow-[0_0_3px_rgba(255,48,64,0.3)]"
            : "text-instagram-text hover:text-gray-300"
        }`}
        onClick={() => navigate("/create")}
      />
      <Users
        className={`w-6 h-6 cursor-pointer transition-all ${
          isActive("/users")
            ? "text-instagram-primary stroke-[2.5px] scale-110 drop-shadow-[0_0_3px_rgba(255,48,64,0.3)]"
            : "text-instagram-text hover:text-gray-300"
        }`}
        onClick={() => navigate("/users")}
      />
      <div
        className={`w-6 h-6 rounded-full overflow-hidden cursor-pointer transition-all ${
          isActive("/profile")
            ? "scale-110 ring-offset-1 ring-offset-instagram-dark drop-shadow-[0_0_3px_rgba(255,48,64,0.3)]"
            : "hover:ring-1 hover:ring-gray-400"
        }`}
        onClick={() => navigate("/profile")}
      >
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
