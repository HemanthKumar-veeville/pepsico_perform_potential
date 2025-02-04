import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
    
    // Create preview URLs for the files
    selectedFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        setPreviewUrls(prev => [...prev, url]);
      }
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || files.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and add at least one file",
        variant: "destructive",
      });
      return;
    }

    // Here we would normally send the data to a backend
    console.log("Submitting post:", { title, description, files });
    toast({
      title: "Success!",
      description: "Your post has been created",
    });

    // Reset form
    setTitle("");
    setDescription("");
    setFiles([]);
    setPreviewUrls([]);
  };

  const handleCapture = () => {
    // For now, just show a toast that this feature is coming soon
    toast({
      title: "Coming Soon",
      description: "Camera capture feature will be available soon!",
    });
  };

  return (
    <div className="bg-instagram-dark p-4 space-y-4">
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
            <h3 className="text-instagram-text font-semibold">Selected Files:</h3>
            <div className="grid grid-cols-2 gap-2">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  {previewUrls[index] ? (
                    <img
                      src={previewUrls[index]}
                      alt={`Preview ${index}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-800 rounded flex items-center justify-center text-instagram-text">
                      {file.name}
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
        )}

        <Button type="submit" className="w-full">
          Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;