import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Storage } from "@/lib/storage";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // This page is a redirect point - handle auth state
    if (Storage.isLoggedIn()) {
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Show a loading state while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="text-center">
        <div className="mb-4">
          <svg
            className="animate-spin h-12 w-12 text-primary mx-auto"
            viewBox="0 0 50 50"
          >
            <circle
              className="opacity-30"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
            />
            <circle
              className="text-primary"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="5"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="75"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          Loading...
        </h1>
        <p className="mt-2 text-muted-foreground">
          Taking you to the right place
        </p>
      </div>
    </div>
  );
}
