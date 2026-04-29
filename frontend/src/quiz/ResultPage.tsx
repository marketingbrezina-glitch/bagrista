import { useState, type CSSProperties } from 'react';
import { AxisBar } from './AxisBar';
import { AXIS_LABELS, LEVEL_INFO } from './levels';
import { copyShareLink, printResult } from './share';
import type { Axis, ScoreResult } from './types';

const AXES: readonly Axis[] = ['mleti', 'narcis', 'komatsu', 'rituals'];

const PRINT_CSS = `
@media print {
  .quiz-no-print { display: none !important; }
  body { background: #fff !important; }
}
`;

const pageStyle: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  padding: '2rem',
  maxWidth: 640,
  margin: '0 auto',
  color: '#222',
};

const primaryButtonStyle: CSSProperties = {
  background: '#333',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: 6,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: 14,
};

const secondaryButtonStyle: CSSProperties = {
  background: '#fff',
  color: '#333',
  border: '1px solid #333',
  padding: '10px 20px',
  borderRadius: 6,
  cursor: 'pointer',
  font: 'inherit',
  fontSize: 14,
};

const ghostButtonStyle: CSSProperties = {
  background: 'none',
  color: '#666',
  border: 'none',
  padding: '10px 0',
  cursor: 'pointer',
  font: 'inherit',
  fontSize: 14,
  textDecoration: 'underline',
};

type Props = {
  result: ScoreResult;
  shareHash: string;
  onRestart: () => void;
  restartLabel: string;
};

export function ResultPage({ result, shareHash, onRestart, restartLabel }: Props) {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const info = LEVEL_INFO[result.levelId];
  const isBetrayer = result.levelId === 8;

  function onShare() {
    void copyShareLink(shareHash).then((ok) => {
      setShareStatus(ok ? 'copied' : 'error');
      setTimeout(() => setShareStatus('idle'), 2500);
    });
  }

  function onPrint() {
    printResult(`Bagrista — Stupeň ${result.levelId} ${info.name}`);
  }

  return (
    <main style={pageStyle}>
      <style>{PRINT_CSS}</style>

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

      <div
        className="quiz-no-print"
        style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
      >
        <button type="button" onClick={onShare} style={primaryButtonStyle}>
          Sdílet
        </button>
        <button type="button" onClick={onPrint} style={secondaryButtonStyle}>
          Stáhnout PDF
        </button>
        <button type="button" onClick={onRestart} style={ghostButtonStyle}>
          {restartLabel}
        </button>
        {shareStatus === 'copied' && (
          <span style={{ color: '#2a7a2a', fontSize: 13 }}>Odkaz zkopírován</span>
        )}
        {shareStatus === 'error' && (
          <span style={{ color: '#a33', fontSize: 13 }}>
            Nepodařilo se zkopírovat — zkus to z adresního řádku.
          </span>
        )}
      </div>
    </main>
  );
}
