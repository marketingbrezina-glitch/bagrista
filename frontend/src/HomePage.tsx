import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { Bucket } from './brand/Bucket';
import { Creed } from './brand/Creed';

const heroSection: CSSProperties = {
  background: 'var(--bg)',
  position: 'relative',
  overflow: 'hidden',
};

const ohlasenStyle: CSSProperties = {
  fontFamily: 'var(--mono)',
  fontSize: 11,
  letterSpacing: '0.42em',
  textTransform: 'uppercase',
  color: 'var(--accent-num)',
  marginBottom: 28,
  display: 'flex',
  gap: 20,
  alignItems: 'center',
};

const heroGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
  gap: 60,
  alignItems: 'end',
};

const wordmarkLabel: CSSProperties = {
  fontFamily: 'var(--headline)',
  fontWeight: 500,
  fontSize: 22,
  letterSpacing: '0.55em',
  textTransform: 'uppercase',
  color: 'var(--fg-dim)',
  marginBottom: 12,
  paddingLeft: '0.55em',
};

const wordmarkH1: CSSProperties = {
  fontFamily: "'Archivo Black', 'Anton', sans-serif",
  fontSize: 'clamp(80px, 13vw, 200px)',
  lineHeight: 0.88,
  letterSpacing: '-0.012em',
  textTransform: 'uppercase',
  color: 'var(--fg)',
  margin: 0,
};

const heroLead: CSSProperties = {
  fontFamily: 'var(--body)',
  fontStyle: 'italic',
  fontSize: 22,
  lineHeight: 1.5,
  color: 'var(--fg-dim)',
  maxWidth: 580,
  marginTop: 32,
};

const dataSheet: CSSProperties = {
  background: 'var(--bg-2)',
  border: '1px solid var(--rule)',
  padding: '24px 24px',
  position: 'relative',
};

const sheetTitle: CSSProperties = {
  fontFamily: 'var(--display)',
  fontSize: 26,
  letterSpacing: '0.04em',
  color: 'var(--accent-num)',
  marginBottom: 20,
  lineHeight: 1.1,
};

const STATS: [string, string][] = [
  ['Stupňů víry', '8 + 1'],
  ['Kacířských sekt', '7'],
  ['Otázek v kvízu', '19'],
  ['Doba zařazení', '6 mth'],
];

const PILLARS = [
  {
    num: 'I',
    title: 'KVÍZ',
    kicker: '19 otázek · 6 mth',
    body:
      'Odpověz pravdivě a hydraulika tě zařadí. Některé výsledky budou bolet. Jeden bude ostuda.',
    cta: 'Spusť kvíz',
    to: '/kviz',
  },
  {
    num: 'II',
    title: 'STUPNĚ',
    kicker: '8 stupňů + 1 propast',
    body:
      'Vertikální schody víry. Každý stupeň má svůj model, přezdívku a rituální dovětek.',
    cta: 'Vystup po schodech',
    to: '/lore/levels',
  },
  {
    num: 'III',
    title: 'SEKTY',
    kicker: '7 odpadlických směrů',
    body:
      'Komatsuáni, Hitachisté, Volvoité a další. Co opustili žluť pro jiné barvy.',
    cta: 'Pohleď na hereze',
    to: '/lore/sects',
  },
];

export function HomePage() {
  return (
    <main>
      <section style={heroSection}>
        <div className="container" style={{ padding: '80px 28px 100px', position: 'relative' }}>
          <div style={ohlasenStyle}>
            <span style={{ width: 36, height: 1, background: 'var(--zlut)' }} />
            <span>Vyznání · MTH 0001</span>
            <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
            <span style={{ color: 'var(--fg-dim)' }}>EST. NA MOTOHODINU</span>
          </div>

          <div style={heroGrid}>
            <div>
              <div style={wordmarkLabel}>Jsem</div>
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div
                  style={{
                    position: 'absolute',
                    right: 18,
                    top: -42,
                    transform: 'rotate(-8deg)',
                  }}
                >
                  <Bucket size={68} />
                </div>
                <h1 style={wordmarkH1}>BAGRISTA</h1>
              </div>
              <p style={heroLead}>
                „Věřím v jednu hydrauliku všemohoucí, tvůrkyni výkopů viditelných i
                neviditelných. I v jednoho operátora, syna jejího jediného, jenž se
                počal z dieselu a narodil se z motohodiny."
              </p>
              <div className="btn-row" style={{ marginTop: 36 }}>
                <Link to="/kviz" className="btn">
                  Zjisti svůj stupeň <span style={{ fontSize: 14 }}>→</span>
                </Link>
                <Link to="/lore/levels" className="btn ghost">
                  Čti písmo
                </Link>
              </div>
            </div>

            <aside style={dataSheet}>
              <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 6 }} className="stripes-thin" />
              <div className="mono-caption" style={{ marginTop: 8, marginBottom: 14 }}>
                — Ohlášení —
              </div>
              <div style={sheetTitle}>
                8 stupňů.<br />
                7 sekt.<br />
                1 hydraulika.
              </div>
              <div style={{ display: 'grid', gap: 10 }}>
                {STATS.map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      borderBottom: '1px dashed var(--rule-dashed)',
                      paddingBottom: 6,
                      fontFamily: 'var(--mono)',
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      color: 'var(--fg-dim)',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{k}</span>
                    <span style={{ color: 'var(--fg)' }}>{v}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
        <div style={{ height: 12 }} className="stripes" />
      </section>

      <section className="container" style={{ padding: '80px 28px' }}>
        <div className="sec-head">
          <span className="num">§ 01</span>
          <h2>Co je Bagrista</h2>
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: 60,
            alignItems: 'start',
          }}
        >
          <div style={{ fontSize: 19, lineHeight: 1.7, color: 'var(--fg)' }}>
            <p style={{ marginTop: 0 }} className="dropcap">
              Bagrista není povolání. Je to vyznání. Cesta člověka skrze stupně víry — od
              nejistého <Link to="/lore/levels/cat-301-novacek" className="wikilink">Nováčka</Link> u
              páky pětitunky až k mlčenlivému{' '}
              <Link to="/lore/levels/cat-6090-guru" className="wikilink">Guruovi</Link> v kabině
              tisícitunového stroje. Mezi nimi: Profík, Vyšší zasvěcení, Pravá ruka šéfa
              a další bratři ve <Link to="/lore/concepts/zlut" className="wikilink">žluti</Link>.
            </p>
            <p>
              Tento web je sborník našich textů. Najdeš zde{' '}
              <Link to="/lore/levels" className="wikilink">Stupně</Link> — schody osmi
              stupňů, po nichž stoupá každý.{' '}
              <Link to="/lore/sects" className="wikilink">Sekty</Link> — hereze, které
              opustily pravou žluť. Také{' '}
              <Link to="/lore/modlitebnik" className="wikilink">Modlitebník</Link>,{' '}
              <Link to="/lore/slovnik" className="wikilink">Slovník</Link>, paměť na{' '}
              <Link to="/lore/mucednici" className="wikilink">mučedníky</Link> a kasta
              nečistých — <Link to="/lore/mechanici" className="wikilink">mechanici</Link>,
              kteří stojí mimo strukturu, ale bez nichž stroj zhasne.
            </p>
            <p>Tak jest, na motohodinu.</p>
          </div>
          <Creed label="Liturgická vsuvka" attrib="— pravidlo svatého Hydraula">
            „Skrze pásy, s pásy a v pásech."
          </Creed>
        </div>
      </section>

      <section
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div className="container" style={{ padding: '70px 28px' }}>
          <div className="sec-head" style={{ marginTop: 0 }}>
            <span className="num">§ 02</span>
            <h2>Tři pilíře pravdy</h2>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
              marginTop: 28,
            }}
          >
            {PILLARS.map((p) => (
              <Link
                key={p.num}
                to={p.to}
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--rule)',
                  padding: '28px 24px',
                  position: 'relative',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 16,
                    right: 18,
                    fontFamily: 'var(--display)',
                    fontSize: 36,
                    color: 'var(--accent-num)',
                    opacity: 0.5,
                    letterSpacing: '0.05em',
                  }}
                >
                  {p.num}
                </div>
                <div className="mono-caption" style={{ color: 'var(--accent-num)' }}>
                  {p.kicker}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: 38,
                    color: 'var(--fg)',
                    letterSpacing: '0.04em',
                    margin: '14px 0 12px',
                  }}
                >
                  {p.title}
                </div>
                <p style={{ fontSize: 16, lineHeight: 1.55, color: 'var(--fg-dim)', margin: '0 0 22px' }}>
                  {p.body}
                </p>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: 11,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: 'var(--accent-num)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  {p.cta} <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--zlut)', position: 'relative' }}>
        <div style={{ height: 8 }} className="stripes" />
        <div
          className="container"
          style={{
            padding: '54px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: 11,
                letterSpacing: '0.36em',
                textTransform: 'uppercase',
                color: 'var(--slab-fg)',
                opacity: 0.7,
                marginBottom: 8,
              }}
            >
              — Závěrečné požehnání —
            </div>
            <div
              style={{
                fontFamily: 'var(--body)',
                fontStyle: 'italic',
                fontSize: 28,
                lineHeight: 1.35,
                color: 'var(--slab-fg)',
                maxWidth: 720,
              }}
            >
              „Ať tě žluť provází. Ať tě pásy nesou.
              <br />
              Ať máš lžíci plnou a korbu blízko."
            </div>
          </div>
          <Link to="/kviz" className="btn dark">
            Zjisti svůj stupeň <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>
        <div style={{ height: 8 }} className="stripes" />
      </section>
    </main>
  );
}
