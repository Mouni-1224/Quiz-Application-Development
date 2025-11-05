import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="inline-block">
            <AlertTriangle className="h-24 w-24 text-primary/30 mx-auto mb-4" />
          </div>
        </div>

        <h1 className="text-6xl font-heading font-bold text-foreground mb-3">
          404
        </h1>

        <p className="text-2xl font-semibold text-foreground mb-2">
          Page Not Found
        </p>

        <p className="text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist. It might have been
          moved or deleted.
        </p>

        <div className="bg-white rounded-xl p-6 border border-border/50 mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            <span className="font-semibold">Attempted URL:</span>
          </p>
          <p className="text-sm font-mono text-foreground break-all">
            {location.pathname}
          </p>
        </div>

        <Link to="/">
          <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold h-11 gap-2">
            <Home className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
