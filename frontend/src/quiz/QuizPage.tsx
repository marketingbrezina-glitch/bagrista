import { useEffect, useState } from 'react';
import { trackEvent } from '../analytics';
import { fetchQuestions, postScore } from './api';
import { Progress } from './Progress';
import { QuestionCard } from './QuestionCard';
import { ResultPage } from './ResultPage';
import { clearHashFromUrl, decodeAnswers, encodeAnswers } from './share';
import type { Answer, PublicQuestion, ScoreResult } from './types';

export function QuizPage() {
  const [questions, setQuestions] = useState<PublicQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [scoring, setScoring] = useState<'idle' | 'loading' | 'error'>('idle');
  const [cameFromHash, setCameFromHash] = useState(false);
  const [hashHandled, setHashHandled] = useState(false);

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Otázky se nepodařilo načíst (${msg}).`);
      });
  }, []);

  useEffect(() => {
    if (!questions || hashHandled) return;
    setHashHandled(true);
    const decoded = decodeAnswers(window.location.hash, questions);
    if (!decoded) return;
    const record: Record<string, string> = {};
    for (const a of decoded) record[a.questionId] = a.optionId;
    setAnswers(record);
    setCameFromHash(true);
    setScoring('loading');
    postScore(decoded)
      .then((r) => {
        setResult(r);
        setScoring('idle');
        trackEvent('result_view_shared', { level_id: r.levelId, level_slug: r.levelSlug });
      })
      .catch(() => setScoring('error'));
  }, [questions, hashHandled]);

  useEffect(() => {
    if (!questions || result) return;
    if (currentIndex < questions.length) return;
    if (scoring !== 'idle') return;

    const payload: Answer[] = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId,
      optionId,
    }));
    setScoring('loading');
    postScore(payload)
      .then((r) => {
        setResult(r);
        setScoring('idle');
        trackEvent('quiz_complete', {
          level_id: r.levelId,
          level_slug: r.levelSlug,
          betrayal_score: r.betrayalScore,
        });
      })
      .catch(() => setScoring('error'));
  }, [questions, currentIndex, answers, result, scoring]);

  useEffect(() => {
    if (!questions) return;

    function onKey(e: KeyboardEvent) {
      if (!questions || result) return;
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((idx) => Math.max(0, idx - 1));
        return;
      }
      const current = questions[currentIndex];
      if (!current) return;
      if (e.key >= '1' && e.key <= '4') {
        const optionIndex = Number(e.key) - 1;
        const option = current.options[optionIndex];
        if (option) selectOption(option.id);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, currentIndex, result]);

  function selectOption(optionId: string) {
    if (!questions) return;
    const current = questions[currentIndex];
    if (!current) return;
    if (Object.keys(answers).length === 0) trackEvent('quiz_start');
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
    setCurrentIndex((idx) => idx + 1);
  }

  function goBack() {
    setCurrentIndex((idx) => Math.max(0, idx - 1));
  }

  function restart() {
    trackEvent('quiz_restart', { from_shared: cameFromHash });
    setAnswers({});
    setCurrentIndex(0);
    setResult(null);
    setScoring('idle');
    setCameFromHash(false);
    setHashHandled(true);
    clearHashFromUrl();
  }

  function retryScoring() {
    setScoring('idle');
  }

  if (error) {
    return (
      <main>
        <section className="head solo">
          <div>
            <div className="by lab">
              <span style={{ color: 'var(--red)' }}>Hydraulika spí</span>
            </div>
            <h1>Otázky se nenačetly</h1>
            <p className="dk">{error}</p>
          </div>
        </section>
      </main>
    );
  }

  if (!questions) {
    return (
      <main>
        <section className="head solo">
          <div>
            <div className="by lab">
              <span>Hydraulika se připravuje</span>
            </div>
            <h1>Načítám otázky…</h1>
          </div>
        </section>
      </main>
    );
  }

  if (result) {
    const shareHash = encodeAnswers(answers, questions);
    return (
      <ResultPage
        result={result}
        shareHash={shareHash}
        onRestart={restart}
        restartLabel={cameFromHash ? 'Vyzkoušet sám' : 'Spočítat znovu'}
      />
    );
  }

  if (currentIndex >= questions.length) {
    if (scoring === 'error') {
      return (
        <main>
          <section className="head solo">
            <div>
              <div className="by lab">
                <span style={{ color: 'var(--red)' }}>Hydraulika prskla</span>
              </div>
              <h1>Výsledek se nepodařilo spočítat</h1>
            </div>
          </section>
          <section className="sec" style={{ borderBottom: 0 }}>
            <button type="button" onClick={retryScoring} className="btn">
              Zkusit znovu
            </button>
          </section>
        </main>
      );
    }
    return (
      <main>
        <Progress current={questions.length} total={questions.length} />
        <section className="sec" style={{ borderBottom: 0, textAlign: 'center', paddingTop: 72 }}>
          <div className="lab" style={{ marginBottom: 12 }}>
            Hydraulika počítá
          </div>
          <h1 style={{ fontSize: 40 }}>Skládám tvůj profil…</h1>
        </section>
      </main>
    );
  }

  const current = questions[currentIndex];
  if (!current) return null;

  return (
    <main>
      <Progress current={currentIndex + 1} total={questions.length} />

      <section className="sec" style={{ maxWidth: 860, borderBottom: 0 }}>
        <QuestionCard
          question={current}
          selectedOptionId={answers[current.id]}
          onSelect={selectOption}
        />

        <div
          style={{
            marginTop: 32,
            paddingTop: 18,
            borderTop: '1px solid var(--hair)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            flexWrap: 'wrap',
          }}
        >
          <button
            type="button"
            onClick={goBack}
            disabled={currentIndex === 0}
            className="btn o"
          >
            ← Zpět
          </button>
          <span className="lab">Klávesy 1–4 vyberou · ← vrátí</span>
        </div>
      </section>
    </main>
  );
}
