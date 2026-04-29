import type { PublicQuestion } from './types';

const LETTERS = ['A', 'B', 'C', 'D'];

type Props = {
  question: PublicQuestion;
  selectedOptionId: string | undefined;
  onSelect: (optionId: string) => void;
};

export function QuestionCard({ question, selectedOptionId, onSelect }: Props) {
  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(32px, 5.5vw, 56px)',
          letterSpacing: '0.01em',
          lineHeight: 1.05,
          margin: 0,
          marginBottom: 32,
          color: 'var(--fg)',
        }}
      >
        {question.text}
      </h2>
      <div style={{ display: 'grid', gap: 14 }}>
        {question.options.map((option, idx) => {
          const isSelected = option.id === selectedOptionId;
          const letter = LETTERS[idx] ?? String(idx + 1);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 18,
                textAlign: 'left',
                padding: '20px 24px',
                background: isSelected ? 'var(--bg-3)' : 'var(--bg-2)',
                border: `2px solid ${isSelected ? 'var(--zlut)' : 'var(--rule)'}`,
                color: 'var(--fg)',
                cursor: 'pointer',
                font: 'inherit',
                fontSize: 17,
                lineHeight: 1.5,
                transition: 'background .15s, border-color .15s',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--zlut)';
                  e.currentTarget.style.background = 'var(--bg-3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'var(--rule)';
                  e.currentTarget.style.background = 'var(--bg-2)';
                }
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  background: isSelected ? 'var(--zlut)' : 'var(--bg)',
                  color: 'var(--black)',
                  border: '2px solid var(--black)',
                  fontFamily: 'var(--mono)',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: 0,
                }}
              >
                {letter}
              </span>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
