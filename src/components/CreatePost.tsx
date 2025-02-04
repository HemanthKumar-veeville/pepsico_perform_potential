import { useState, useRef } from "react";
import {
  Camera,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import axiosInstance from "../api/axios";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200; // Adjust this value as needed
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Add touch handling for swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      // Min swipe distance
      scroll(diff > 0 ? "right" : "left");
      setTouchStart(null);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const getFilePreview = (file: File, url: string) => {
    const fileType = file.type.split("/")[0];

    switch (fileType) {
      case "image":
        return (
          <img
            src={url}
            alt={`Preview ${file.name}`}
            className="w-full h-32 object-cover rounded"
          />
        );
      case "video":
        return (
          <video
            src={url}
            className="w-full h-32 object-cover rounded"
            controls
          />
        );
      case "audio":
        return (
          <div className="w-full h-32 bg-gray-800 rounded flex flex-col items-center justify-center text-instagram-text p-2">
            <audio src={url} controls className="w-full mt-2" />
            <span className="text-sm mt-2 text-center truncate w-full">
              {file.name}
            </span>
          </div>
        );
      default:
        return (
          <div className="w-full h-32 bg-gray-800 rounded flex flex-col items-center justify-center text-instagram-text p-2">
            <div className="text-3xl mb-2">📄</div>
            <span className="text-sm text-center truncate w-full">
              {file.name}
            </span>
            <span className="text-xs text-gray-400">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>
        );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles((prev) => [...prev, ...selectedFiles]);

    // Create preview URLs for all supported file types
    selectedFiles.forEach((file) => {
      const url = URL.createObjectURL(file);
      setPreviewUrls((prev) => [...prev, url]);
    });
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || files.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and add at least one file",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Upload files one by one
      const fileUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await axiosInstance.post(
          "/files/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        fileUrls.push(uploadResponse.data);
      }

      // Then create the post with the file URLs

      const submissionData = {
        title,
        description,
        supporting_documents: fileUrls?.map((url) => url?.data?.key),
      };

      const response = await axiosInstance.post("/ideas", submissionData);

      toast({
        title: "Success!",
        description: "Your post has been created",
      });

      // Reset form and navigate back
      setTitle("");
      setDescription("");
      setFiles([]);
      setPreviewUrls([]);
      navigate("/");
    } catch (error) {
      console.error("Error submitting idea:", error);
      toast({
        title: "Error",
        description: "Failed to submit idea",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCapture = () => {
    // For now, just show a toast that this feature is coming soon
    toast({
      title: "Coming Soon",
      description: "Camera capture feature will be available soon!",
    });
  };

  const isFormValid = title.trim() && description.trim() && files.length > 0;

  return (
    <div className="min-h-screen bg-instagram-dark">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-800">
          <button
            onClick={() => navigate("/")}
            className="text-instagram-text hover:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-instagram-text font-semibold">Create New Post</h2>
          <div className="w-6" /> {/* Spacer for alignment */}
        </div>
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Add a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent text-instagram-text border-instagram-secondary"
            />

            <Textarea
              placeholder="Write a description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-transparent text-instagram-text border-instagram-secondary min-h-[100px]"
            />

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Files
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={handleCapture}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture
              </Button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,video/*,audio/*,application/*"
              className="hidden"
            />

            {files.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-instagram-text font-semibold">
                  Selected Files
                </h3>
                <div className="relative">
                  {files.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => scroll("left")}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors shadow-lg"
                      >
                        <ChevronLeft className="w-4 h-4 text-white" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scroll("right")}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors shadow-lg"
                      >
                        <ChevronRight className="w-4 h-4 text-white" />
                      </button>
                    </>
                  )}
                  <div
                    ref={scrollContainerRef}
                    className="flex overflow-x-auto scrollbar-hide gap-2 py-2 px-4"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                  >
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="relative group flex-shrink-0"
                        style={{ width: "100%" }}
                      >
                        {previewUrls[index] ? (
                          getFilePreview(file, previewUrls[index])
                        ) : (
                          <div className="w-full h-32 bg-gray-800 rounded flex flex-col items-center justify-center text-instagram-text p-2">
                            <div className="animate-pulse w-full h-full bg-gray-700 rounded" />
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className={cn(
                "w-full font-semibold text-sm",
                isFormValid
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0"
                  : "bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-200/50 cursor-not-allowed hover:bg-none border-0"
              )}
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
