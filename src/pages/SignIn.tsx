import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginUser } from "@/store/slices/authSlice";
import axiosInstance from "@/api/axios";

// Add type definitions for Google Sign In
interface GoogleInitConfig {
  client_id: string;
  callback: (response: { credential: string }) => void;
}

interface GoogleUser {
  sub: string;
  email: string;
  name: string;
}

interface AuthResponse {
  token: string;
  user: {
    google_id: string;
    email: string;
    name: string;
    department_ids?: string[];
  };
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleInitConfig) => void;
          renderButton: (
            element: HTMLElement,
            buttonConfig: {
              theme: "outline" | "filled_blue" | "filled_black";
              size: "large" | "medium" | "small";
            }
          ) => void;
        };
      };
    };
  }
}

const SignIn = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      const hasDepartments =
        Array.isArray(user.department_ids) && user.department_ids.length > 0;
      navigate(
        hasDepartments || user.role === "Admin"
          ? "/internal-dashboard"
          : "/dashboard"
      );
    }
  }, [isAuthenticated, user, navigate]);

  const handleCredentialResponse = async (response: { credential: string }) => {
    try {
      const decodedUser = jwtDecode<GoogleUser>(response.credential);

      const userData = {
        google_id: decodedUser.sub,
        email: decodedUser.email,
        name: decodedUser.name,
      };

      const { data } = await axiosInstance.post<AuthResponse>(
        "/users",
        userData
      );

      dispatch(loginUser({ token: data.token, user: data.user }));
      toast.success("Successfully signed in!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Authentication failed";
      setError(errorMessage);
      toast.error("Authentication failed");
      console.error("Sign-in error:", err);
    }
  };

  useEffect(() => {
    const initializeGoogle = () => {
      if (!window.google) {
        console.error("Google API not loaded");
        return;
      }

      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      const buttonElement = document.getElementById("googleSignInDiv");
      if (!buttonElement) {
        console.error("Google sign-in button element not found");
        return;
      }

      window.google.accounts.id.renderButton(buttonElement, {
        theme: "outline",
        size: "large",
      });
    };

    initializeGoogle();
  }, []);

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/529.jpg" // Make sure to add your background image to the public folder
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-white">Welcome to Pepsico</h1>
          <p className="text-gray-200 text-lg">
            Share your moments with the world
          </p>
        </div>

        <div className="bg-black/30 backdrop-blur-md rounded-xl p-8 space-y-6">
          <div id="googleSignInDiv" className="flex justify-center"></div>
          {error && (
            <p className="text-sm text-center text-red-600" role="alert">
              {error}
            </p>
          )}
          <p className="text-sm text-center text-gray-300">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
