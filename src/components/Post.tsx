import { useState, useEffect, TouchEvent } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isPreloading, setIsPreloading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const isDescriptionSlide = currentIndex === 0;
  const actualAttachmentIndex = currentIndex - 1;

  // Required minimum distance between touch start and touch end to be detected as swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      previousSlide();
    }
  };

  useEffect(() => {
    const preloadImages = async () => {
      try {
        const urls = await Promise.all(
          attachments.map(async (key) => {
            const response = await axiosInstance.get(`/files/${key}`);
            return (
              response?.data?.data?.url ||
              "https://picsum.photos/seed/100/600/600"
            );
          })
        );
        setAttachmentUrls(urls);

        // Preload all images
        await Promise.all(
          urls.map((url, index) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.onload = () => {
                setLoadedImages((prev) => new Set([...prev, index]));
                resolve(null);
              };
              img.onerror = () => {
                console.error(`Failed to load image: ${url}`);
                resolve(null);
              };
              img.src = url;
            });
          })
        );
      } catch (error) {
        console.error("Error fetching attachment URLs:", error);
        toast({
          title: "Error",
          description: "Failed to load some images",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        setIsPreloading(false);
      }
    };

    preloadImages();
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

  const PostSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-700" />
          <div className="h-4 w-24 bg-gray-700 rounded" />
        </div>
        <div className="w-6 h-6 bg-gray-700 rounded" />
      </div>
      <div className="w-full aspect-square bg-gray-800" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 bg-gray-700 rounded" />
            ))}
          </div>
          <div className="w-6 h-6 bg-gray-700 rounded" />
        </div>
        <div className="flex justify-between items-baseline mb-4">
          <div className="h-4 w-20 bg-gray-700 rounded" />
          <div className="h-4 w-32 bg-gray-700 rounded" />
          <div className="h-3 w-16 bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );

  if (isLoading || isPreloading) {
    return <PostSkeleton />;
  }

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
        <div
          className="relative h-full"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {isDescriptionSlide ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-8">
              <div className="max-w-lg text-center text-white">
                <h2 className="text-2xl font-bold mb-4">{caption}</h2>
                <p className="text-2xl">{description}</p>
              </div>
            </div>
          ) : (
            <>
              {!loadedImages.has(actualAttachmentIndex) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <Spinner
                    size="lg"
                    className="border-4 border-gray-600 border-t-white"
                  />
                </div>
              ) : (
                <img
                  src={attachmentUrls[actualAttachmentIndex]}
                  alt={`Post content ${actualAttachmentIndex + 1} of ${
                    attachments.length
                  }`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onDoubleClick={handleLike}
                />
              )}
            </>
          )}

          {attachments.length > 0 && (
            <>
              <button
                onClick={previousSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition backdrop-blur-sm shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1.5 text-white hover:bg-black/70 transition backdrop-blur-sm shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
                {[...Array(attachments.length + 1)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all shadow-[0_0_2px_rgba(0,0,0,0.4)] ring-2 ring-black/20",
                      index === currentIndex
                        ? "bg-white scale-110"
                        : "bg-white/70 hover:bg-white/90"
                    )}
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
