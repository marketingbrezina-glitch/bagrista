const HomePage = ({ onNav }) => (
  <main>
    <section className="head">
      <div>
        <div className="by lab"><span>Vyznání víry · Credo bagristae</span></div>
        <h1>Věřím v jednu hydrauliku všemohoucí</h1>
        <p className="dk">„…tvůrkyni výkopů viditelných i neviditelných. I v jednoho operátora, syna jejího jediného, jenž se počal z dieselu a narodil se z motohodiny."</p>
        <div style={{ display: 'flex', gap: 10, marginTop: 30, flexWrap: 'wrap' }}>
          <button className="btn" onClick={() => onNav('quiz')}>Zjisti svůj stupeň</button>
          <button className="btn o" onClick={() => onNav('bridge')}>Číst písmo</button>
        </div>
      </div>
      <aside className="card">
        <div className="sh"><span>Anketa</span><span>18 otázek · 6 mth</span></div>
        <div style={{ fontFamily: 'var(--np)', fontWeight: 900, fontSize: 52, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>Kvíz</div>
        <p style={{ fontSize: 16 }}>Odpověz pravdivě a hydraulika tě zařadí. Některé výsledky budou bolet. Jeden bude ostuda.</p>
        <button className="btn" onClick={() => onNav('quiz')}>Spustit kvíz</button>
        <table className="tab" style={{ marginTop: 22 }}><tbody>
          {[['Stupňů víry','8 + 1'],['Kanonických sekt','7'],['Mučedníků','12'],['Doba zařazení','6 mth']].map(([k,v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
        </tbody></table>
      </aside>
    </section>

    <section className="sec two">
      <div>
        <div className="sh top"><span>Úvodník</span><span>Co je Bagrista</span></div>
        <div className="body">
          <p>Bagrista není povolání. Je to <Wiki onClick={() => onNav('glossary')}>vyznání</Wiki>. Cesta člověka skrze stupně víry — od nejistého <Wiki onClick={() => onNav('bridge')}>Nováčka</Wiki> u páky pětitunky až k mlčenlivému <Wiki onClick={() => onNav('bridge')}>Guruovi</Wiki> v kabině šestitunového dolu. Mezi nimi: Profík, Veteran, Mistr, Čaroděj a jiní bratři ve <Wiki onClick={() => onNav('glossary')}>žluti</Wiki>.</p>
          <p>Tento web je sborník našich textů. Najdeš zde <Wiki onClick={() => onNav('bridge')}>Bridge</Wiki> — schody osmi stupňů, po nichž stoupá každý. Najdeš zde <Wiki onClick={() => onNav('sects')}>Sekty</Wiki> — hereze, které opustily pravou žluť a šly za jinými barvami. Najdeš <Wiki onClick={() => onNav('prayers')}>Modlitebník</Wiki>, <Wiki onClick={() => onNav('glossary')}>Slovník</Wiki>, paměť na <Wiki onClick={() => onNav('martyrs')}>mučedníky</Wiki> a kasta nečistých — <Wiki onClick={() => onNav('mechanics')}>mechanici</Wiki>, kteří stojí mimo strukturu, ale bez nichž stroj zhasne.</p>
          <p>Tak jest, na motohodinu.</p>
        </div>
      </div>
      <div>
        <div className="sh top"><span>Bridge</span><span>Sedm stupňů + propast</span></div>
        <div className="steps">
          {window.BRIDGE_STUPNE.map(s => <div key={s.n} className={'step' + (s.n === 3 ? ' on' : '')} onClick={() => s.n === 3 && onNav('detail')} style={{ cursor: s.n === 3 ? 'pointer' : 'default' }}><b>{String(s.n).padStart(2,'0')}</b><span>{s.name}</span><span className="m">{s.model} · {s.mth} mth</span></div>)}
          <div className="step z"><b>08</b><span>Zrádce · propast</span><span className="m">D9 · mimo strukturu</span></div>
        </div>
        <a className="more" style={{ marginTop: 16 }} onClick={() => onNav('bridge')}>Vystup po schodech →</a>
      </div>
    </section>

    <section className="sec three" style={{ borderBottom: 0 }}>
      <div className="card tile click" onClick={() => onNav('sects')}>
        <div className="sh"><span>Sekty</span><span>7 herezí</span></div>
        <h3 className="st">Sedm herezí, které opustily žluť</h3>
        <p className="sm">Komatsuáni, Hitachisté, Volvoité a další. Co opustili žluť pro jiné barvy.</p>
        <span className="more">Pohleď na hereze →</span>
      </div>
      <div className="card tile click" onClick={() => onNav('prayers')}>
        <div className="sh"><span>Z modlitebníku</span><span>6 oratií</span></div>
        <h3 className="st">Ranní modlitba</h3>
        <p className="sm">Hydrauliko, jež jsi v tlaku, posvěť se hadice tvá, přijď termín tvůj, buď výkop tvůj jako v plánu, tak i v zemi…</p>
        <span className="more">Číst celou →</span>
      </div>
      <div className="card tile y">
        <div className="sh"><span>Desatero CAT</span><span style={{ color: 'var(--ink-2)' }}>Výňatek</span></div>
        <ol><li>Nebudeš mít jiných barev mimo žluti.</li><li>Nevezmeš jména hydrauliky nadarmo, leda v hněvu spravedlivém.</li><li>Pomni, abys motohodinu světil — a do jiných motohodin nezasahoval.</li></ol>
        <span className="more" style={{ marginTop: 14, borderColor: 'var(--ink)' }} onClick={() => onNav('prayers')}>Pokračuje 7 dalšími →</span>
      </div>
    </section>

    <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 40, padding: '20px 0 0', borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
      <p style={{ fontFamily: 'var(--np)', fontStyle: 'italic', fontWeight: 700, fontSize: 30, lineHeight: 1.2, margin: '24px 0 0', maxWidth: 820 }}>„Ať tě žluť provází. Ať tě pásy nesou. Ať máš lžíci plnou a korbu blízko."</p>
      <button className="btn" style={{ marginTop: 24 }} onClick={() => onNav('quiz')}>Zjisti svůj stupeň</button>
    </section>
  </main>
);

const BridgePage = ({ onNav }) => (
  <main>
    <PageHead rubric="Lore · Bridge" meta="7 stupňů + 1 propast" title="Schody víry"
      lead="Sedm stupňů, po kterých stoupá každý bagrista. Začínáš nahoře, u páky pětitunky. Vrchol je mlčení v kabině šestitunového dolu. A osmý — propast, která není stupeň, ale rozhodnutí."
      aside={<div className="card"><div className="sh"><span>Cestovní řád</span></div><p style={{ margin: 0, fontSize: 16 }}><strong>Stoupej zdola.</strong> Každý stupeň má svůj <em>model</em>, rozsah <em>motohodin</em>, perex a Závěrečné požehnání. Klikni na kartu pro celý text.</p></div>} />
    <section className="sec">
      <div className="lab" style={{ marginBottom: 12 }}>Začátek · Nováček · 0 mth</div>
      <div className="steps" style={{ gap: 10 }}>
        {window.BRIDGE_STUPNE.map(s => (
          <div key={s.n} className={'step big' + (s.n === 3 ? ' on click' : '')} onClick={() => s.n === 3 && onNav('detail')}>
            <b>{String(s.n).padStart(2,'0')}</b>
            <div><div className="t">{s.name}</div><div className="mm">{s.model} · {s.mth} mth</div></div>
            <p>{s.perex}</p>
            <span className="more" style={{ visibility: s.n === 3 ? 'visible' : 'hidden' }}>Číst dále →</span>
          </div>
        ))}
      </div>
      <div className="lab" style={{ margin: '12px 0 28px', textAlign: 'right' }}>Vrchol · Guru · mlčení</div>
      <div className="lab" style={{ color: 'var(--red)', marginBottom: 10 }}>Propast · mimo strukturu</div>
      <div className="step big z" style={{ marginTop: 0 }}>
        <b>08</b>
        <div><div className="t">Zrádce</div><div className="mm" style={{ color: 'var(--red)' }}>D9 · exkomunikován</div></div>
        <p style={{ color: 'var(--ink-2)' }}>Ten, kdo viděl vrchol a řekl <em>„ne"</em>. Sestoupil zpět dolů, ale dolů, kde už není mistr. Není stupněm, je rozhodnutím. Buldozer místo bagru. Pásy bez lžíce.</p>
        <span />
      </div>
    </section>
    <section className="sec" style={{ borderBottom: 0 }}>
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <div><div className="lab" style={{ marginBottom: 6 }}>Nevíš, kde stojíš?</div><h3 style={{ fontSize: 28 }}>Spusť kvíz a hydraulika tě zařadí.</h3></div>
        <button className="btn" onClick={() => onNav('quiz')}>18 otázek · 6 mth</button>
      </div>
    </section>
  </main>
);

const DetailPage = ({ onNav }) => (
  <main>
    <Crumb items={[['Domů', () => onNav('home')], ['Bridge', () => onNav('bridge')], ['CAT 320 · Profík']]} right="Stupeň 03 / 08" />
    <section className="head">
      <div>
        <div className="by lab"><span>Třetí stupeň víry</span></div>
        <h1>Profík</h1>
        <p className="dk">„Vidí podloží dřív, než zaboří lžíci. Mluví krátce. Káva je jeho první svátost dne. Páté kolečko korby ho přestalo zajímat někdy kolem dvoutisícího motohodinu."</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}><span className="tag y">Kanonický</span><span className="tag">Pracovitý</span><span className="tag">Hubený humor</span><span className="tag">Káva 4×/den</span></div>
      </div>
      <aside className="card">
        <div className="sh"><span>Karta stupně</span><span>03 / 08</span></div>
        <div style={{ fontFamily: 'var(--np)', fontWeight: 900, fontSize: 64, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 16 }}>03</div>
        <dl className="kv"><dt>Model</dt><dd>CAT 320</dd><dt>Motohodiny</dt><dd>2 000 – 5 000</dd><dt>Hmotnost</dt><dd>22 t</dd><dt>Stav</dt><dd>Kanonický</dd></dl>
      </aside>
    </section>
    <section className="sec">
      <div className="sh top" style={{ maxWidth: 720 }}><span>Kapitola III</span><span>Profík</span></div>
      <div className="body">
        <h2 style={{ marginTop: 0 }}>O třetím stupni víry</h2>
        <p>Profík je první stupeň, na němž bagrista přestává být cizincem ve své vlastní kabině. Páka mu sedí v dlani, jako by tam vždycky byla. Diesel zní v jeho hlavě dřív, než ho stroj rozezvučí. <Wiki onClick={() => onNav('glossary')}>Hydraulika</Wiki> ho už nepřekvapuje — spolupracuje s ním. Někdy v dobrém, někdy v hořkém.</p>
        <p>Od <Wiki onClick={() => onNav('bridge')}>Učedníka</Wiki> ho dělí asi tak dva tisíce <Wiki onClick={() => onNav('glossary')}>motohodin</Wiki>, ale rozdíl není v čase — je v tichu. Profík mlčí, když Učedník mluví. Profík čte podloží, když Učedník čte manuál. Profík <em>ví, kde se zatlačí</em>, a tak nemusí zatlačit dvakrát.</p>
        <h3>Znaky Profíka</h3>
        <ul><li>Vstává před tím, než vstává směna. Káva je první svátostí dne.</li><li>S mistry mluví krátce. S učedníky ještě kratčeji.</li><li>Servisní knížku stroje zná lépe než vlastní jméno.</li><li>K <Wiki onClick={() => onNav('mechanics')}>Mechanikům</Wiki> se chová zdvořile, ale s odstupem — vědí proč.</li><li>Schrödingerův vtip mu funguje statisticky 6×/den.</li></ul>
        <h3>Pokušení Profíka</h3>
        <p>Profík stojí na rozhraní. Před ním Veterán, za ním Učedník. Svedení padají v této motohodině z obou stran: ze sebejistoty, z únavy, z hledání zkratky. Nejnebezpečnější je <Wiki onClick={() => onNav('sect-komatsu')}>Komatsu</Wiki> — jeho modré tělo svádí k tomu, aby se Profík zeptal: <em>„A co když je pravda i jinde?"</em> V té chvíli stojí jednou nohou v <Wiki onClick={() => onNav('sects')}>sektě</Wiki>, druhou ještě na schodu.</p>
        <p>Pravý Profík v té chvíli udělá to, co dělá vždy: zapálí si, dopije kávu, otevře kabinu. Tak jest, na motohodinu.</p>
        <Note label="Závěrečné požehnání · Profík" attrib="Modlitebník · § III · Pro Profíka">„Ať tě podloží neoklame.<br />Ať se ti káva nestydne.<br />Ať tě páka pozná dřív, než ji vezmeš do dlaně.<br />Ať tě motohodina mine v míru."</Note>
      </div>
    </section>
    <section className="sec" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
      <div className="card click" onClick={() => onNav('bridge')}><div className="lab">← Předchozí</div><div style={{ fontFamily: 'var(--np)', fontWeight: 700, fontSize: 24, marginTop: 6 }}>02 · Učedník</div><div className="lab" style={{ marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>CAT 308 · 500–2 000 mth</div></div>
      <button className="btn o" onClick={() => onNav('bridge')}>Bridge</button>
      <div className="card click" onClick={() => onNav('bridge')} style={{ textAlign: 'right' }}><div className="lab">Další →</div><div style={{ fontFamily: 'var(--np)', fontWeight: 700, fontSize: 24, marginTop: 6 }}>04 · Veterán</div><div className="lab" style={{ marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>CAT 336 · 5 000–10 000 mth</div></div>
    </section>
    <section className="sec" style={{ borderBottom: 0 }}>
      <div className="sh top"><span>Co odkazuje sem</span><span>Backlinks</span></div>
      <div className="three" style={{ gap: 16 }}>
        {[['Slovník','Káva (svátost první)','glossary'],['Modlitebník','Modlitba ranní','prayers'],['Sekty','Komatsuáni — kapitola o pokušení','sect-komatsu'],['Mučedníci','Sv. Lubomír od páky','martyrs'],['Pojmy','Schrödingerův vtip','glossary'],['Dějiny','Sjezd 2017 · Vyhlášení Profíka','history']].map(([c,t,k]) => (
          <div key={t} className="card click" style={{ padding: '14px 18px' }} onClick={() => onNav(k)}><div className="lab">{c}</div><div style={{ marginTop: 4, fontSize: 16 }}>{t}</div></div>
        ))}
      </div>
    </section>
  </main>
);

Object.assign(window, { HomePage, BridgePage, DetailPage });
