import { QUIZ_QUESTIONS, toPublicQuestion } from './questions';
import { scoreAnswers } from './scoring';
import type { Answer, PublicQuestion, ScoreResult } from './types';

export async function fetchQuestions(): Promise<PublicQuestion[]> {
  return QUIZ_QUESTIONS.map(toPublicQuestion);
}

export async function postScore(answers: Answer[]): Promise<ScoreResult> {
  return scoreAnswers(QUIZ_QUESTIONS, answers);
}
