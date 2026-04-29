import type { Answer, PublicQuestion, ScoreResult } from './types';

export async function fetchQuestions(): Promise<PublicQuestion[]> {
  const response = await fetch('/api/quiz/questions');
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = (await response.json()) as { questions: PublicQuestion[] };
  return data.questions;
}

export async function postScore(answers: Answer[]): Promise<ScoreResult> {
  const response = await fetch('/api/quiz/score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return (await response.json()) as ScoreResult;
}
