import type { Answer, PublicQuestion } from './types';

const HASH_VERSION = 'v1';
const ALLOWED_OPTION_IDS = new Set(['a', 'b', 'c', 'd']);

export function encodeAnswers(
  answers: Record<string, string>,
  questions: readonly PublicQuestion[],
): string {
  const chars = questions.map((q) => answers[q.id] ?? '?').join('');
  return `${HASH_VERSION}.${chars}`;
}

export function decodeAnswers(
  rawHash: string,
  questions: readonly PublicQuestion[],
): Answer[] | null {
  const stripped = rawHash.replace(/^#/, '');
  const dotIndex = stripped.indexOf('.');
  if (dotIndex < 0) return null;
  const version = stripped.slice(0, dotIndex);
  const payload = stripped.slice(dotIndex + 1);
  if (version !== HASH_VERSION) return null;
  if (payload.length !== questions.length) return null;

  const answers: Answer[] = [];
  for (let i = 0; i < payload.length; i++) {
    const optionId = payload[i];
    const question = questions[i];
    if (!optionId || !question) return null;
    if (!ALLOWED_OPTION_IDS.has(optionId)) return null;
    if (!question.options.some((o) => o.id === optionId)) return null;
    answers.push({ questionId: question.id, optionId });
  }
  return answers;
}

export function buildShareUrl(hash: string): string {
  const url = new URL(window.location.href);
  url.hash = hash;
  return url.toString();
}

export async function copyShareLink(hash: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(buildShareUrl(hash));
    return true;
  } catch {
    return false;
  }
}

export function clearHashFromUrl(): void {
  if (window.location.hash) {
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
}

export function printResult(filename: string): void {
  const original = document.title;
  document.title = filename;
  window.print();
  setTimeout(() => {
    document.title = original;
  }, 200);
}
