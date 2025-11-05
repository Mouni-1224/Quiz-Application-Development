import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

interface PlaceholderProps {
  title: string;
  description: string;
}

export default function Placeholder({ title, description }: PlaceholderProps) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-8 md:py-12">
      <div className="container max-w-2xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-block">
            <div className="h-20 w-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">
            {title}
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-blue-900">
              This section is coming soon! Continue exploring other features or
              let us know if you'd like us to prioritize this section.
            </p>
          </div>

          {/* Feature List */}
          <div className="mb-8">
            <h2 className="text-xl font-heading font-bold text-foreground mb-4">
              What's Available
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Link to="/concepts/python">
                <Button variant="outline" className="w-full h-11">
                  Python Concepts
                </Button>
              </Link>
              <Link to="/concepts/java">
                <Button variant="outline" className="w-full h-11">
                  Java Concepts
                </Button>
              </Link>
              <Link to="/concepts/c">
                <Button variant="outline" className="w-full h-11">
                  C Concepts
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/quiz/python">
                <Button variant="outline" className="w-full h-11">
                  Python Quiz
                </Button>
              </Link>
              <Link to="/quiz/java">
                <Button variant="outline" className="w-full h-11">
                  Java Quiz
                </Button>
              </Link>
              <Link to="/quiz/c">
                <Button variant="outline" className="w-full h-11">
                  C Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-11 gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
