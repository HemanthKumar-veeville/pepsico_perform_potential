import {
  Home,
  Search,
  PlusSquare,
  Play,
  User,
  SquareActivity,
  Users,
  User2Icon,
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
      <User2Icon
        className={`w-6 h-6 cursor-pointer transition-all ${
          isActive("/profile")
            ? "text-instagram-primary stroke-[2.5px] scale-110 drop-shadow-[0_0_3px_rgba(255,48,64,0.3)]"
            : "text-instagram-text hover:text-gray-300"
        }`}
        onClick={() => navigate("/profile")}
      />
    </div>
  );
};

export default Navigation;
