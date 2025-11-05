import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Storage } from "@/lib/storage";
import { SpeakerButton } from "@/components/SpeakerButton";
import {
  Trophy,
  BookOpen,
  PenTool,
  Gift,
  Zap,
  Crown,
  Home,
  ArrowRight,
} from "lucide-react";

interface Reward {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  minPoints: number;
  color: string;
  unlocked: boolean;
}

export default function Rewards() {
  const [currentPoints, setCurrentPoints] = useState(0);
  const [stats, setStats] = useState(Storage.getUserStats());
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const points = Storage.getCurrentWeekPoints();
    setCurrentPoints(points);

    const weekPoints = Storage.getWeeklyPoints();
    const currentWeek = weekPoints.find(
      (w) =>
        w.week ===
        Math.ceil(
          (new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) /
            86400000 /
            7
        ) &&
        w.year === new Date().getFullYear()
    );

    if (currentWeek) {
      setCompletedSubjects(currentWeek.completedSubjects);
      if (currentWeek.completedSubjects.length === 4) {
        setConfetti(true);
      }
    }
  }, []);

  const rewards: Reward[] = [
    {
      id: "book",
      name: "Programming Book",
      description:
        "A comprehensive guide to programming concepts and best practices",
      icon: <BookOpen className="h-8 w-8" />,
      minPoints: 20,
      color: "from-blue-500 to-cyan-500",
      unlocked: currentPoints >= 20,
    },
    {
      id: "pen",
      name: "Premium Pen Set",
      description: "High-quality pens perfect for notes and annotations",
      icon: <PenTool className="h-8 w-8" />,
      minPoints: 30,
      color: "from-purple-500 to-pink-500",
      unlocked: currentPoints >= 30,
    },
    {
      id: "bag",
      name: "Developer's Backpack",
      description: "Durable and stylish backpack for students and developers",
      icon: <Gift className="h-8 w-8" />,
      minPoints: 40,
      color: "from-orange-500 to-red-500",
      unlocked: currentPoints >= 40,
    },
  ];

  const pageContent = `Your weekly rewards. You have earned ${currentPoints} points and completed ${completedSubjects.length} of 4 subjects. Available rewards include a book at 20 points, a pen set at 30 points, and a backpack at 40 points.`;

  return (
    <div className="min-h-screen py-8 md:py-12">
      {/* Confetti Animation */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: Math.random() * 100 + "%",
                top: "-10px",
                animation: `bounce ${2 + Math.random() * 1}s infinite`,
                animationDelay: Math.random() * 0.5 + "s",
              }}
            >
              {["🎉", "🎊", "⭐", "🏆", "🎁"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                Your Rewards
              </h1>
              <p className="text-lg text-muted-foreground">
                Earn points by completing quizzes and unlock amazing gifts!
              </p>
            </div>
            <SpeakerButton text={pageContent} size="lg" />
          </div>

          {/* Points Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* This Week */}
            <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-80">This Week</h3>
                <Zap className="h-6 w-6 opacity-80" />
              </div>
              <p className="text-5xl font-bold mb-2">{currentPoints}</p>
              <p className="text-sm opacity-80">points earned</p>
            </div>

            {/* Subjects Completed */}
            <div className="bg-gradient-to-br from-accent to-secondary rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-80">Completed</h3>
                <Trophy className="h-6 w-6 opacity-80" />
              </div>
              <p className="text-5xl font-bold mb-2">
                {completedSubjects.length}/4
              </p>
              <p className="text-sm opacity-80">subjects this week</p>
            </div>

            {/* All Time */}
            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-8 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-80">All Time</h3>
                <Crown className="h-6 w-6 opacity-80" />
              </div>
              <p className="text-5xl font-bold mb-2">{stats.allTimeScore}</p>
              <p className="text-sm opacity-80">total points</p>
            </div>
          </div>

          {/* Completion Message */}
          {completedSubjects.length === 4 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-3xl">🎉</span>
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-green-900 mb-1">
                    Congratulations!
                  </h3>
                  <p className="text-green-800">
                    You've completed all 4 subjects this week! You're eligible
                    for all rewards based on your points. Keep up the amazing
                    work!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 ${
                reward.unlocked
                  ? `border-green-500 bg-white hover:shadow-xl`
                  : "border-border/30 bg-muted/30 opacity-75"
              }`}
            >
              {/* Background */}
              <div
                className={`h-32 bg-gradient-to-br ${reward.color} relative overflow-hidden`}
              >
                {reward.unlocked && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white rounded-full p-2">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="text-6xl">{reward.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${reward.color} flex items-center justify-center text-white`}
                  >
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground">
                      {reward.name}
                    </h3>
                    <p className="text-sm font-semibold text-primary">
                      {reward.minPoints} Points
                    </p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  {reward.description}
                </p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Progress
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {Math.min(currentPoints, reward.minPoints)}/
                      {reward.minPoints}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${reward.color} transition-all duration-500`}
                      style={{
                        width: `${Math.min((currentPoints / reward.minPoints) * 100, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div
                  className={`p-3 rounded-lg text-center text-sm font-semibold ${
                    reward.unlocked
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-muted text-muted-foreground border border-border"
                  }`}
                >
                  {reward.unlocked ? (
                    <span>✓ Reward Unlocked!</span>
                  ) : (
                    <span>
                      {reward.minPoints - currentPoints} points needed
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How to Earn Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-border/50 mb-12">
          <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
            How to Earn Points
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Take a Quiz",
                points: "10 pts",
                description: "Complete a subject quiz",
                icon: "📝",
              },
              {
                title: "Perfect Score",
                points: "Bonus +5",
                description: "Answer all questions correctly",
                icon: "⭐",
              },
              {
                title: "Weekly Bonus",
                points: "Extra +10",
                description: "Complete all 4 subjects",
                icon: "🏆",
              },
              {
                title: "Streak",
                points: "Variable",
                description: "Maintain daily quiz streak",
                icon: "🔥",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-primary font-bold mb-2">
                  {item.points}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {completedSubjects.length < 4 && (
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white mb-12">
            <div className="flex items-center justify-between flex-col md:flex-row gap-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
                  Keep Going!
                </h2>
                <p className="text-lg opacity-90">
                  You've completed {completedSubjects.length} of 4 subjects.
                  Complete the remaining quizzes to unlock all rewards!
                </p>
              </div>
              <Link to="/" className="flex-shrink-0">
                <Button
                  size="lg"
                  className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-semibold group"
                >
                  Start Quiz <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full h-11">
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/quiz" className="flex-1">
            <Button className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
              Take a Quiz
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
