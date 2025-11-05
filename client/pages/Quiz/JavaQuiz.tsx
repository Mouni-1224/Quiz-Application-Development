import { quizzes } from "@/data/quizzes";
import QuizPageTemplate from "./QuizPageTemplate";

export default function JavaQuiz() {
  return (
    <QuizPageTemplate
      subject="Java"
      questions={quizzes.Java.questions}
      totalTimeMinutes={10}
    />
  );
}
