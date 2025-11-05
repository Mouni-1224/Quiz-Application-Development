import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SpeakerButton } from "@/components/SpeakerButton";
import { Storage, QuizAttempt } from "@/lib/storage";
import { Question } from "@/data/quizzes";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface QuizPageTemplateProps {
  subject: string;
  questions: Question[];
  totalTimeMinutes?: number;
}

export default function QuizPageTemplate({
  subject,
  questions,
  totalTimeMinutes = 10,
}: QuizPageTemplateProps) {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>(
    {}
  );
  const [timeLeft, setTimeLeft] = useState(totalTimeMinutes * 60);
  const [showReview, setShowReview] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 || isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectAnswer = (optionIndex: number) => {
    if (!isSubmitted) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: optionIndex,
      });
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentQuestion(index);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowReview(true);

    // Calculate score
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    // Calculate points (10 points for perfect, proportional otherwise)
    const percentage = (correctCount / questions.length) * 100;
    const points = Math.round((percentage / 100) * 10);

    // Save quiz attempt
    const attempt: QuizAttempt = {
      subject: subject,
      score: correctCount,
      totalQuestions: questions.length,
      answers: selectedAnswers,
      completedAt: Date.now(),
    };

    Storage.addQuizAttempt(attempt);
    Storage.addWeeklyPoints(points, subject.toLowerCase());

    // Store result for results page
    sessionStorage.setItem(
      "quizResult",
      JSON.stringify({
        subject,
        score: correctCount,
        totalQuestions: questions.length,
        answers: selectedAnswers,
        points,
      })
    );
  };

  const question = questions[currentQuestion];
  const answered = currentQuestion in selectedAnswers;
  const isAnswerCorrect =
    answered && selectedAnswers[currentQuestion] === question.correctIndex;

  const answeredCount = Object.keys(selectedAnswers).length;
  const progress = (answeredCount / questions.length) * 100;

  const questionContent = `Question ${currentQuestion + 1}. ${question.text} Options: ${question.options.join(", ")}`;

  if (isSubmitted) {
    return (
      <div className="min-h-screen py-8 md:py-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Results Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
              Quiz Completed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Review your answers below
            </p>
          </div>

          {/* Score Summary */}
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm opacity-80 mb-1">Total Questions</p>
                <p className="text-3xl font-bold">{questions.length}</p>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Correct Answers</p>
                <p className="text-3xl font-bold">
                  {Object.values(selectedAnswers).filter(
                    (idx, qIdx) =>
                      idx === questions.find((_, i) => i === qIdx)?.correctIndex
                  ).length}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Wrong Answers</p>
                <p className="text-3xl font-bold">
                  {questions.length -
                    Object.values(selectedAnswers).filter(
                      (idx, qIdx) =>
                        idx ===
                        questions.find((_, i) => i === qIdx)?.correctIndex
                    ).length}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-80 mb-1">Percentage</p>
                <p className="text-3xl font-bold">
                  {Math.round(
                    (Object.values(selectedAnswers).filter(
                      (idx, qIdx) =>
                        idx ===
                        questions.find((_, i) => i === qIdx)?.correctIndex
                    ).length /
                      questions.length) *
                      100
                  )}
                  %
                </p>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="space-y-6 mb-8">
            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[idx];
              const isCorrect = userAnswer === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`rounded-xl border-2 p-6 ${
                    isCorrect
                      ? "border-green-500/30 bg-green-50"
                      : "border-red-500/30 bg-red-50"
                  }`}
                >
                  <div className="flex gap-4 mb-4">
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-3">
                        Question {idx + 1}: {q.text}
                      </h3>

                      <div className="space-y-2 mb-4">
                        {q.options.map((option, optIdx) => (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg text-sm ${
                              optIdx === userAnswer
                                ? isCorrect
                                  ? "bg-green-100 border border-green-300"
                                  : "bg-red-100 border border-red-300"
                                : optIdx === q.correctIndex
                                  ? "bg-green-100 border border-green-300"
                                  : "bg-white border border-border"
                            }`}
                          >
                            {option}
                            {optIdx === q.correctIndex && (
                              <span className="ml-2 text-green-700 font-semibold">
                                ✓ Correct
                              </span>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="bg-white rounded p-3 border border-border">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-semibold">Explanation:</span>{" "}
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-col sm:flex-row">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="flex-1 h-11"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => {
                setSelectedAnswers({});
                setCurrentQuestion(0);
                setIsSubmitted(false);
                setShowReview(false);
                setTimeLeft(totalTimeMinutes * 60);
              }}
              className="flex-1 h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              Try Again
            </Button>
            <Button
              onClick={() => navigate("/rewards")}
              className="flex-1 h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              View Rewards
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              {subject} Quiz
            </h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-lg ${
              timeLeft < 60
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-blue-100 text-blue-700 border border-blue-300"
            }`}
          >
            <Clock className="h-6 w-6" />
            {formatTime(timeLeft)}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Progress
            </span>
            <span className="text-sm font-medium text-primary">
              {answeredCount}/{questions.length} answered
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Question Section */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-border/50">
              {/* Question with Speaker */}
              <div className="flex items-start justify-between mb-8">
                <h2 className="text-2xl font-heading font-bold text-foreground flex-1 pr-4">
                  {question.text}
                </h2>
                <SpeakerButton text={questionContent} size="md" />
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    disabled={isSubmitted}
                    className={`w-full p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 flex items-start gap-4 group ${
                      selectedAnswers[currentQuestion] === idx
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border hover:border-primary/50 bg-white hover:bg-primary/2"
                    } disabled:cursor-not-allowed`}
                  >
                    <span
                      className={`flex-shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        selectedAnswers[currentQuestion] === idx
                          ? "border-primary bg-primary text-white"
                          : "border-border group-hover:border-primary/50"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex gap-4 pt-8 border-t border-border">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex-1" />

                {currentQuestion === questions.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 gap-2"
                  >
                    Submit Quiz
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Questions Overview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-border/50 sticky top-24">
              <h3 className="font-semibold text-foreground mb-4">
                Questions Overview
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {questions.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleJumpToQuestion(idx)}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                      idx === currentQuestion
                        ? "bg-primary text-white ring-2 ring-primary ring-offset-2"
                        : idx in selectedAnswers
                          ? "bg-accent text-white hover:bg-accent/90"
                          : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded bg-muted" />
                  <span className="text-muted-foreground">Not answered</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded bg-accent" />
                  <span className="text-muted-foreground">Answered</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded bg-primary" />
                  <span className="text-muted-foreground">Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
