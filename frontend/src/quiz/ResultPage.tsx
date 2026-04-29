import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { findLevelById } from '../lore/loreContent';
import { MarkdownView } from '../lore/MarkdownView';
import { AxisBar } from './AxisBar';
import { AXIS_LABELS } from './levels';
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
  padding: '2rem',
  maxWidth: 720,
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
  const isBetrayer = result.levelId === 8;
  const levelDoc = findLevelById(result.levelId);
  const model = typeof levelDoc?.data.model === 'string' ? levelDoc.data.model : '';
  const epithet = typeof levelDoc?.data.nazev === 'string' ? levelDoc.data.nazev : '';
  const perex = typeof levelDoc?.data.perex === 'string' ? levelDoc.data.perex : '';

  function onShare() {
    void copyShareLink(shareHash).then((ok) => {
      setShareStatus(ok ? 'copied' : 'error');
      setTimeout(() => setShareStatus('idle'), 2500);
    });
  }

  function onPrint() {
    printResult(
      `Bagrista — Úroveň ${result.levelId} ${model}${epithet ? ` ${epithet}` : ''}`,
    );
  }

  return (
    <main style={pageStyle}>
      <style>{PRINT_CSS}</style>

      <h1 style={{ fontSize: 28, margin: 0, marginBottom: 4, lineHeight: 1.2 }}>
        Bagrista úrovně {result.levelId}
      </h1>
      <p style={{ fontSize: 18, color: '#666', margin: 0, marginBottom: 24, fontWeight: 500 }}>
        {model}
        {model && epithet && ' '}
        {epithet}
      </p>

      {perex && (
        <p style={{ fontSize: 17, lineHeight: 1.5, marginBottom: 28, color: '#333' }}>
          {perex}
        </p>
      )}

      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Profil os</h2>
      <div style={{ marginBottom: 32 }}>
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

      {levelDoc && (
        <section
          style={{
            marginTop: 16,
            paddingTop: 24,
            borderTop: '1px solid #eee',
          }}
        >
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>
            Lore stupně
          </h2>
          <MarkdownView body={levelDoc.body} />
          <p style={{ marginTop: 24, fontSize: 14 }}>
            <Link to={`/lore/levels/${levelDoc.slug}`} style={{ color: '#444' }}>
              Otevřít stupeň v Lore →
            </Link>
          </p>
        </section>
      )}

      <div
        className="quiz-no-print"
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid #eee',
        }}
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
