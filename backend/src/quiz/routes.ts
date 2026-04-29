import type { FastifyPluginAsync } from 'fastify';
import { QUIZ_QUESTIONS, toPublicQuestion } from './questions.js';
import { scoreAnswers } from './scoring.js';
import type { Answer } from './types.js';

export const quizRoutes: FastifyPluginAsync = async (app) => {
  app.get('/api/quiz/questions', async () => {
    return { questions: QUIZ_QUESTIONS.map(toPublicQuestion) };
  });

  app.post<{ Body: { answers: Answer[] } }>(
    '/api/quiz/score',
    {
      schema: {
        body: {
          type: 'object',
          required: ['answers'],
          additionalProperties: false,
          properties: {
            answers: {
              type: 'array',
              items: {
                type: 'object',
                required: ['questionId', 'optionId'],
                additionalProperties: false,
                properties: {
                  questionId: { type: 'string', minLength: 1 },
                  optionId: { type: 'string', minLength: 1 },
                },
              },
            },
          },
        },
      },
    },
    async (request) => {
      const { answers } = request.body;
      return scoreAnswers(QUIZ_QUESTIONS, answers);
    },
  );
};
