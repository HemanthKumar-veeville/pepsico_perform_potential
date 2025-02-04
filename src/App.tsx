import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser } from "@/store/slices/authSlice";
import Index from "./pages/Index";
import CreatePost from "./components/CreatePost";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import { Layout } from "@/components/Layout";
import Navigation from "@/components/Navigation";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </Provider>
    </QueryClientProvider>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNavigation = !["create", "signin"].includes(
    location.pathname.slice(1)
  );

  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Layout>
      <main className={showNavigation ? "pb-[60px]" : ""}>
        <Routes>
          <Route
            path="/signin"
            element={
              <ProtectedRoute requireAuth={false}>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {showNavigation && <Navigation />}
    </Layout>
  );
};

export default App;
