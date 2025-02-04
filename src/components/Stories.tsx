import { Plus } from "lucide-react";
import { Story } from "../types/instagram";

interface StoriesProps {
  stories: Story[];
}

const Stories = ({ stories }: StoriesProps) => {
  return (
    <div className="flex overflow-x-auto hide-scrollbar px-4 py-4 space-x-4 bg-instagram-dark">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center flex-shrink-0">
          <div className={`relative ${!story.isUser ? 'p-[2px] rounded-full bg-story-gradient' : ''}`}>
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-instagram-dark bg-gray-300">
              <img 
                src={story.image} 
                alt={story.username}
                className="w-full h-full object-cover"
              />
              {story.isUser && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-instagram-dark">
                  <Plus className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
          </div>
          <span className="text-xs text-instagram-text mt-1 truncate w-16 text-center">
            {story.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stories;