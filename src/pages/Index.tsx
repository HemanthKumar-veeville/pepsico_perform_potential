import { useQuery } from "@tanstack/react-query";
import InstagramHeader from "../components/InstagramHeader";
import Stories from "../components/Stories";
import Post from "../components/Post";
import Navigation from "../components/Navigation";
import CreatePost from "../components/CreatePost";
import { fetchPosts, fetchStories } from "../services/api";
import { useToast } from "../components/ui/use-toast";

const Index = () => {
  const { toast } = useToast();

  const { data: stories, isLoading: loadingStories } = useQuery({
    queryKey: ['stories'],
    queryFn: fetchStories,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load stories. Please try again later.",
          variant: "destructive"
        });
      }
    }
  });

  const { data: posts, isLoading: loadingPosts } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    meta: {
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to load posts. Please try again later.",
          variant: "destructive"
        });
      }
    }
  });

  return (
    <div className="min-h-screen bg-instagram-dark">
      <InstagramHeader />
      {loadingStories ? (
        <div className="h-28 bg-instagram-dark animate-pulse" />
      ) : (
        <Stories stories={stories || []} />
      )}
      <CreatePost />
      <div className="space-y-4">
        {loadingPosts ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-full aspect-square bg-gray-800 animate-pulse" />
          ))
        ) : (
          posts?.map((post) => (
            <Post key={post.id} {...post} />
          ))
        )}
      </div>
      <Navigation />
      <div className="h-16" />
    </div>
  );
};

export default Index;