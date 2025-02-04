import InstagramHeader from "../components/InstagramHeader";
import Stories from "../components/Stories";
import Post from "../components/Post";
import Navigation from "../components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-instagram-dark">
      <InstagramHeader />
      <Stories />
      <Post />
      <Navigation />
      <div className="h-16" /> {/* Spacing for fixed navigation */}
    </div>
  );
};

export default Index;