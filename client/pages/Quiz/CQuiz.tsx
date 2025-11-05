import { quizzes } from "@/data/quizzes";
import QuizPageTemplate from "./QuizPageTemplate";

export default function CQuiz() {
  return (
    <QuizPageTemplate
      subject="C"
      questions={quizzes.C.questions}
      totalTimeMinutes={10}
    />
  );
}
