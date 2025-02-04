import { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PostProps {
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  likes: number;
  timeAgo: string;
}

const Post = ({ username, userImage, postImage, caption, likes: initialLikes, timeAgo }: PostProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comments feature coming soon!",
    });
  };

  const handleShare = () => {
    // Simulate sharing functionality
    navigator.clipboard.writeText(`Check out this post from ${username}: ${postImage}`)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "Post link has been copied to your clipboard",
          duration: 2000,
        });
      })
      .catch(() => {
        toast({
          title: "Share",
          description: "Unable to copy link. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Post removed from saved" : "Post saved",
      duration: 1500,
    });
  };

  return (
    <div className="bg-instagram-dark">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src={userImage}
              alt={username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-instagram-text font-semibold">{username}</span>
        </div>
        <MoreHorizontal className="text-instagram-text cursor-pointer" />
      </div>

      <div className="w-full aspect-square bg-gray-100">
        <img
          src={postImage}
          alt="Post content"
          className="w-full h-full object-contain"
          onDoubleClick={handleLike}
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Heart 
              className={`w-6 h-6 cursor-pointer ${isLiked ? 'text-red-500 fill-red-500' : 'text-instagram-text'}`} 
              onClick={handleLike}
            />
            <MessageCircle 
              className="w-6 h-6 text-instagram-text cursor-pointer" 
              onClick={handleComment}
            />
            <Send 
              className="w-6 h-6 text-instagram-text cursor-pointer" 
              onClick={handleShare}
            />
          </div>
          <Bookmark 
            className={`w-6 h-6 cursor-pointer ${isSaved ? 'text-instagram-text fill-instagram-text' : 'text-instagram-text'}`}
            onClick={handleSave}
          />
        </div>

        <div className="text-instagram-text mb-2">{likes.toLocaleString()} likes</div>
        
        <div className="text-instagram-text">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>

        <div className="text-instagram-secondary text-sm mt-2 cursor-pointer">View all comments</div>
        <div className="text-instagram-secondary text-xs mt-1">{timeAgo}</div>
      </div>
    </div>
  );
};

export default Post;