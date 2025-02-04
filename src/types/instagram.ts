export interface Story {
  id: number;
  username: string;
  isUser?: boolean;
  image: string;
}

export interface Post {
  id: number;
  username: string;
  userImage: string;
  postImage: string;
  caption: string;
  likes: number;
  timeAgo: string;
}