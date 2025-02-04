import InstagramHeader from "../components/InstagramHeader";
import Stories from "../components/Stories";
import Post from "../components/Post";
import Navigation from "../components/Navigation";

const posts = [
  {
    id: 1,
    username: "rajeshvorkady",
    userImage: "/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png",
    postImage: "/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png",
    caption: "Fool rush in. And the get the best seats. On the wrong bus.",
    likes: 20,
    timeAgo: "5 days ago"
  },
  {
    id: 2,
    username: "pairedpassportz",
    userImage: "/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png",
    postImage: "/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png",
    caption: "Adventure awaits at every corner! 🌎✈️",
    likes: 45,
    timeAgo: "2 days ago"
  },
  {
    id: 3,
    username: "spurthy._ram",
    userImage: "/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png",
    postImage: "/lovable-uploads/3a913107-3673-4631-8090-0c324cff9c02.png",
    caption: "Living my best life! 🌟",
    likes: 67,
    timeAgo: "1 day ago"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-instagram-dark">
      <InstagramHeader />
      <Stories />
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
      <Navigation />
      <div className="h-16" /> {/* Spacing for fixed navigation */}
    </div>
  );
};

export default Index;