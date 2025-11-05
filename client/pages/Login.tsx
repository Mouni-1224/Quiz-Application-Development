import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Storage } from "@/lib/storage";
import { SpeakerButton } from "@/components/SpeakerButton";
import { AlertCircle } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (!isLogin && !name) {
      setError("Please enter your name");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: isLogin ? email.split("@")[0] : name,
        loginTime: Date.now(),
      };

      Storage.setUser(user);
      setIsLoading(false);
      navigate("/");
    }, 800);
  };

  const pageContent = isLogin
    ? `Welcome to QuizMaster! Log in with your email and password to get started with our comprehensive quiz platform. Learn programming concepts and test your knowledge with our interactive quizzes.`
    : `Create your account to join QuizMaster. Sign up with your email, password, and name to begin your learning journey.`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header with Speaker Button */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">
              QuizMaster
            </h1>
            <p className="text-muted-foreground">
              Master programming through interactive quizzes
            </p>
          </div>
          <SpeakerButton text={pageContent} size="md" />
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-border/50">
          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                isLogin
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setError("");
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !isLogin
                  ? "bg-gradient-to-r from-primary to-secondary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Full Name
                </label>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium text-base"
            >
              {isLoading
                ? "Processing..."
                : isLogin
                  ? "Login"
                  : "Create Account"}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-3">
              Try demo credentials:
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Email:</span> demo@example.com
              </p>
              <p>
                <span className="font-medium">Password:</span> demo123
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">4</div>
            <div className="text-xs text-muted-foreground">Subjects</div>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">40</div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </div>
          <div className="bg-white/50 backdrop-blur rounded-lg p-4">
            <div className="text-2xl font-bold text-primary mb-1">∞</div>
            <div className="text-xs text-muted-foreground">Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}
