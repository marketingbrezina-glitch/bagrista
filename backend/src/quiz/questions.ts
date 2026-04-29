import type { PublicQuestion, Question } from './types.js';

export const QUIZ_QUESTIONS: readonly Question[] = [
  {
    id: 'q01',
    text: 'Kolega vedle vás v hospodě omylem řekne „Komatsu". Co uděláte?',
    options: [
      {
        id: 'a',
        text: 'Zeptám se, co to znamená.',
        scores: { mleti: -1 },
        betrayal: 2,
      },
      {
        id: 'b',
        text: 'Zachvěji se a rychle změním téma.',
        scores: { komatsu: 1, rituals: 1 },
      },
      {
        id: 'c',
        text: 'Spustím dvacetiminutový monolog o tom, jak Komatsu zničí jeho rodinu.',
        scores: { mleti: 3, narcis: 2, komatsu: 2, rituals: 1 },
      },
      {
        id: 'd',
        text: 'Klidně si připíjím a pousměju se. Komatsu si zaslouží soucit.',
        scores: { komatsu: 3, narcis: 1 },
      },
    ],
  },
  {
    id: 'q02',
    text: 'Šéf se vás na poradě zeptá, jak postupuje váš úkol z minulého týdne. Vy:',
    options: [
      {
        id: 'a',
        text: 'Řeknu, že jsem zatím nezačal.',
        scores: { mleti: -2 },
        betrayal: 3,
      },
      {
        id: 'b',
        text: 'Stručně shrnu, co jsem udělal.',
        scores: {},
        betrayal: 1,
      },
      {
        id: 'c',
        text: 'Začnu od historie projektu, vysvětlím komplexitu, dotknu se sousedního týmu — a otázku tím obejdu.',
        scores: { mleti: 3, narcis: 1 },
      },
      {
        id: 'd',
        text: 'Pošlu graf v PowerPointu se třemi šipkami a na ostatní se mlčky usměju.',
        scores: { mleti: 2, narcis: 3 },
      },
    ],
  },
  {
    id: 'q03',
    text: 'Tým plánuje teambuilding. Vy:',
    options: [
      {
        id: 'a',
        text: 'Přijdu, mlčím, odejdu brzo.',
        scores: { rituals: -1 },
        betrayal: 1,
      },
      {
        id: 'b',
        text: 'Připojím se a nabídnu, že s něčím pomůžu.',
        scores: { rituals: 1 },
      },
      {
        id: 'c',
        text: 'Přijdu pozdě, řeknu jeden vtip, lidi se rozejdou — a mně to nevadí.',
        scores: { mleti: 2, narcis: 2 },
      },
      {
        id: 'd',
        text: 'Přivítám všechny, představím sám sebe a vysvětlím, proč jsem dnes vlastně klíčový.',
        scores: { narcis: 3, mleti: 1 },
      },
    ],
  },
  {
    id: 'q04',
    text: 'Před začátkem směny na bagru:',
    options: [
      {
        id: 'a',
        text: 'Naskočím a jedu.',
        scores: { rituals: -1 },
        betrayal: 2,
      },
      {
        id: 'b',
        text: 'Provedu walk-around — zkontroluju olej, hadičky, podvozek.',
        scores: { rituals: 2 },
      },
      {
        id: 'c',
        text: 'Walk-around plus krátká modlitba k bratru Cataryanovi.',
        scores: { rituals: 3, narcis: 1 },
      },
      {
        id: 'd',
        text: 'Walk-around, modlitba, mazání všech bodů, fotka pro Instagram.',
        scores: { rituals: 3, narcis: 2, mleti: 1 },
      },
    ],
  },
];

export function toPublicQuestion(question: Question): PublicQuestion {
  return {
    id: question.id,
    text: question.text,
    options: question.options.map(({ id, text }) => ({ id, text })),
  };
}
