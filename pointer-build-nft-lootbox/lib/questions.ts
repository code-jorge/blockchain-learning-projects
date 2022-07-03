export type Question = {
  questionText: string;
  image?: string;
  answers: string[];
  correctAnswerIndex?: number;
};

const quizQuestions: Question[] = [
  {
    questionText: "Are you a good person?",
    answers: [
      "yes",
      "no",
    ],
    correctAnswerIndex: 0,
  },
];

export default quizQuestions;
