import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Storage } from "@/lib/storage";
import { SpeakerButton } from "@/components/SpeakerButton";
import {
  BookOpen,
  Code,
  Coffee,
  Globe,
  Flame,
  Trophy,
  ArrowRight,
} from "lucide-react";

const subjects = [
  {
    id: "python",
    name: "Python",
    description: "Learn the fundamentals of Python programming",
    color: "from-blue-500 to-cyan-500",
    icon: Coffee,
    stats: { questions: 10, difficulty: "Beginner" },
  },
  {
    id: "java",
    name: "Java",
    description: "Master object-oriented programming with Java",
    color: "from-orange-500 to-red-500",
    icon: Code,
    stats: { questions: 10, difficulty: "Intermediate" },
  },
  {
    id: "c",
    name: "C",
    description: "Understand systems programming with C",
    color: "from-green-500 to-emerald-500",
    icon: Flame,
    stats: { questions: 10, difficulty: "Intermediate" },
  },
  {
    id: "html",
    name: "HTML",
    description: "Build web pages with HTML markup",
    color: "from-pink-500 to-rose-500",
    icon: Globe,
    stats: { questions: 10, difficulty: "Beginner" },
  },
];

export default function Home() {
  const [user, setUser] = useState(Storage.getUser());
  const [weeklyPoints, setWeeklyPoints] = useState(0);
  const [stats, setStats] = useState(Storage.getUserStats());

  useEffect(() => {
    setWeeklyPoints(Storage.getCurrentWeekPoints());
  }, []);

  const pageContent = `Welcome ${user?.name || ""}! You have access to 4 programming subjects: Python, Java, C, and HTML. Each subject contains 10 questions to test your knowledge. Start learning today!`;

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                Welcome, <span className="text-primary">{user?.name}!</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Choose a subject and test your programming knowledge
              </p>
            </div>
            <SpeakerButton text={pageContent} size="lg" />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    This Week
                  </p>
                  <p className="text-3xl font-bold text-primary">
                    {weeklyPoints}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">points</p>
                </div>
                <Trophy className="h-12 w-12 text-primary/30" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl p-6 border border-secondary/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Attempts
                  </p>
                  <p className="text-3xl font-bold text-secondary">
                    {stats.totalAttempts}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">quizzes</p>
                </div>
                <BookOpen className="h-12 w-12 text-secondary/30" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    All-Time Score
                  </p>
                  <p className="text-3xl font-bold text-accent">
                    {stats.allTimeScore}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">points</p>
                </div>
                <Flame className="h-12 w-12 text-accent/30" />
              </div>
            </div>
          </div>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {subjects.map((subject) => {
            const SubjectIcon = subject.icon;
            return (
              <div
                key={subject.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/50 hover:border-border"
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon and Title */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`bg-gradient-to-br ${subject.color} rounded-xl p-3`}>
                      <SubjectIcon className="h-8 w-8 text-white" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${subject.color} text-white`}>
                      {subject.stats.difficulty}
                    </span>
                  </div>

                  <h2 className="text-3xl font-heading font-bold text-foreground mb-2">
                    {subject.name}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {subject.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <span>{subject.stats.questions} Questions</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link to={`/quiz/${subject.id}`} className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium h-11 group">
                        Start Quiz
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to={`/concepts/${subject.id}`}>
                      <Button
                        variant="outline"
                        className="font-medium h-11 group"
                      >
                        Learn
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Unlock Rewards!
          </h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Complete all 4 quizzes this week to earn rewards. Collect points
            and unlock exclusive prizes like books, pens, and bags!
          </p>
          <Link to="/rewards">
            <Button
              size="lg"
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 font-semibold"
            >
              View Rewards <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
