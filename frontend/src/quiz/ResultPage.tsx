import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Creed } from '../brand/Creed';
import { findLevelById } from '../lore/loreContent';
import { MarkdownView } from '../lore/MarkdownView';
import { AxisBar } from './AxisBar';
import { AXIS_LABELS } from './levels';
import { copyShareLink, printResult } from './share';
import type { Axis, ScoreResult } from './types';

const AXES: readonly Axis[] = ['mleti', 'narcis', 'komatsu', 'rituals'];

const pageStyle: CSSProperties = {
  padding: '40px 28px 80px',
  maxWidth: 880,
  margin: '0 auto',
  color: 'var(--fg)',
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
    printResult(`Bagrista — Úroveň ${result.levelId} ${model}${epithet ? ` ${epithet}` : ''}`);
  }

  return (
    <main style={pageStyle}>
      <div className="page-meta quiz-no-print">
        <Link to="/">Home</Link>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>Výsledek</span>
        <span style={{ flex: 1 }} />
        <span>Stupeň {String(result.levelId).padStart(2, '0')} / 08</span>
      </div>

      <div className="mono-caption" style={{ marginBottom: 12, color: 'var(--accent-num)' }}>
        — Tvůj stupeň —
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 140px) minmax(0, 1fr)',
          gap: 28,
          alignItems: 'flex-start',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            background: isBetrayer ? 'var(--rust)' : 'var(--zlut)',
            color: isBetrayer ? 'var(--parchment)' : 'var(--black)',
            border: '2px solid var(--black)',
            outline: `2px solid ${isBetrayer ? 'var(--rust)' : 'var(--zlut)'}`,
            outlineOffset: 4,
            padding: '20px 18px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--display)',
              fontSize: 64,
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {String(result.levelId).padStart(2, '0')}
          </div>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 10,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              marginTop: 6,
              opacity: 0.8,
            }}
          >
            ze 08
          </div>
        </div>

        <div>
          <h1
            style={{
              fontFamily: 'var(--display)',
              fontSize: 'clamp(40px, 7vw, 72px)',
              letterSpacing: '0.02em',
              lineHeight: 0.95,
              margin: 0,
              marginBottom: 6,
              color: 'var(--fg)',
              textTransform: 'uppercase',
            }}
          >
            Bagrista úrovně {result.levelId}
          </h1>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 12,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--accent-num)',
              marginBottom: 16,
            }}
          >
            {model}
            {model && epithet && ' · '}
            {epithet}
          </div>
          {perex && (
            <p
              style={{
                fontStyle: 'italic',
                fontSize: 19,
                lineHeight: 1.55,
                color: 'var(--fg)',
                margin: 0,
              }}
            >
              {perex}
            </p>
          )}
        </div>
      </div>

      <section style={{ marginBottom: 40 }}>
        <div className="sec-head" style={{ marginTop: 32 }}>
          <span className="num">§ 01</span>
          <h2>Profil os</h2>
        </div>
        <div>
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
          <div style={{ marginTop: 28 }}>
            <Creed label="Verdikt hydrauliky" attrib={`Vzpoura: ${result.betrayalScore} bodů`}>
              Stupeň 8 byl udělen mimo standardní mapování. Tvoje konzistentní volby
              přímosti tě vyřadily z hierarchie. „O tom se nemluví."
            </Creed>
          </div>
        )}
        {!isBetrayer && result.betrayalScore > 0 && (
          <p
            style={{
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--fg-faint)',
              marginTop: 18,
            }}
          >
            Vzpoura: {result.betrayalScore} bodů (k D9 chybělo víc)
          </p>
        )}
      </section>

      {levelDoc && (
        <section style={{ marginBottom: 40 }}>
          <div className="sec-head">
            <span className="num">§ 02</span>
            <h2>Lore stupně</h2>
          </div>
          <MarkdownView body={levelDoc.body} />
          <p style={{ marginTop: 24 }}>
            <Link to={`/lore/levels/${levelDoc.slug}`} className="wikilink">
              Otevřít stupeň v Lore →
            </Link>
          </p>
        </section>
      )}

      <div
        className="quiz-no-print btn-row"
        style={{
          alignItems: 'center',
          marginTop: 32,
          paddingTop: 28,
          borderTop: '1px dashed var(--rule-dashed)',
        }}
      >
        <button type="button" onClick={onShare} className="btn">
          Sdílet
        </button>
        <button type="button" onClick={onPrint} className="btn ghost">
          Stáhnout PDF
        </button>
        <button
          type="button"
          onClick={onRestart}
          style={{
            background: 'none',
            border: 'none',
            font: 'inherit',
            fontFamily: 'var(--mono)',
            fontSize: 11,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--fg-dim)',
            cursor: 'pointer',
            textDecoration: 'underline',
            padding: '10px 0',
          }}
        >
          {restartLabel}
        </button>
        {shareStatus === 'copied' && (
          <span
            style={{
              color: 'var(--accent-num)',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
            }}
          >
            Odkaz zkopírován
          </span>
        )}
        {shareStatus === 'error' && (
          <span
            style={{
              color: 'var(--rust)',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Nepovedlo se · zkopíruj z adresního řádku
          </span>
        )}
      </div>
    </main>
  );
}
