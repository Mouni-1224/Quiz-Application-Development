import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, RotateCcw, Home, Award } from "lucide-react";

interface ResultData {
  subject: string;
  score: number;
  totalQuestions: number;
  points: number;
}

export default function Results() {
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultData | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem("quizResult");
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!result) {
    return null;
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  const isPerfect = result.score === result.totalQuestions;
  const isGood = result.score >= result.totalQuestions * 0.7;

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-2xl mx-auto px-4">
        {/* Celebration Animation */}
        {isPerfect && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: Math.random() * 100 + "%",
                  top: "-10px",
                  animation: `bounce ${2 + Math.random() * 0.5}s infinite`,
                  animationDelay: Math.random() * 0.5 + "s",
                }}
              >
                🎉
              </div>
            ))}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border border-border/50 mb-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              {isPerfect ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-lg animate-pulse" />
                  <Trophy className="h-20 w-20 text-yellow-500 relative" />
                </div>
              ) : isGood ? (
                <Award className="h-20 w-20 text-primary" />
              ) : (
                <Trophy className="h-20 w-20 text-muted-foreground" />
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-3">
              {isPerfect
                ? "Perfect Score! 🌟"
                : isGood
                  ? "Great Job!"
                  : "Quiz Complete"}
            </h1>

            <p className="text-lg text-muted-foreground">
              {result.subject} Quiz Results
            </p>
          </div>

          {/* Score Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 text-center border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">Correct</p>
              <p className="text-3xl font-bold text-primary">{result.score}</p>
              <p className="text-xs text-muted-foreground mt-1">Answers</p>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 text-center border border-secondary/20">
              <p className="text-sm text-muted-foreground mb-2">Wrong</p>
              <p className="text-3xl font-bold text-secondary">
                {result.totalQuestions - result.score}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Answers</p>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 text-center border border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">Percentage</p>
              <p className="text-3xl font-bold text-accent">{percentage}%</p>
              <p className="text-xs text-muted-foreground mt-1">Score</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-400/5 rounded-xl p-6 text-center border border-yellow-500/20">
              <p className="text-sm text-muted-foreground mb-2">Points</p>
              <p className="text-3xl font-bold text-yellow-600">+{result.points}</p>
              <p className="text-xs text-muted-foreground mt-1">Earned</p>
            </div>
          </div>

          {/* Performance Feedback */}
          <div
            className={`rounded-xl p-6 mb-8 border-l-4 ${
              isPerfect
                ? "bg-green-50 border-green-500 text-green-700"
                : isGood
                  ? "bg-blue-50 border-blue-500 text-blue-700"
                  : "bg-orange-50 border-orange-500 text-orange-700"
            }`}
          >
            <p className="font-semibold mb-2">
              {isPerfect
                ? "Excellent Performance!"
                : isGood
                  ? "Well Done!"
                  : "Keep Practicing!"}
            </p>
            <p className="text-sm">
              {isPerfect
                ? "You answered all questions correctly. You have mastered this subject!"
                : isGood
                  ? "You demonstrated a solid understanding of the concepts. Great effort!"
                  : "Review the concepts and try again to improve your score."}
            </p>
          </div>

          {/* Progress Visualization */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-semibold text-foreground">
                Overall Performance
              </span>
              <span className="text-sm font-bold text-primary">{percentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 h-11 gap-2"
            >
              <Home className="h-4 w-4" />
              Back Home
            </Button>

            <Button
              onClick={() => {
                sessionStorage.removeItem("quizResult");
                // Navigate back to quiz page would be better, but for now go to quiz selection
                navigate("/quiz");
              }}
              className="flex-1 h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Try Again
            </Button>

            <Button
              onClick={() => navigate("/rewards")}
              className="flex-1 h-11 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white gap-2"
            >
              <Trophy className="h-4 w-4" />
              View Rewards
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border/50">
          <h2 className="text-xl font-heading font-bold mb-4">Next Steps</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                1
              </span>
              <span className="text-foreground">
                Review your answers and understand the correct solutions
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                2
              </span>
              <span className="text-foreground">
                Study the concept pages to strengthen your knowledge
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                3
              </span>
              <span className="text-foreground">
                Try other quizzes to expand your programming knowledge
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
