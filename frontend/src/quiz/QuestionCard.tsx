import type { PublicQuestion } from './types';

type Props = {
  question: PublicQuestion;
  selectedOptionId: string | undefined;
  onSelect: (optionId: string) => void;
};

export function QuestionCard({ question, selectedOptionId, onSelect }: Props) {
  return (
    <div>
      <h2 style={{ fontSize: 22, lineHeight: 1.3, margin: 0, marginBottom: 24 }}>
        {question.text}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {question.options.map((option, idx) => {
          const isSelected = option.id === selectedOptionId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                border: `2px solid ${isSelected ? '#333' : '#ccc'}`,
                background: isSelected ? '#f4f4f4' : '#fff',
                borderRadius: 6,
                cursor: 'pointer',
                font: 'inherit',
                fontSize: 15,
                color: '#222',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 24,
                  color: '#999',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {idx + 1}.
              </span>
              {option.text}
            </button>
          );
        })}
      </div>
    </div>
  );
}
