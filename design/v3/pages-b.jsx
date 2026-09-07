const cap = (s) => s.charAt(0) + s.slice(1).toLowerCase();

const SektyPage = ({ onNav }) => (
  <main>
    <PageHead rubric="Lore · Sekty" meta="7 kacířských větví" title="Kacířské sekty"
      lead="Sedm větví, které odpadly od Žluti. Některé pošetile, jiné záměrně. Studuj je, abys je poznal, ne aby ses k nim přidal. Hydraulika tě sleduje." />
    <section className="sec" style={{ borderBottom: 0 }}>
      <div className="three" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 24 }}>
        {window.SEKTY.map(s => (
          <article key={s.id} className={'card tile' + (s.id === 'komatsuani' ? ' click' : '')} onClick={() => s.id === 'komatsuani' && onNav('sect-komatsu')} style={{ borderTop: `4px solid ${s.accent}` }}>
            <div className="sh"><span>Kacířská sekta</span><span style={{ color: s.accent, fontWeight: 600 }}>■</span></div>
            <h3 className="st">{s.name}</h3>
            <p style={{ fontStyle: 'italic', color: 'var(--ink-2)', margin: '0 0 12px', fontSize: 16 }}>{s.motto}</p>
            <p className="sm">{s.perex}</p>
            {s.id === 'komatsuani' && <span className="more">Číst dále →</span>}
          </article>
        ))}
      </div>
    </section>
  </main>
);

const SectKomatsuPage = ({ onNav }) => {
  const accent = '#1F4FB8';
  return (
    <main>
      <Crumb items={[['Sekty', () => onNav('sects')], ['Komatsuáni']]} right="Heretici modři · tolerovaní s podezřením" />
      <section className="head">
        <div>
          <div className="by lab"><span>Sekta · 1 ze 7</span></div>
          <h1>Komatsuáni</h1>
          <p className="dk">„Modři je naše svatba s ocelí. Žluť je strach. My jsme klid moře."</p>
        </div>
        <aside className="card" style={{ borderTop: `4px solid ${accent}` }}>
          <div className="sh"><span>Identifikace</span><span>K-001</span></div>
          <dl className="kv"><dt>Barva</dt><dd>Modř #1F4FB8</dd><dt>Původ</dt><dd>Japonsko, 1921</dd><dt>Slovo</dt><dd>„A do Komatsu!"</dd><dt>Svátek</dt><dd>Den modré pásky</dd><dt>Rival</dt><dd>Žluť pravá</dd></dl>
        </aside>
      </section>
      <section className="sec" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 56 }}>
        <div>
          <div className="sh top"><span>Kapitola</span><span>Komatsuáni</span></div>
          <div className="body">
            <p>Komatsuáni jsou nejstarší a nejnebezpečnější ze všech kacířských sekt. Jejich heresie nespočívá v hrubosti — naopak, jsou klidní, technicky zruční, přesní. Jejich heresie je v <Wiki onClick={() => onNav('glossary')}>barvě</Wiki>. Tam, kde má bagrista vidět <Wiki onClick={() => onNav('glossary')}>Žluť</Wiki>, vidí Komatsuán modř, a v té modři spatřuje Pravdu.</p>
            <h2>Rozkol</h2>
            <p>Podle <Wiki onClick={() => onNav('history')}>Dějin pravdy</Wiki> došlo k rozkolu dne, kdy první Komatsu přijel na evropské staveniště a první bagrista, ohromen tichostí motoru, řekl nahlas: <em>„Tohle je lepší."</em> V tu chvíli byla vyřčena heresie. Tichý hlas, ale stačil. <Wiki onClick={() => onNav('glossary')}>Hydraulika</Wiki> ho nepotrestala — ale označila. Jeho potomci jsou Komatsuáni.</p>
            <h2>Rituály</h2>
            <p>Komatsuáni nemají liturgii v klasickém slova smyslu. Místo toho mají <strong>servisní intervaly</strong>, které dodržují s mnišskou přesností. Pokud Komatsuán propasuje servis, sebere mu to týden spánku. To je ekvivalent zpovědi.</p>
            <p>Slaví <strong>Den modré pásky</strong> — den, kdy Komatsu poprvé předběhl Caterpillar v žebříčku spolehlivosti. Bagristé tento den ignorují, ale tiše vědí, že existuje. Komatsuáni v něm pijí studené sake a nedotýkají se motohodin.</p>
            <h2>Vztah k Bratrstvu</h2>
            <p>Oficiálně jsou Komatsuáni <strong>tolerovaní</strong>. Bagrista může s Komatsuánem sdílet kávu, dokonce i tlumič výfuku, pokud je nutné. Co nesmí: nahlas pochválit jejich stroj, sdílet s ním lžíci, nebo (nejhůř) nechat se jím naučit cokoliv. Každá taková událost je potenciální cesta k odpadnutí.</p>
            <p><strong>Mlčení hydrauliky</strong> nad Komatsuánem trvá. Jednou — možná za stovky motohodin — promluví. Tehdy přijde rozhodnutí: vrátit se, nebo zůstat. Většina zůstává. Modř drží.</p>
          </div>
        </div>
        <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
          <div className="card"><div className="sh"><span>Z domácího kánonu</span></div><p style={{ fontFamily: 'var(--np)', fontStyle: 'italic', fontSize: 19, lineHeight: 1.4, margin: 0 }}>„Bagrista vidí žluť. Komatsuán vidí modř. Hydraulika vidí oba — a mlčí."</p><div className="lab" style={{ marginTop: 12 }}>Kniha Dějin, kap. III</div></div>
          <div className="sh" style={{ marginTop: 28 }}><span>Související</span></div>
          <div className="toc"><a onClick={() => onNav('glossary')}>Slovník: A do Komatsu!</a><a onClick={() => onNav('history')}>Dějiny: Velký rozkol</a><a onClick={() => onNav('martyrs')}>Mučedníci: Pavel z Plzně</a></div>
        </aside>
      </section>
      <section className="sec" style={{ borderBottom: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
        <a className="more" onClick={() => onNav('sects')}>← Zpět na seznam sekt</a>
        <button className="btn o" onClick={() => onNav('sects')}>Všechny sekty</button>
        <a className="more" onClick={() => onNav('sects')}>Hitachisté →</a>
      </section>
    </main>
  );
};

const GlossaryHub = ({ onNav }) => {
  const T = window.SLOVNIK_TERMS;
  return (
    <main>
      <PageHead rubric="Lore · Slovník" meta={`${T.length} pojmů`} title="Slovník pravdy"
        lead="Pojmy, které je třeba znát, abys mluvil řečí Bratrstva. Doménový kánon — kanonický význam, ne uliční." />
      <section className="sec" style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 64, borderBottom: 0 }}>
        <nav style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
          <div className="sh"><span>Obsah</span><span>{T.length}</span></div>
          <div className="toc">{T.map((t, i) => <a key={t.id} href={`#${t.id}`}><b>{String(i+1).padStart(2,'0')}</b>{t.term}</a>)}</div>
        </nav>
        <article style={{ maxWidth: 720 }}>
          {T.map((t, i) => (
            <section key={t.id} id={t.id} style={{ paddingBottom: 36, marginBottom: 36, borderBottom: '1px solid var(--hair)' }}>
              <div className="sh"><span>{String(i+1).padStart(2,'0')}</span><span>{t.short}</span></div>
              <h2 style={{ fontSize: 36 }}>{t.term}</h2>
              <p style={{ fontSize: 18, lineHeight: 1.65, margin: '14px 0 0' }} dangerouslySetInnerHTML={{ __html: t.body }} />
            </section>
          ))}
        </article>
      </section>
    </main>
  );
};

const ModlitebnikPage = ({ onNav }) => {
  const P = window.PRAYERS;
  return (
    <main>
      <PageHead rubric="Lore · Modlitebník" meta={`${P.length} oratií`} title="Modlitebník"
        lead="Texty pro každou denní dobu, pro každou nepohodu, pro každou kávu před první motohodinou. Čti tiše, čti s úctou, čti jako bys to opravdu myslel." />
      <section className="sec" style={{ borderBottom: 0 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
          {P.map((p, i) => <a key={p.id} href={`#${p.id}`} className="tag" style={{ textDecoration: 'none' }}>{String(i+1).padStart(2,'0')} · {cap(p.title)}</a>)}
        </div>
        <div className="three" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(400px,1fr))' }}>
          {P.map((p, i) => (
            <article key={p.id} id={p.id} className="card" style={{ padding: '32px 36px' }}>
              <div className="sh"><span>Oratio {String(i+1).padStart(2,'0')}</span><span>{p.kicker}</span></div>
              <h3 style={{ fontSize: 30, marginBottom: 22 }}>{cap(p.title)}</h3>
              <pre className="pray">{p.body}</pre>
              <div className="lab" style={{ marginTop: 22, paddingTop: 14, borderTop: '1px solid var(--hair)', color: 'var(--ink)' }}>† {p.closer}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

Object.assign(window, { SektyPage, SectKomatsuPage, GlossaryHub, ModlitebnikPage, cap });
