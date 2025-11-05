import { quizzes } from "@/data/quizzes";
import QuizPageTemplate from "./QuizPageTemplate";

export default function HTMLQuiz() {
  return (
    <QuizPageTemplate
      subject="HTML"
      questions={quizzes.HTML.questions}
      totalTimeMinutes={10}
    />
  );
}
