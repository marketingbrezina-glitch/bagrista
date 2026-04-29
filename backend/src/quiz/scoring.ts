import {
  AXES,
  type Answer,
  type Axis,
  type AxisProfile,
  type LevelId,
  type Question,
  type ScoreResult,
} from './types.js';

export const LEVEL_SLUGS: Record<LevelId, string> = {
  1: 'novacek',
  2: 'fanousek',
  3: 'radovy-bagrista',
  4: 'profik',
  5: 'vyssi-zasveceni',
  6: 'prava-ruka-sefa',
  7: 'guru',
  8: 'zradce',
};

const BETRAYAL_THRESHOLD = 6;

const TIER_WEIGHTS: Record<Axis, number> = {
  narcis: 0.4,
  mleti: 0.3,
  komatsu: 0.2,
  rituals: 0.1,
};

export function scoreAnswers(
  questions: readonly Question[],
  answers: readonly Answer[],
): ScoreResult {
  const questionsById = new Map(questions.map((q) => [q.id, q]));
  const axes: AxisProfile = { mleti: 0, narcis: 0, komatsu: 0, rituals: 0 };
  let betrayalScore = 0;

  for (const answer of answers) {
    const question = questionsById.get(answer.questionId);
    if (!question) continue;
    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) continue;
    for (const axis of AXES) {
      axes[axis] += option.scores[axis] ?? 0;
    }
    betrayalScore += option.betrayal ?? 0;
  }

  if (betrayalScore >= BETRAYAL_THRESHOLD) {
    return { levelId: 8, levelSlug: LEVEL_SLUGS[8], axes, betrayalScore };
  }

  const tier = AXES.reduce((acc, axis) => acc + TIER_WEIGHTS[axis] * axes[axis], 0);
  const levelId = tierToLevel(tier);
  return { levelId, levelSlug: LEVEL_SLUGS[levelId], axes, betrayalScore };
}

function tierToLevel(tier: number): LevelId {
  if (tier < 1.5) return 1;
  if (tier < 3) return 2;
  if (tier < 4.5) return 3;
  if (tier < 6) return 4;
  if (tier < 7.5) return 5;
  if (tier < 9) return 6;
  return 7;
}
