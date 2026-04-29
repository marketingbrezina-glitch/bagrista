import { useEffect, useState, type CSSProperties } from 'react';
import { fetchQuestions, postScore } from './api';
import { Progress } from './Progress';
import { QuestionCard } from './QuestionCard';
import { ResultPage } from './ResultPage';
import { clearHashFromUrl, decodeAnswers, encodeAnswers } from './share';
import type { Answer, PublicQuestion, ScoreResult } from './types';

const pageStyle: CSSProperties = {
  padding: '40px 28px 80px',
  maxWidth: 760,
  margin: '0 auto',
  color: 'var(--fg)',
};

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
    setAnswers((prev) => ({ ...prev, [current.id]: optionId }));
    setCurrentIndex((idx) => idx + 1);
  }

  function goBack() {
    setCurrentIndex((idx) => Math.max(0, idx - 1));
  }

  function restart() {
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
      <main style={pageStyle}>
        <div className="mono-caption" style={{ color: 'var(--rust)', marginBottom: 16 }}>
          — Hydraulika spí —
        </div>
        <h1 style={{ fontFamily: 'var(--display)', fontSize: 40, margin: 0, marginBottom: 12 }}>
          Otázky se nenačetly
        </h1>
        <p style={{ color: 'var(--fg-dim)' }}>{error}</p>
        <p style={{ color: 'var(--fg-faint)', fontSize: 14 }}>
          Backend musí běžet na <code>:3001</code>.
        </p>
      </main>
    );
  }

  if (!questions) {
    return (
      <main style={pageStyle}>
        <div className="mono-caption">— Hydraulika se připravuje —</div>
        <p style={{ marginTop: 12 }}>Načítám otázky…</p>
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
        <main style={pageStyle}>
          <div className="mono-caption" style={{ color: 'var(--rust)' }}>
            — Hydraulika prskla —
          </div>
          <p style={{ marginTop: 12, marginBottom: 24 }}>Výsledek se nepodařilo spočítat.</p>
          <button type="button" onClick={retryScoring} className="btn">
            Zkusit znovu
          </button>
        </main>
      );
    }
    return (
      <main style={pageStyle}>
        <Progress current={questions.length} total={questions.length} />
        <div style={{ marginTop: 64, textAlign: 'center' }}>
          <div className="mono-caption">— Hydraulika počítá —</div>
          <p style={{ fontFamily: 'var(--display)', fontSize: 32, marginTop: 12 }}>
            Skládám tvůj profil…
          </p>
        </div>
      </main>
    );
  }

  const current = questions[currentIndex];
  if (!current) return null;

  return (
    <main style={pageStyle}>
      <div className="mono-caption" style={{ marginBottom: 12, color: 'var(--accent-num)' }}>
        — Hydraulika se ptá —
      </div>
      <Progress current={currentIndex + 1} total={questions.length} />
      <div style={{ marginTop: 40 }}>
        <QuestionCard
          question={current}
          selectedOptionId={answers[current.id]}
          onSelect={selectOption}
        />
      </div>
      <div
        style={{
          marginTop: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--fg-faint)',
        }}
      >
        <button
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0}
          style={{
            ...navButtonStyle(currentIndex === 0),
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}
        >
          ← Zpět
        </button>
        <span>Klávesy 1–4 vyberou · ← vrátí</span>
      </div>
    </main>
  );
}

function navButtonStyle(disabled: boolean): CSSProperties {
  return {
    background: 'none',
    border: 'none',
    color: disabled ? 'var(--fg-faint)' : 'var(--fg-dim)',
    cursor: disabled ? 'default' : 'pointer',
    font: 'inherit',
    padding: 0,
  };
}
