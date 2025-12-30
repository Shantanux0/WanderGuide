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
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminItineraries from "./pages/admin/AdminItineraries";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminTools from "./pages/admin/AdminTools";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDestinations from "./pages/admin/AdminDestinations";
import AdminItineraryEditor from "./pages/admin/AdminItineraryEditor";
import AboutUs from "./pages/AboutUs"; // Import AboutUs
import { AuthProvider } from "@/context/AuthContext";
import { RequireAuth } from "@/components/RequireAuth";
import { RequireAdmin } from "@/components/RequireAdmin";
import { RequireNonAdmin } from "@/components/RequireNonAdmin";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public/User Routes - Wrapped in RequireNonAdmin to exclude Admins */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <RequireNonAdmin>
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              </RequireNonAdmin>
            } />
            <Route path="/dashboard/request" element={
              <RequireNonAdmin>
                <RequireAuth>
                  <RequestItinerary />
                </RequireAuth>
              </RequireNonAdmin>
            } />
            <Route path="/itinerary/:id" element={
              <RequireAuth>
                <ItineraryDetail />
              </RequireAuth>
            } />
            <Route path="/dashboard/*" element={
              <RequireNonAdmin>
                <RequireAuth>
                  <UserDashboard />
                </RequireAuth>
              </RequireNonAdmin>
            } />
            <Route path="/settings" element={
              <RequireNonAdmin>
                <RequireAuth>
                  <Settings />
                </RequireAuth>
              </RequireNonAdmin>
            } />
            <Route path="/passport" element={
              <RequireNonAdmin>
                <Passport />
              </RequireNonAdmin>
            } />
            <Route path="/profile" element={
              <RequireNonAdmin>
                <Profile />
              </RequireNonAdmin>
            } />


            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route path="/admin" element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            } />
            <Route path="/admin/users" element={
              <RequireAdmin>
                <AdminUsers />
              </RequireAdmin>
            } />
            <Route path="/admin/requests" element={
              <RequireAdmin>
                <AdminRequests />
              </RequireAdmin>
            } />
            <Route path="/admin/itineraries" element={
              <RequireAdmin>
                <AdminItineraries />
              </RequireAdmin>
            } />
            <Route path="/admin/analytics" element={
              <RequireAdmin>
                <AdminAnalytics />
              </RequireAdmin>
            } />
            <Route path="/admin/tools" element={
              <RequireAdmin>
                <AdminTools />
              </RequireAdmin>
            } />
            <Route path="/admin/destinations" element={
              <RequireAdmin>
                <AdminDestinations />
              </RequireAdmin>
            } />
            <Route path="/admin/itineraries/new" element={
              <RequireAdmin>
                <AdminItineraryEditor />
              </RequireAdmin>
            } />
            <Route path="/admin/itineraries/edit/:id" element={
              <RequireAdmin>
                <AdminItineraryEditor />
              </RequireAdmin>
            } />

            {/* Catch-all - Wrap in RequireNonAdmin so admins don't see it?
                Or maybe admins need 404s too?
                If an admin hits /foo, they get 404.
                If they hit /dashboard/foo, they get redirected to /admin.
                Let's leave 404 accessible to all for now, as it's not "main page" content per se.
            */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
