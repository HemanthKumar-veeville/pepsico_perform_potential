import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import CreatePost from "./components/CreatePost";
import NotFound from "./pages/NotFound";
import { Layout } from "@/components/Layout";
import Navigation from "@/components/Navigation";
import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNavigation = location.pathname !== "/create";

  return (
    <Layout>
      <main className={showNavigation ? "pb-[60px]" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNavigation && <Navigation />}
    </Layout>
  );
};

export default App;
