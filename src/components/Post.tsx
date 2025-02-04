import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";

interface PostProps {
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  likes: number;
  timeAgo: string;
}

const Post = ({ username, userImage, postImage, caption, likes, timeAgo }: PostProps) => {
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
        <MoreHorizontal className="text-instagram-text" />
      </div>

      <div className="w-full aspect-square bg-gray-100">
        <img
          src={postImage}
          alt="Post content"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Heart className="w-6 h-6 text-instagram-text" />
            <MessageCircle className="w-6 h-6 text-instagram-text" />
            <Send className="w-6 h-6 text-instagram-text" />
          </div>
          <Bookmark className="w-6 h-6 text-instagram-text" />
        </div>

        <div className="text-instagram-text mb-2">{likes} likes</div>
        
        <div className="text-instagram-text">
          <span className="font-semibold mr-2">{username}</span>
          {caption}
        </div>

        <div className="text-instagram-secondary text-sm mt-2">View all comments</div>
        <div className="text-instagram-secondary text-xs mt-1">{timeAgo}</div>
      </div>
    </div>
  );
};

export default Post;