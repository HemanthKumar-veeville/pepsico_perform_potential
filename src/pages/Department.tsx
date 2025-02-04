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

const Department = () => {
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

  const fetchIdeas = async () => {
    const response = await axiosInstance.get<ApiResponse>("/ideas/related");
    return response.data.data;
  };

  // Replace useEffect with useQuery for ideas
  const { data: ideas } = useQuery({
    queryKey: ["ideas"],
    queryFn: fetchIdeas,
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
          <div className="flex h-full flex-col items-center justify-center p-8 mt-8 text-center bg-gradient-to-b from-instagram-dark to-gray-900 rounded-lg border border-gray-800">
            <div className="w-32 h-32 mb-6 relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-full h-full text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
              <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              All Caught Up!
            </h3>
            <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
              You're all up to date! There are no pending ideas that require
              your attention at the moment. Check back later for new innovative
              ideas from your team.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/create")}
                className="bg-[#0095F6] hover:bg-[#1877F2] text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                <span>Share New Idea</span>
              </button>
              <button
                onClick={() => fetchIdeas()}
                className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
                <span>Refresh</span>
              </button>
            </div>
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

export default Department;
