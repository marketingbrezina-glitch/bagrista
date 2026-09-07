// Bagrista — Bridge (8 stupňů) page

const BRIDGE_STUPNE = [
  { n: 1, model: 'CAT 301.5', name: 'Nováček', mth: '0–500', perex: 'Dotýká se páky poprvé. Nezná, koho má prosit, když začne zvonit hydraulika. Mistři ho dosud netrestají, ale sledují.' },
  { n: 2, model: 'CAT 308',   name: 'Učedník', mth: '500–2 000', perex: 'Naučil se rozeznat zvuk diesel motoru od svého strachu. Stále ještě staví výkop podle čar.' },
  { n: 3, model: 'CAT 320',   name: 'Profík', mth: '2 000–5 000', perex: 'Vidí podloží dřív, než zaboří lžíci. Mluví krátce. Káva je jeho první svátost dne.', highlighted: true },
  { n: 4, model: 'CAT 336',   name: 'Veterán', mth: '5 000–10 000', perex: 'Pamatuje, když ještě nebyly servisní intervaly. Jeho hněv je tichý a hluboký jako rýha za pásem.' },
  { n: 5, model: 'CAT 349',   name: 'Mistr', mth: '10 000–20 000', perex: 'Naučí mlčet ostatní. Stojí v dešti, dokud výkop neřekne dost. Korba ho čeká, nikdy on ji.' },
  { n: 6, model: 'CAT 390',   name: 'Čaroděj', mth: '20 000–40 000', perex: 'Krmí stroj olejem, jako by to byla litie. Slyší, kde se trhá rozvodový řemen, dva dny dopředu.' },
  { n: 7, model: 'CAT 6090 FS', name: 'Guru', mth: '80 000+', perex: 'Mlčí celé motohodiny. Hovoří diesel skrze něj. Jediný, kdo potkal hydrauliku tváří v tvář a vrátil se.' },
];

const BridgeStep = ({ s, focused, onOpen }) => {
  const offset = (s.n - 1) * 36; // diagonal stair offset
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', position: 'relative' }}>
      {/* number rail */}
      <div style={{
        width: 84, flexShrink: 0,
        background: focused ? 'var(--zlut)' : 'var(--bg-2)',
        color: focused ? 'var(--bg)' : 'var(--fg-dim)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--display)',
        position: 'relative',
        borderRight: '1px solid var(--rule)',
      }}>
        <div style={{ fontSize: 11, letterSpacing: '0.32em', fontFamily: 'var(--mono)', opacity: 0.7 }}>STUPEŇ</div>
        <div style={{ fontSize: 64, lineHeight: 1, marginTop: 4, letterSpacing: '0.02em' }}>{String(s.n).padStart(2, '0')}</div>
      </div>

      {/* card */}
      <div style={{
        flex: 1,
        background: focused ? 'var(--bg-2)' : 'var(--bg-2)',
        color: 'var(--fg)',
        padding: '28px 32px',
        position: 'relative',
        borderRight: focused ? '2px solid var(--rust)' : '1px solid var(--rule)',
        borderTop: focused ? '2px solid var(--rust)' : 'none',
        borderBottom: focused ? '2px solid var(--rust)' : 'none',
        cursor: 'pointer',
        transition: 'background .15s, transform .15s',
      }}
      onClick={onOpen}
      onMouseEnter={(e) => { if (!focused) e.currentTarget.style.background = 'var(--bg-3)'; }}
      onMouseLeave={(e) => { if (!focused) e.currentTarget.style.background = 'var(--bg-2)'; }}
      >
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: focused ? 'var(--rust)' : 'var(--fg-dim)',
          marginBottom: 8,
        }}>
          <span>MODEL · {s.model}</span>
          <span>MTH · {s.mth}</span>
        </div>
        <div style={{
          fontFamily: 'var(--display)', fontSize: 48, letterSpacing: '0.02em',
          lineHeight: 1, marginBottom: 14,
          color: 'var(--fg)',
        }}>{s.name.toUpperCase()}</div>
        <p style={{
          fontFamily: 'var(--body)', fontSize: 17, lineHeight: 1.55,
          margin: '0 0 18px', maxWidth: 760,
          color: 'var(--fg-dim)',
        }}>{s.perex}</p>
        <div style={{
          fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: focused ? 'var(--rust)' : 'var(--accent-num)',
        }}>ČÍST DÁLE →</div>

        {/* corner ticks */}
        <span style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, background: focused ? 'var(--rust)' : 'var(--zlut)' }} />
        <span style={{ position: 'absolute', bottom: 8, right: 8, width: 6, height: 6, background: focused ? 'var(--rust)' : 'var(--zlut)' }} />
      </div>

      {/* width offset (the "stair" effect) */}
      <div style={{ width: 200 - offset, flexShrink: 0 }} />
    </div>
  );
};

const BridgePage = ({ onNav }) => {
  // 01 (Nováček) at top → 07 (Guru) at bottom; D9 Zrádce sits below as the abyss
  const ordered = BRIDGE_STUPNE; // 1..7 in source order

  return (
    <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
      {/* Header */}
      <section className="container" style={{ padding: '64px 28px 36px' }}>
        <div className="page-meta">
          <span>Lore · Bridge</span>
          <span>· 7 stupňů + 1 propast</span>
          <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, marginTop: 28, alignItems: 'end' }}>
          <div>
            <div className="mono-caption" style={{ color: 'var(--accent-num)', marginBottom: 12 }}>
              — Vyznání · § Bridge —
            </div>
            <h1 style={{
              fontFamily: 'var(--display)', fontWeight: 700,
              fontSize: 'clamp(60px, 8vw, 120px)', letterSpacing: '0.02em',
              lineHeight: 0.92, color: 'var(--fg)', margin: 0,
            }}>SCHODY VÍRY</h1>
            <p style={{
              fontFamily: 'var(--body)', fontSize: 20, lineHeight: 1.5,
              fontStyle: 'italic', color: 'var(--fg-dim)',
              marginTop: 24, maxWidth: 600,
            }}>
              Sedm stupňů, po kterých stoupá každý bagrista. Začínáš nahoře, u páky pětitunky.
              Vrchol je mlčení v kabině šestitunového dolu. A osmý — propast,
              která není stupeň, ale rozhodnutí.
            </p>
          </div>
          <div className="parchment" style={{ padding: '28px 30px' }}>
            <div className="mono-caption" style={{ color: 'var(--rust)', marginBottom: 8 }}>— Cestovní řád —</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 16, lineHeight: 1.55, color: 'var(--slab-fg)' }}>
              <strong>Stoupej zdola.</strong> Každý stupeň má svůj <em>model</em>,
              rozsah <em>motohodin</em>, perex a Závěrečné požehnání.
              Klikni na kartu pro celý text.
            </div>
          </div>
        </div>
      </section>

      <div style={{ height: 8 }} className="stripes" />

      {/* THE STAIRS */}
      <section style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

          {/* TOP marker — start of journey */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, color: 'var(--fg-dim)' }}>
            <div style={{ width: 60, height: 1, background: 'var(--fg-dim)' }} />
            <div className="mono-caption">ZAČÁTEK · NOVÁČEK · 0 MTH</div>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>

          {/* steps */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ordered.map((s, i) => (
              <BridgeStep
                key={s.n}
                s={s}
                focused={s.n === 3}
                onOpen={() => s.n === 3 ? onNav('detail') : null}
              />
            ))}
          </div>

          {/* BOTTOM marker — peak before the abyss */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24, color: 'var(--accent-num)' }}>
            <div style={{ width: 60, height: 1, background: 'var(--zlut)' }} />
            <div className="mono-caption" style={{ color: 'var(--accent-num)' }}>VRCHOL · GURU · MLČENÍ</div>
            <div style={{ flex: 1, height: 1, background: 'var(--rule)' }} />
          </div>

          {/* GAP / abyss */}
          <div style={{ position: 'relative', margin: '32px 0 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{ flex: 1, height: 1, background: 'var(--rust)' }} />
              <div className="mono-caption" style={{ color: 'var(--rust)' }}>— PROPAST · MIMO STRUKTURU —</div>
              <div style={{ width: 60, height: 1, background: 'var(--rust)' }} />
            </div>

            <div style={{
              border: `2px solid var(--rust)`,
              background: 'var(--bg-2)',
              padding: '32px 36px',
              position: 'relative',
              marginLeft: 200, // far offset — visually fallen off the stairs
            }}>
              <div style={{ position: 'absolute', top: -1, left: -1, right: -1, height: 4, background: 'var(--rust)' }} />
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--rust)', marginBottom: 8,
              }}>
                <span>STUPEŇ 8 · D9 · ZRÁDCE</span>
                <span>EXKOMUNIKOVÁN</span>
              </div>
              <div style={{
                fontFamily: 'var(--display)', fontSize: 48, letterSpacing: '0.02em',
                color: 'var(--rust)', marginBottom: 12,
              }}>ZRÁDCE</div>
              <p style={{ fontFamily: 'var(--body)', fontSize: 17, lineHeight: 1.55, color: 'var(--fg-dim)', maxWidth: 720, margin: 0 }}>
                Ten, kdo viděl vrchol a řekl <em>„ne"</em>. Sestoupil zpět dolů, ale dolů,
                kde už není mistr. Není stupněm, je rozhodnutím. Buldozer místo bagru.
                Pásy bez lžíce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container" style={{ padding: '60px 28px 0' }}>
        <div style={{ background: 'var(--bg-2)', padding: '36px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, border: '1px solid var(--rule)' }}>
          <div>
            <div className="mono-caption" style={{ color: 'var(--accent-num)', marginBottom: 8 }}>— Nevíš, kde stojíš? —</div>
            <div style={{ fontFamily: 'var(--display)', fontSize: 36, letterSpacing: '0.02em', color: 'var(--fg)' }}>
              SPUSŤ KVÍZ A HYDRAULIKA TĚ ZAŘADÍ.
            </div>
          </div>
          <button className="btn" onClick={() => onNav('quiz')}>
            18 otázek · 6 mth →
          </button>
        </div>
      </section>
    </main>
  );
};

window.BridgePage = BridgePage;
