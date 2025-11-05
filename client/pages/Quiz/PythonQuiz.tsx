import { quizzes } from "@/data/quizzes";
import QuizPageTemplate from "./QuizPageTemplate";

export default function PythonQuiz() {
  return (
    <QuizPageTemplate
      subject="Python"
      questions={quizzes.Python.questions}
      totalTimeMinutes={10}
    />
  );
}
