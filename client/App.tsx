import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Storage } from "@/lib/storage";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Placeholder from "./pages/Placeholder";
import PythonConcepts from "./pages/Concepts/PythonConcepts";
import JavaConcepts from "./pages/Concepts/JavaConcepts";
import CConcepts from "./pages/Concepts/CConcepts";
import HTMLConcepts from "./pages/Concepts/HTMLConcepts";
import PythonQuiz from "./pages/Quiz/PythonQuiz";
import JavaQuiz from "./pages/Quiz/JavaQuiz";
import CQuiz from "./pages/Quiz/CQuiz";
import HTMLQuiz from "./pages/Quiz/HTMLQuiz";
import Results from "./pages/Results";
import Rewards from "./pages/Rewards";
import { NavBar } from "@/components/NavBar";

const queryClient = new QueryClient();

// Protected route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = Storage.isLoggedIn();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {children}
      </main>
    </>
  );
}

// Public route component (for login)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = Storage.isLoggedIn();
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Concept Routes */}
          <Route
            path="/concepts"
            element={
              <ProtectedRoute>
                <Placeholder
                  title="Concepts"
                  description="Select a subject below to learn concepts"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/concepts/python"
            element={
              <ProtectedRoute>
                <PythonConcepts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/concepts/java"
            element={
              <ProtectedRoute>
                <JavaConcepts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/concepts/c"
            element={
              <ProtectedRoute>
                <CConcepts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/concepts/html"
            element={
              <ProtectedRoute>
                <HTMLConcepts />
              </ProtectedRoute>
            }
          />

          {/* Quiz Routes */}
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <Placeholder
                  title="Quiz"
                  description="Select a subject to start the quiz"
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/python"
            element={
              <ProtectedRoute>
                <PythonQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/java"
            element={
              <ProtectedRoute>
                <JavaQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/c"
            element={
              <ProtectedRoute>
                <CQuiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/html"
            element={
              <ProtectedRoute>
                <HTMLQuiz />
              </ProtectedRoute>
            }
          />

          {/* Results Route */}
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <Results />
              </ProtectedRoute>
            }
          />

          {/* Rewards Route */}
          <Route
            path="/rewards"
            element={
              <ProtectedRoute>
                <Rewards />
              </ProtectedRoute>
            }
          />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
