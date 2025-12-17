import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import ItineraryDetail from "./pages/ItineraryDetail";
import DestinationDetail from "./pages/DestinationDetail";
import RequestItinerary from "./pages/RequestItinerary";
import Destinations from "./pages/Destinations";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import Community from "./pages/Community";
import Passport from "./pages/Passport";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/context/AuthContext";
import { RequireAuth } from "@/components/RequireAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/destination/:id" element={<DestinationDetail />} /> {/* Moved and consolidated */}

            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <UserDashboard />
              </RequireAuth>
            } />
            <Route path="/dashboard/request" element={
              <RequireAuth>
                <RequestItinerary />
              </RequireAuth>
            } />
            <Route path="/itinerary/:id" element={
              <RequireAuth>
                <ItineraryDetail />
              </RequireAuth>
            } />
            <Route path="/dashboard/*" element={
              <RequireAuth>
                <UserDashboard />
              </RequireAuth>
            } />
            <Route path="/settings" element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            } />
            <Route path="/passport" element={<Passport />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
