export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Axis = 'mleti' | 'narcis' | 'komatsu' | 'rituals';

export const AXES: readonly Axis[] = ['mleti', 'narcis', 'komatsu', 'rituals'] as const;

export type Option = {
  id: string;
  text: string;
  scores: Partial<Record<Axis, number>>;
  betrayal?: number;
};

export type Question = {
  id: string;
  text: string;
  options: readonly [Option, Option, Option, Option];
};

export type Answer = { questionId: string; optionId: string };

export type AxisProfile = Record<Axis, number>;

export type ScoreResult = {
  levelId: LevelId;
  levelSlug: string;
  axes: AxisProfile;
  axisMax: AxisProfile;
  betrayalScore: number;
};

export type PublicOption = { id: string; text: string };

export type PublicQuestion = {
  id: string;
  text: string;
  options: PublicOption[];
};
