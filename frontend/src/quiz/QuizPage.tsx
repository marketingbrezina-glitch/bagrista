import { useEffect, useState, type CSSProperties } from 'react';
import { fetchQuestions } from './api';
import { Progress } from './Progress';
import { QuestionCard } from './QuestionCard';
import type { PublicQuestion } from './types';

const pageStyle: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  padding: '2rem',
  maxWidth: 640,
  margin: '0 auto',
  color: '#222',
};

export function QuizPage() {
  const [questions, setQuestions] = useState<PublicQuestion[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setError(`Otázky se nepodařilo načíst (${msg}).`);
      });
  }, []);

  useEffect(() => {
    if (!questions) return;

    function onKey(e: KeyboardEvent) {
      if (!questions) return;
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
  }, [questions, currentIndex]);

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

  if (error) {
    return (
      <main style={pageStyle}>
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>Bagrista — kvíz</h1>
        <p>{error}</p>
        <p style={{ color: '#666', fontSize: 14 }}>
          Backend musí běžet na <code>:3001</code>.
        </p>
      </main>
    );
  }

  if (!questions) {
    return (
      <main style={pageStyle}>
        <p>Načítám otázky…</p>
      </main>
    );
  }

  if (currentIndex >= questions.length) {
    return (
      <main style={pageStyle}>
        <Progress current={questions.length} total={questions.length} />
        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 20, marginBottom: 8 }}>
            Vyplnil jsi všech {questions.length} otázek.
          </p>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 32 }}>
            Výsledková stránka přijde v dalším kroku.
          </p>
          <button type="button" onClick={goBack} style={navButtonStyle(false)}>
            ← Zpět na poslední otázku
          </button>
        </div>
      </main>
    );
  }

  const current = questions[currentIndex];
  if (!current) return null;

  return (
    <main style={pageStyle}>
      <h1 style={{ fontSize: 20, color: '#666', fontWeight: 400, marginBottom: 24 }}>
        Bagrista — kvíz
      </h1>
      <Progress current={currentIndex + 1} total={questions.length} />
      <div style={{ marginTop: 32 }}>
        <QuestionCard
          question={current}
          selectedOptionId={answers[current.id]}
          onSelect={selectOption}
        />
      </div>
      <div
        style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#666',
          fontSize: 13,
        }}
      >
        <button
          type="button"
          onClick={goBack}
          disabled={currentIndex === 0}
          style={navButtonStyle(currentIndex === 0)}
        >
          ← Zpět
        </button>
        <span>Klávesy 1–4 vyberou, ← vrátí</span>
      </div>
    </main>
  );
}

function navButtonStyle(disabled: boolean): CSSProperties {
  return {
    background: 'none',
    border: 'none',
    color: disabled ? '#ccc' : '#333',
    cursor: disabled ? 'default' : 'pointer',
    font: 'inherit',
    padding: 0,
  };
}
