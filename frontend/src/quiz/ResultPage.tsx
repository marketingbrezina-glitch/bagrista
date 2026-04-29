import type { CSSProperties } from 'react';
import { AxisBar } from './AxisBar';
import { AXIS_LABELS, LEVEL_INFO } from './levels';
import type { Axis, ScoreResult } from './types';

const AXES: readonly Axis[] = ['mleti', 'narcis', 'komatsu', 'rituals'];

const pageStyle: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  padding: '2rem',
  maxWidth: 640,
  margin: '0 auto',
  color: '#222',
};

const buttonStyle: CSSProperties = {
  background: '#333',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: 6,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: 14,
};

const ghostButtonStyle: CSSProperties = {
  ...buttonStyle,
  background: 'none',
  color: '#999',
  cursor: 'default',
  border: '1px dashed #ccc',
};

type Props = {
  result: ScoreResult;
  onRestart: () => void;
};

export function ResultPage({ result, onRestart }: Props) {
  const info = LEVEL_INFO[result.levelId];
  const isBetrayer = result.levelId === 8;

  return (
    <main style={pageStyle}>
      <p style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>Tvůj stupeň</p>
      <h1 style={{ fontSize: 28, margin: 0, marginBottom: 16, lineHeight: 1.2 }}>
        {result.levelId}. {info.name}
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.5, marginBottom: 32, color: '#333' }}>
        {info.description}
      </p>

      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Profil os</h2>
      <div style={{ marginBottom: 24 }}>
        {AXES.map((axis) => (
          <AxisBar
            key={axis}
            label={AXIS_LABELS[axis]}
            score={result.axes[axis]}
            max={result.axisMax[axis]}
          />
        ))}
      </div>

      {isBetrayer && (
        <p style={{ fontSize: 13, color: '#666', marginBottom: 24, fontStyle: 'italic' }}>
          Stupeň 8 byl udělen mimo standardní mapování — tvoje volby přímosti
          (vzpoura: {result.betrayalScore} bodů) tě vyřadily z hierarchie.
        </p>
      )}
      {!isBetrayer && result.betrayalScore > 0 && (
        <p style={{ fontSize: 13, color: '#666', marginBottom: 24 }}>
          Vzpoura: {result.betrayalScore} bodů (k D9 chybělo víc).
        </p>
      )}

      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <button type="button" onClick={onRestart} style={buttonStyle}>
          Spočítat znovu
        </button>
        <button type="button" disabled style={ghostButtonStyle}>
          Sdílet (brzy)
        </button>
      </div>
    </main>
  );
}
