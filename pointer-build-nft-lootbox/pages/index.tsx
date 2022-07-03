import QuizGame from "../components/quiz-game";
import quizQuestions from "../lib/questions";

export const getStaticProps = ()=> ({
  props: {
    title: "Vibe check!",
  },
})

const Home = ()=> {
  quizQuestions.forEach((q) => delete q.correctAnswerIndex);
  return <QuizGame questions={quizQuestions} />;
}

export default Home