// Bagrista — page screens

const { useState, useEffect } = React;

// =============================================================
// HOMEPAGE
// =============================================================
const HomePage = ({ onNav }) => (
  <main>
    {/* HERO */}
    <section style={{ background: 'var(--bg)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ padding: '80px 28px 100px', position: 'relative' }}>

        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11,
          letterSpacing: '0.42em', textTransform: 'uppercase',
          color: 'var(--accent-num)', marginBottom: 28,
          display: 'flex', gap: 20, alignItems: 'center',
        }}>
          <span style={{ width: 36, height: 1, background: 'var(--zlut)' }} />
          <span>Vyznání · MTH 0001</span>
          <span style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          <span style={{ color: 'var(--fg-dim)' }}>EST. NA MOTOHODINU</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 60, alignItems: 'end',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--headline)', fontWeight: 500,
              fontSize: 22, letterSpacing: '0.55em', textTransform: 'uppercase',
              color: 'var(--fg-dim)', marginBottom: 12, paddingLeft: '0.55em',
            }}>Jsem</div>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                position: 'absolute', right: 18, top: -42,
                transform: 'rotate(-8deg)',
              }}>
                <Bucket size={68} color="var(--zlut)" />
              </div>
              <h1 style={{
                fontFamily: "'Archivo Black', 'Anton', sans-serif",
                fontSize: 'clamp(96px, 13vw, 200px)',
                lineHeight: 0.88,
                letterSpacing: '-0.012em',
                textTransform: 'uppercase',
                color: 'var(--fg)',
                margin: 0,
              }}>BAGRISTA</h1>
            </div>
            <p style={{
              fontFamily: 'var(--body)', fontStyle: 'italic',
              fontSize: 22, lineHeight: 1.5,
              color: 'var(--fg-dim)',
              maxWidth: 580, marginTop: 32,
            }}>
              „Věřím v jednu hydrauliku všemohoucí, tvůrkyni výkopů viditelných i neviditelných.
              I v jednoho operátora, syna jejího jediného, jenž se počal z dieselu
              a narodil se z motohodiny."
            </p>
            <div className="btn-row" style={{ marginTop: 36 }}>
              <button className="btn" onClick={() => onNav('quiz')}>
                Zjisti svůj stupeň <span style={{ fontSize: 14 }}>→</span>
              </button>
              <button className="btn ghost" onClick={() => onNav('bridge')}>
                Čti písmo
              </button>
            </div>
          </div>

          {/* Right column: badge / data sheet */}
          <div style={{
            background: 'var(--bg-2)',
            border: `1px solid var(--rule)`,
            padding: '24px 24px',
            position: 'relative',
          }}>
            <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 6 }} className="stripes-thin" />
            <div className="mono-caption" style={{ marginTop: 8, marginBottom: 14 }}>
              — Ohlášení —
            </div>
            <div style={{
              fontFamily: 'var(--display)', fontSize: 26, letterSpacing: '0.04em',
              color: 'var(--accent-num)', marginBottom: 20, lineHeight: 1.1,
            }}>
              8 stupňů.<br/>
              7 sekt.<br/>
              1 hydraulika.
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {[
                ['Stupňů víry', '8 + 1'],
                ['Kanonických sekt', '7'],
                ['Mučedníků', '12'],
                ['Otázek v kvízu', '18'],
                ['Doba zařazení', '6 mth'],
              ].map(([k, v]) => (
                <div key={k} style={{
                  display: 'flex', justifyContent: 'space-between',
                  borderBottom: '1px dashed var(--rule-dashed)', paddingBottom: 6,
                  fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em',
                  color: 'var(--fg-dim)', textTransform: 'uppercase',
                }}>
                  <span>{k}</span>
                  <span style={{ color: 'var(--fg)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: 12 }} className="stripes" />
    </section>

    {/* CO JE BAGRISTA */}
    <section className="container" style={{ padding: '80px 28px' }}>
      <div className="sec-head">
        <span className="num">§ 01</span>
        <h2>Co je Bagrista</h2>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 60, alignItems: 'start',
      }}>
        <div style={{
          fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.7,
          color: 'var(--fg)',
        }}>
          <p style={{ marginTop: 0 }} className="dropcap">
            Bagrista není povolání. Je to <Wiki>vyznání</Wiki>. Cesta člověka skrze
            stupně víry — od nejistého <Wiki>Nováčka</Wiki> u páky pětitunky
            až k mlčenlivému <Wiki>Guruovi</Wiki> v kabině šestitunového dolu.
            Mezi nimi: Profík, Veteran, Mistr, Čaroděj a jiní bratři ve <Wiki>žluti</Wiki>.
          </p>
          <p>
            Tento web je sborník našich textů. Najdeš zde <Wiki>Bridge</Wiki> —
            schody osmi stupňů, po nichž stoupá každý. Najdeš zde
            <Wiki> Sekty</Wiki> — hereze, které opustily pravou žluť a šly za jinými barvami.
            Najdeš <Wiki>Modlitebník</Wiki>, <Wiki>Slovník</Wiki>, paměť na <Wiki>mučedníky</Wiki>
            a kasta nečistých — <Wiki>mechanici</Wiki>, kteří stojí mimo strukturu, ale bez nichž stroj zhasne.
          </p>
          <p>
            Tak jest, na motohodinu.
          </p>
        </div>
        <Creed
          label="Liturgická vsuvka"
          text={<>„Skrze pásy, s pásy a v pásech."</>}
          attrib="— pravidlo svatého Hydraula"
        />
      </div>
    </section>

    {/* THREE PILLARS */}
    <section style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)' }}>
      <div className="container" style={{ padding: '70px 28px' }}>
        <div className="sec-head" style={{ marginTop: 0 }}>
          <span className="num">§ 02</span>
          <h2>Tři pilíře pravdy</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 28 }}>
          {[
            {
              num: 'I',
              title: 'KVÍZ',
              kicker: '18 otázek · 6 mth',
              body: 'Odpověz pravdivě a hydraulika tě zařadí. Některé výsledky budou bolet. Jeden bude ostuda.',
              cta: 'Spusť kvíz',
              key: 'quiz',
            },
            {
              num: 'II',
              title: 'BRIDGE',
              kicker: '7 stupňů + 1 propast',
              body: 'Vertikální schody víry. Každý stupeň má svůj model, přezdívku a rituální dovětek.',
              cta: 'Vystup po schodech',
              key: 'bridge',
            },
            {
              num: 'III',
              title: 'SEKTY',
              kicker: '7 odpadlických směrů',
              body: 'Komatsuáni, Hitachisté, Volvoité a další. Co opustili žluť pro jiné barvy.',
              cta: 'Pohleď na hereze',
              key: 'sects',
            },
          ].map(c => (
            <div key={c.num}
                 style={{
                   background: 'var(--bg)',
                   border: '1px solid var(--rule)',
                   padding: '28px 24px',
                   position: 'relative',
                   cursor: 'pointer',
                   transition: 'transform .15s, border-color .15s',
                 }}
                 onClick={() => onNav(c.key)}
                 onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--zlut)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                position: 'absolute', top: 16, right: 18,
                fontFamily: 'var(--display)', fontSize: 36,
                color: 'var(--accent-num)', opacity: 0.5, letterSpacing: '0.05em',
              }}>{c.num}</div>
              <div className="mono-caption" style={{ color: 'var(--accent-num)' }}>{c.kicker}</div>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 38,
                color: 'var(--fg)', letterSpacing: '0.04em',
                margin: '14px 0 12px',
              }}>{c.title}</div>
              <p style={{
                fontFamily: 'var(--body)', fontSize: 16, lineHeight: 1.55,
                color: 'var(--fg-dim)', margin: '0 0 22px',
              }}>{c.body}</p>
              <div style={{
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--accent-num)',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>{c.cta} <span>→</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* DESATERO PEEK */}
    <section className="container" style={{ padding: '80px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 60, alignItems: 'start' }}>
        <div>
          <div className="sec-head" style={{ marginTop: 0 }}>
            <span className="num">§ 03</span>
            <h2>Desatero, výňatek</h2>
          </div>
          <p style={{ fontFamily: 'var(--body)', fontSize: 17, lineHeight: 1.7, color: 'var(--fg-dim)' }}>
            Plné Desatero CAT najdeš v <Wiki>Modlitebníku</Wiki>. Toto jsou tři přikázání,
            která se učí nováčci hned první motohodinu.
          </p>
          <button className="btn ghost" onClick={() => onNav('prayers')}>
            Otevři Modlitebník
          </button>
        </div>
        <div className="parchment" style={{ padding: '40px 44px' }}>
          <div className="mono-caption" style={{ color: 'var(--rust)', marginBottom: 14 }}>
            — Desatero CAT, výňatek —
          </div>
          <ol style={{
            fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.6,
            color: 'var(--slab-fg)', paddingLeft: 28, margin: 0,
          }}>
            <li style={{ marginBottom: 14 }}>Nebudeš mít jiných barev mimo žluti.</li>
            <li style={{ marginBottom: 14 }}>Nevezmeš jména hydrauliky nadarmo, leda v hněvu spravedlivém.</li>
            <li style={{ marginBottom: 14 }}>Pomni, abys motohodinu světil — a do jiných motohodin nezasahoval.</li>
          </ol>
          <div style={{ marginTop: 22, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.28em', color: 'var(--fg-faint)', textTransform: 'uppercase' }}>
            ↳ Pokračuje 7 dalšími přikázáními
          </div>
        </div>
      </div>
    </section>

    {/* CTA STRIP */}
    <section style={{ background: 'var(--zlut)', position: 'relative' }}>
      <div style={{ height: 8 }} className="stripes" />
      <div className="container" style={{ padding: '54px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
        <div>
          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.36em',
            textTransform: 'uppercase', color: 'var(--slab-fg)', opacity: 0.7,
            marginBottom: 8,
          }}>— Závěrečné požehnání —</div>
          <div style={{
            fontFamily: 'var(--body)', fontStyle: 'italic',
            fontSize: 28, lineHeight: 1.35, color: 'var(--slab-fg)',
            maxWidth: 720,
          }}>
            „Ať tě žluť provází. Ať tě pásy nesou.<br/>
            Ať máš lžíci plnou a korbu blízko."
          </div>
        </div>
        <button className="btn dark" onClick={() => onNav('quiz')}>
          Zjisti svůj stupeň <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
      <div style={{ height: 8 }} className="stripes" />
    </section>
  </main>
);

window.HomePage = HomePage;
