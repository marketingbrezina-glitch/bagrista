export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Axis = 'mleti' | 'narcis' | 'komatsu' | 'rituals';

export type PublicOption = { id: string; text: string };

export type PublicQuestion = {
  id: string;
  text: string;
  options: PublicOption[];
};

export type Answer = { questionId: string; optionId: string };

export type ScoreResult = {
  levelId: LevelId;
  levelSlug: string;
  axes: Record<Axis, number>;
  axisMax: Record<Axis, number>;
  betrayalScore: number;
};
