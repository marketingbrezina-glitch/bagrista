// Bagrista — Detail stupně (CAT 320 Profík)

const DetailPage = ({ onNav }) => (
  <main style={{ background: 'var(--bg)' }}>

    {/* META BAR */}
    <section className="container" style={{ padding: '28px 28px 0' }}>
      <div className="page-meta">
        <span><a onClick={() => onNav('home')} style={{ cursor: 'pointer' }}>Home</a></span>
        <span>›</span>
        <span><a onClick={() => onNav('bridge')} style={{ cursor: 'pointer' }}>Bridge</a></span>
        <span>›</span>
        <span style={{ color: 'var(--accent-num)' }}>CAT 320 · Profík</span>
        <span style={{ marginLeft: 'auto' }}>STUPEŇ 03 / 08</span>
      </div>
    </section>

    {/* HERO */}
    <section className="container" style={{ padding: '40px 28px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 40, alignItems: 'start' }}>
        <div>
          <div style={{
            background: 'var(--zlut)',
            border: '2px solid var(--black)',
            outline: '2px solid var(--zlut)', outlineOffset: 4,
            padding: '20px 16px',
            color: 'var(--slab-fg)',
            fontFamily: 'var(--display)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.28em', opacity: 0.7 }}>STUPEŇ</div>
            <div style={{ fontSize: 84, lineHeight: 0.9, letterSpacing: '0.02em', marginTop: 4 }}>03</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.28em', marginTop: 8 }}>Z 08</div>
          </div>
          <div style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--fg-dim)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--rule-dashed)', padding: '6px 0' }}>
              <span>Model</span><span style={{ color: 'var(--fg)' }}>CAT 320</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--rule-dashed)', padding: '6px 0' }}>
              <span>Mth</span><span style={{ color: 'var(--fg)' }}>2k–5k</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--rule-dashed)', padding: '6px 0' }}>
              <span>Hmotnost</span><span style={{ color: 'var(--fg)' }}>22 t</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span>Stav</span><span style={{ color: 'var(--accent-num)' }}>Kanonický</span>
            </div>
          </div>
        </div>
        <div>
          <div className="mono-caption" style={{ color: 'var(--accent-num)', marginBottom: 12 }}>
            — Třetí stupeň víry —
          </div>
          <h1 style={{
            fontFamily: 'var(--display)', fontWeight: 700,
            fontSize: 'clamp(64px, 9vw, 132px)', letterSpacing: '0.02em',
            lineHeight: 0.9, color: 'var(--fg)', margin: 0,
          }}>PROFÍK</h1>
          <p style={{
            fontFamily: 'var(--body)', fontStyle: 'italic',
            fontSize: 22, lineHeight: 1.5, color: 'var(--fg-dim)',
            marginTop: 28, maxWidth: 720,
          }}>
            „Vidí podloží dřív, než zaboří lžíci. Mluví krátce. Káva je jeho první svátost dne.
            Páté kolečko korby ho přestalo zajímat někdy kolem dvoutisícího motohodinu."
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
            <span className="chip zlut">Kanonický</span>
            <span className="chip">Pracovitý</span>
            <span className="chip">Hubený humor</span>
            <span className="chip">Káva 4×/den</span>
          </div>
        </div>
      </div>
    </section>

    {/* PARCHMENT BODY */}
    <section style={{ padding: '64px 0 0' }}>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px' }}>
        <div className="parchment" style={{
          padding: '60px 80px',
          position: 'relative',
        }}>
          {/* parchment side rule */}
          <div style={{
            position: 'absolute', left: 24, top: 24, bottom: 24, width: 1,
            borderLeft: '1px solid var(--zlut-deep)',
          }} />
          <div style={{
            position: 'absolute', right: 24, top: 24, bottom: 24, width: 1,
            borderLeft: '1px solid var(--zlut-deep)',
          }} />

          <div style={{
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.36em',
            textTransform: 'uppercase', color: 'var(--rust)',
            marginBottom: 20,
          }}>— Kapitola III · Profík —</div>

          <h2 style={{
            fontFamily: 'var(--display)', fontSize: 36, letterSpacing: '0.02em',
            color: 'var(--slab-fg)', margin: '0 0 24px',
          }}>O TŘETÍM STUPNI VÍRY</h2>

          <p className="dropcap" style={{
            fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.75,
            color: 'var(--slab-fg)', marginTop: 0,
          }}>
            Profík je první stupeň, na němž bagrista přestává být cizincem
            ve své vlastní kabině. Páka mu sedí v dlani, jako by tam vždycky byla.
            Diesel zní v jeho hlavě dřív, než ho stroj rozezvučí.
            <Wiki onClick={() => onNav('home')}> Hydraulika</Wiki> ho už nepřekvapuje —
            spolupracuje s ním. Někdy v dobrém, někdy v hořkém.
          </p>

          <p style={{ fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.75, color: 'var(--slab-fg)' }}>
            Od <Wiki onClick={() => onNav('bridge')}>Učedníka</Wiki> ho dělí asi tak dva tisíce
            <Wiki> motohodin</Wiki>, ale rozdíl není v čase — je v tichu.
            Profík mlčí, když Učedník mluví. Profík čte podloží, když Učedník čte manuál.
            Profík <em>ví, kde se zatlačí</em>, a tak nemusí zatlačit dvakrát.
          </p>

          <h3 style={{
            fontFamily: 'var(--display)', fontSize: 22, letterSpacing: '0.04em',
            color: 'var(--slab-fg)', marginTop: 36, marginBottom: 14,
            textTransform: 'uppercase',
          }}>Znaky Profíka</h3>

          <ul style={{
            fontFamily: 'var(--body)', fontSize: 18, lineHeight: 1.65,
            color: 'var(--slab-fg)', paddingLeft: 24,
          }}>
            <li>Vstává před tím, než vstává směna. Káva je první svátostí dne.</li>
            <li>S mistry mluví krátce. S učedníky ještě kratčeji.</li>
            <li>Servisní knížku stroje zná lépe než vlastní jméno.</li>
            <li>K <Wiki>Mechanikům</Wiki> se chová zdvořile, ale s odstupem — vědí proč.</li>
            <li>Schrödingerův vtip mu funguje statisticky 6×/den.</li>
          </ul>

          <h3 style={{
            fontFamily: 'var(--display)', fontSize: 22, letterSpacing: '0.04em',
            color: 'var(--slab-fg)', marginTop: 36, marginBottom: 14,
            textTransform: 'uppercase',
          }}>Pokušení Profíka</h3>

          <p style={{ fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.75, color: 'var(--slab-fg)' }}>
            Profík stojí na rozhraní. Před ním Veterán, za ním Učedník.
            Svedení padají v této motohodině z obou stran: ze sebejistoty, z únavy, z hledání zkratky.
            Nejnebezpečnější je <Wiki>Komatsu</Wiki> — jeho modré tělo svádí k tomu, aby se Profík
            zeptal: <em>„A co když je pravda i jinde?"</em> V té chvíli stojí jednou nohou
            v <Wiki>sektě</Wiki>, druhou ještě na schodu.
          </p>

          <p style={{ fontFamily: 'var(--body)', fontSize: 19, lineHeight: 1.75, color: 'var(--slab-fg)' }}>
            Pravý Profík v té chvíli udělá to, co dělá vždy: zapálí si, dopije kávu, otevře kabinu.
            Tak jest, na motohodinu.
          </p>

          {/* Závěrečné požehnání */}
          <Creed
            label="Závěrečné požehnání · Profík"
            text={<>
              „Ať tě podloží neoklame.<br/>
              Ať se ti káva nestydne.<br/>
              Ať tě páka pozná dřív, než ji vezmeš do dlaně.<br/>
              Ať tě motohodina mine v míru."
            </>}
            attrib="— Modlitebník · § III · Pro Profíka —"
          />
        </div>
      </div>
    </section>

    {/* PREV / NEXT NAV */}
    <section className="container" style={{ padding: '60px 28px 0' }}>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16,
      }}>
        <div onClick={() => onNav('bridge')} style={{
          background: 'var(--bg-2)', border: '1px solid var(--rule)',
          padding: '20px 24px', cursor: 'pointer',
        }}>
          <div className="mono-caption" style={{ color: 'var(--fg-dim)' }}>← Předchozí</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--fg)', marginTop: 4 }}>
            02 · UČEDNÍK
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--fg-dim)', marginTop: 4 }}>
            CAT 308 · 500–2 000 mth
          </div>
        </div>
        <button className="btn ghost" onClick={() => onNav('bridge')}
                style={{ alignSelf: 'center' }}>
          ↑ Bridge
        </button>
        <div onClick={() => onNav('bridge')} style={{
          background: 'var(--bg-2)', border: '2px solid var(--zlut)',
          padding: '20px 24px', cursor: 'pointer', textAlign: 'right',
        }}>
          <div className="mono-caption" style={{ color: 'var(--accent-num)' }}>Další →</div>
          <div style={{ fontFamily: 'var(--display)', fontSize: 24, color: 'var(--fg)', marginTop: 4 }}>
            04 · VETERÁN
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.18em', color: 'var(--fg-dim)', marginTop: 4 }}>
            CAT 336 · 5 000–10 000 mth
          </div>
        </div>
      </div>
    </section>

    {/* BACKLINKS */}
    <section className="container" style={{ padding: '56px 28px 80px' }}>
      <div className="sec-head">
        <span className="num">§ Co odkazuje sem</span>
        <h2>Backlinks</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[
          ['Slovník', 'Káva (svátost první)'],
          ['Modlitebník', 'Modlitba ranní'],
          ['Sekty', 'Komatsuáni — kapitola o pokušení'],
          ['Mučedníci', 'Sv. Lubomír od páky'],
          ['Pojmy', 'Schrödingerův vtip'],
          ['Dějiny', 'Sjezd 2017 · Vyhlášení Profíka'],
        ].map(([cat, title]) => (
          <a key={title} style={{
            background: 'var(--bg-2)', border: '1px solid var(--rule)',
            padding: '14px 18px', textDecoration: 'none', display: 'block',
            cursor: 'pointer', transition: 'border-color .15s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--zlut)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-3)'}
          >
            <div className="mono-caption" style={{ color: 'var(--accent-num)' }}>{cat}</div>
            <div style={{ fontFamily: 'var(--body)', fontSize: 16, color: 'var(--fg)', marginTop: 4 }}>
              {title}
            </div>
          </a>
        ))}
      </div>
    </section>
  </main>
);

window.DetailPage = DetailPage;
