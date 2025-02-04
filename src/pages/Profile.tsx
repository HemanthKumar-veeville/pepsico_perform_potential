import {
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import { useAppSelector } from "@/store/hooks";
import InstagramHeader from "@/components/InstagramHeader";
const Profile = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container mx-auto max-w-3xl min-h-screen">
      <InstagramHeader />
      <div className="bg-instagram-dark border border-gray-800 overflow-hidden h-full">
        {/* Profile Header with Background */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="w-24 h-24 bg-story-gradient rounded-full border-4 border-instagram-dark flex items-center justify-center">
              <span className="text-4xl text-instagram-text font-bold">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-16 px-4 sm:px-6">
          {/* User Details */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-instagram-text mb-1">
              {user?.name}
            </h1>
            <p className="text-instagram-secondary text-sm">{user?.role}</p>
          </div>

          {/* Info Cards Grid */}
          <div className="space-y-4 max-w-2xl mx-auto pb-6">
            {/* Email Card */}
            <div className="bg-[#1A1A1A] hover:bg-[#222] transition-colors duration-200 p-4 rounded-lg border border-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-[#0095F6] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-instagram-secondary mb-1">Email</p>
                  <p className="text-sm font-medium text-instagram-text truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Role Card */}
            <div className="bg-[#1A1A1A] hover:bg-[#222] transition-colors duration-200 p-4 rounded-lg border border-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center">
                  <FaUserTag className="text-[#D946EF] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-instagram-secondary mb-1">Role</p>
                  <p className="text-sm font-medium text-instagram-text">
                    {user?.role || "User"}
                  </p>
                </div>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="bg-[#1A1A1A] hover:bg-[#222] transition-colors duration-200 p-4 rounded-lg border border-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-500/10 rounded-full flex items-center justify-center">
                  <FaGithub className="text-gray-400 text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-instagram-secondary mb-1">
                    GitHub
                  </p>
                  <p className="text-sm font-medium text-instagram-text">
                    @username
                  </p>
                </div>
              </div>
            </div>

            {/* LinkedIn Card */}
            <div className="bg-[#1A1A1A] hover:bg-[#222] transition-colors duration-200 p-4 rounded-lg border border-gray-800/50">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#0077B5]/10 rounded-full flex items-center justify-center">
                  <FaLinkedin className="text-[#0077B5] text-lg" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-instagram-secondary mb-1">
                    LinkedIn
                  </p>
                  <p className="text-sm font-medium text-instagram-text">
                    @username
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
