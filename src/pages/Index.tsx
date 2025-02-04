import { useQuery } from "@tanstack/react-query";
import InstagramHeader from "../components/InstagramHeader";
import Stories from "../components/Stories";
import Post from "../components/Post";
import { fetchPosts, fetchStories } from "../services/api";
import { useToast } from "../components/ui/use-toast";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
// Define the ApiResponse interface
interface ApiResponse {
  data: any[]; // Replace 'any' with your actual idea type
}

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { data: stories, isLoading: loadingStories } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchStories,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load stories. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  // Replace useEffect with useQuery for ideas
  const { data: ideas } = useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse>("/ideas");
      return response.data.data;
    },
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load ideas. Please try again later.",
          variant: "destructive",
        });
      },
    },
  });

  return (
    <div className="min-h-screen bg-instagram-dark">
      <InstagramHeader />
      {loadingStories ? (
        <div className="h-28 bg-instagram-dark animate-pulse" />
      ) : (
        <Stories stories={stories || []} />
      )}
      <div className="space-y-4">
        {loadingPosts ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full aspect-square bg-gray-800 animate-pulse"
            />
          ))
        ) : ideas?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 mt-8 text-center">
            <button
              onClick={() => navigate("/create")}
              className="w-24 h-24 mb-6 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-full h-full"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-white mb-2">
              Share Your First Idea
            </h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Start your journey by sharing your innovative idea with our
              community. Your next big breakthrough could inspire others!
            </p>
            <button
              onClick={() => navigate("/create")}
              className="bg-[#0095F6] hover:bg-[#1877F2] text-white px-8 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <span>Create New Post</span>
            </button>
          </div>
        ) : (
          ideas?.map((idea) => (
            <Post
              key={idea.id}
              username={idea.userName}
              userImage={`https://picsum.photos/seed/1/200/200`}
              attachments={idea.supporting_documents}
              caption={idea.title}
              description={idea.description}
              likes={Math.floor(Math.random() * 1000)}
              timeAgo={`${Math.floor(Math.random() * 23) + 1} hours ago`}
            />
          ))
        )}
      </div>
      <div className="h-16" />
    </div>
  );
};

export default Index;
