import { Post, Story } from "../types/instagram";

// Simulating API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchPosts = async (): Promise<Post[]> => {
  // Fetch random images from Picsum
  await delay(1000); // Simulate network delay
  
  const posts: Post[] = [];
  for(let i = 1; i <= 10; i++) {
    posts.push({
      id: i,
      username: `user_${Math.floor(Math.random() * 1000)}`,
      userImage: `https://picsum.photos/seed/${i}/200/200`,
      postImage: `https://picsum.photos/seed/${i + 100}/600/600`,
      caption: "Living my best life! 🌟 #adventure #lifestyle #moments",
      likes: Math.floor(Math.random() * 1000),
      timeAgo: `${Math.floor(Math.random() * 23) + 1} hours ago`
    });
  }
  return posts;
};

export const fetchStories = async (): Promise<Story[]> => {
  await delay(800);
  
  const stories: Story[] = [
    {
      id: 1,
      username: "Your story",
      isUser: true,
      image: `https://picsum.photos/seed/user/200/200`
    }
  ];

  // Add more stories
  for(let i = 2; i <= 10; i++) {
    stories.push({
      id: i,
      username: `user_${Math.floor(Math.random() * 1000)}`,
      image: `https://picsum.photos/seed/${i + 200}/200/200`
    });
  }

  return stories;
};