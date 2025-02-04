import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../api/axios";

interface PostProps {
  username: string;
  userImage: string;
  attachments: string[];
  caption: string;
  description: string;
  likes: number;
  timeAgo: string;
}

const Post = ({
  username,
  userImage,
  attachments,
  caption,
  description,
  likes: initialLikes,
  timeAgo,
}: PostProps) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attachmentUrls, setAttachmentUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isDescriptionSlide = currentIndex === 0;
  const actualAttachmentIndex = currentIndex - 1;

  useEffect(() => {
    const fetchAttachmentUrls = async () => {
      try {
        const urls = await Promise.all(
          attachments.map(async (key) => {
            const response = await axiosInstance.get(`/files/${key}`);
            console.log({ response });
            return (
              response?.data?.data?.url ||
              "https://picsum.photos/seed/100/600/600"
            );
          })
        );
        console.log({ urls });
        setAttachmentUrls(urls);
      } catch (error) {
        console.error("Error fetching attachment URLs:", error);
        toast({
          title: "Error",
          description: "Failed to load some images",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttachmentUrls();
  }, [attachments]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comments feature coming soon!",
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (attachments.length + 1));
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? attachments.length : prev - 1));
  };

  const handleShare = () => {
    navigator.clipboard
      .writeText(
        `Check out this post from ${username}: ${attachmentUrls[actualAttachmentIndex]}`
      )
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

      <div className="relative w-full aspect-square bg-gray-100">
        <div className="relative h-full">
          {isDescriptionSlide ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-8">
              <div className="max-w-lg text-center text-white">
                <h2 className="text-2xl font-bold mb-4">{caption}</h2>
                <p className="text-2xl">{description}</p>
              </div>
            </div>
          ) : (
            <>
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-white">Loading...</div>
                </div>
              ) : (
                <img
                  src={attachmentUrls[actualAttachmentIndex]}
                  alt={`Post content ${actualAttachmentIndex + 1} of ${
                    attachments.length
                  }`}
                  className="w-full h-full object-contain"
                  onDoubleClick={handleLike}
                />
              )}
            </>
          )}

          {attachments.length > 0 && (
            <>
              <button
                onClick={previousSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {[...Array(attachments.length + 1)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white scale-110"
                        : "bg-white/50"
                    }`}
                    aria-label={`Go to ${
                      index === 0 ? "description" : `image ${index}`
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            <Heart
              className={`w-6 h-6 cursor-pointer ${
                isLiked ? "text-red-500 fill-red-500" : "text-instagram-text"
              }`}
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
            className={`w-6 h-6 cursor-pointer ${
              isSaved
                ? "text-instagram-text fill-instagram-text"
                : "text-instagram-text"
            }`}
            onClick={handleSave}
          />
        </div>
        <div className="flex justify-between items-baseline mb-4">
          <div className="text-instagram-text">
            {likes.toLocaleString()} likes
          </div>

          <div className="text-instagram-secondary text-sm cursor-pointer">
            View all comments
          </div>
          <div className="text-instagram-secondary text-xs ">{timeAgo}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
