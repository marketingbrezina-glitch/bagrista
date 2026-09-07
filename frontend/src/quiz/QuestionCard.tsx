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
      <div className="lab" style={{ marginBottom: 14 }}>
        Hydraulika se ptá
      </div>
      <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)', marginBottom: 32 }}>
        {question.text}
      </h1>
      <div style={{ display: 'grid', gap: 10 }}>
        {question.options.map((option, idx) => {
          const isSelected = option.id === selectedOptionId;
          return (
            <button
              key={option.id}
              type="button"
              className="opt"
              onClick={() => onSelect(option.id)}
              style={
                isSelected
                  ? {
                      borderColor: 'var(--ink)',
                      background:
                        'linear-gradient(180deg, var(--yellow-2), var(--yellow))',
                    }
                  : undefined
              }
            >
              <b>{LETTERS[idx] ?? String(idx + 1)}</b>
              <span>{option.text}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
