import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from '../analytics';
import { str } from '../lore/frontmatter';
import { findLevelById, getOutro } from '../lore/loreContent';
import { MarkdownView } from '../lore/MarkdownView';
import { AxisBar } from './AxisBar';
import { AXIS_LABELS } from './levels';
import { copyShareLink, printResult } from './share';
import type { Axis, ScoreResult } from './types';

const AXES: readonly Axis[] = ['mleti', 'narcis', 'komatsu', 'rituals'];

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
  const model = str(levelDoc, 'model');
  const epithet = str(levelDoc, 'nazev');
  const perex = str(levelDoc, 'perex');
  const outro = getOutro('levels');

  function onShare() {
    void copyShareLink(shareHash).then((ok) => {
      trackEvent('result_share', { level_id: result.levelId, success: ok });
      setShareStatus(ok ? 'copied' : 'error');
      setTimeout(() => setShareStatus('idle'), 2500);
    });
  }

  function onPrint() {
    trackEvent('result_print', { level_id: result.levelId });
    printResult(`Bagrista — Úroveň ${result.levelId} ${model}${epithet ? ` ${epithet}` : ''}`);
  }

  return (
    <main>
      <div className="crumb lab quiz-no-print">
        <Link to="/">Domů</Link>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>Výsledek</span>
        <span style={{ marginLeft: 'auto' }}>
          Stupeň {String(result.levelId).padStart(2, '0')} / 08
        </span>
      </div>

      <section className="head" style={{ gridTemplateColumns: '1fr 260px' }}>
        <div>
          <div className="by lab">
            <span>Výsledek</span>
            {isBetrayer && <span style={{ color: 'var(--red)' }}>Exkomunikován</span>}
          </div>
          <div className="lab" style={{ marginBottom: 8 }}>
            Hydraulika tě zařadila na
          </div>
          <h1 style={{ fontSize: 'clamp(48px, 7vw, 92px)', fontWeight: 900 }}>
            {epithet || `Úroveň ${result.levelId}`}
          </h1>
          <p className="dk" style={{ fontStyle: 'normal', fontSize: 17 }}>
            Bagrista úrovně {result.levelId}
            {model && ` · ${model}`}
          </p>
        </div>

        <div
          className="card"
          style={{
            textAlign: 'center',
            ...(isBetrayer
              ? { borderColor: 'var(--red)', borderStyle: 'dashed', background: 'transparent' }
              : {
                  background: 'linear-gradient(180deg, #FFDA5A, var(--yellow))',
                  borderColor: '#D9A80C',
                }),
          }}
        >
          <div className="lab" style={{ color: isBetrayer ? 'var(--red)' : 'var(--ink-2)' }}>
            Stupeň
          </div>
          <div
            style={{
              fontFamily: 'var(--np)',
              fontWeight: 900,
              fontSize: 120,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: isBetrayer ? 'var(--red)' : 'var(--ink)',
            }}
          >
            {String(result.levelId).padStart(2, '0')}
          </div>
          <div className="lab" style={{ color: isBetrayer ? 'var(--red)' : 'var(--ink-2)' }}>
            z 08
          </div>
        </div>
      </section>

      <section className="sec two">
        <div>
          <div className="sh top">
            <span>Výklad</span>
            {epithet && <span>{epithet}</span>}
          </div>
          <div className="body">
            {perex && <p>{perex}</p>}
            {isBetrayer ? (
              <p style={{ color: 'var(--red)' }}>
                Stupeň 8 byl udělen mimo standardní mapování — tvoje konzistentní volby
                přímosti tě vyřadily z hierarchie. Vzpoura: {result.betrayalScore} bodů.
                „O tom se nemluví."
              </p>
            ) : (
              <p style={{ color: 'var(--ink-2)', fontStyle: 'italic' }}>
                Pravda je proměnlivá. Motohodiny stoupají. Možná za rok budeš jinde.
                {result.betrayalScore > 0 &&
                  ` (Vzpoura: ${result.betrayalScore} bodů — k D9 chybělo víc.)`}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="sh top">
            <span>Profil os</span>
          </div>
          {AXES.map((axis) => (
            <AxisBar
              key={axis}
              label={AXIS_LABELS[axis]}
              score={result.axes[axis]}
              max={result.axisMax[axis]}
            />
          ))}

          {outro && (
            <div className="note">
              <div className="lab">{str(outro, 'nazev', 'Závěrečné požehnání')}</div>
              <div className="lore-prose" style={{ marginTop: 8 }}>
                <MarkdownView body={outro.body} />
              </div>
            </div>
          )}
        </div>
      </section>

      {levelDoc && (
        <section className="sec">
          <div className="sh top" style={{ maxWidth: 760 }}>
            <span>Lore stupně</span>
            <span>{model}</span>
          </div>
          <MarkdownView body={levelDoc.body} />
          <p style={{ marginTop: 24 }}>
            <Link to={`/lore/levels/${levelDoc.slug}`} className="wikilink">
              Otevřít stupeň v Lore →
            </Link>
          </p>
        </section>
      )}

      <section
        className="sec quiz-no-print"
        style={{
          borderBottom: 0,
          display: 'flex',
          gap: 12,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div className="btn-row" style={{ alignItems: 'center' }}>
          <button type="button" onClick={onShare} className="btn">
            Sdílet
          </button>
          <button type="button" onClick={onPrint} className="btn o">
            Stáhnout PDF
          </button>
          <Link to="/lore/levels" className="btn o">
            Všech 8 stupňů
          </Link>
          {shareStatus === 'copied' && <span className="lab">Odkaz zkopírován</span>}
          {shareStatus === 'error' && (
            <span className="lab" style={{ color: 'var(--red)' }}>
              Nepovedlo se · zkopíruj z adresního řádku
            </span>
          )}
        </div>
        <button type="button" onClick={onRestart} className="btn o">
          {restartLabel}
        </button>
      </section>
    </main>
  );
}
