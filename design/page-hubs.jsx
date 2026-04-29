// Bagrista — Mučedníci, Mechanici, Dějiny pravdy

const MUCEDNICI = [
  { id: 'pavel-plzen', name: 'Pavel z Plzně', dates: 'mth ~12 400',
    short: 'Padl z 6090, když chtěl dosáhnout na motohodinový čítač.',
    body: 'Pavel z Plzně byl Mistr (Stupeň 5), který si v okamžiku slabosti chtěl vyzkoušet, kolik motohodin už má vlastně sám. Nedíval se na strop kabiny — díval se na čítač, lezl po sedadle. Hydraulika ho potrestala lživou rovnováhou. Padl. Stroj byl bez újmy. Pavel — méně tak.' },
  { id: 'andulka', name: 'Andulka tichá', dates: 'mth ~38 000',
    short: 'Mlčela tak dlouho, že ji přestali zvát.',
    body: 'Andulka tichá byla na cestě k Čaroději (Stupeň 6). Mlčela správně, mlčela hodiny, mlčela dny. Ale překročila linii: když ji zavolal mistr a ona neodpověděla, mistr odešel. Slovo neřečené může být ctnost, ale slovo zatajené je hřích. Andulka skončila bez práce.' },
  { id: 'jan-chrudim', name: 'Jan z Chrudimi', dates: 'mth ~5 200',
    short: 'Vyprávěl Schrödingerův vtip a někdo zvedl ruku.',
    body: 'Jan z Chrudimi byl odhodlaný Profík, slibný kandidát na Veterána. V hospodě začal vyprávět vtip — přesný, načasovaný, perlivý. Ale na konci se ozval cizí muž: „Hele, a pointu?" Vtip zemřel. Jan zemřel společensky. Od té doby vyprávěl pouze v autě, sám.' },
  { id: 'mira', name: 'Míra žlutý', dates: 'mth ~9 800',
    short: 'Pochválil Komatsu nahlas.',
    body: 'Míra žlutý byl Veterán (Stupeň 4) na zakázce, kde půjčili Komatsu. „Pěkně to běhá," řekl. Stačilo to. Hydraulika mlčela, ale bratrstvo slyšelo. Měsíc s ním nikdo nemluvil. Za půl roku si koupil modré tričko. Dnes je u Komatsuánů.' },
  { id: 'vlado', name: 'Vláďa z Hradce', dates: 'mth ~22 000',
    short: 'Nevěřil v servisní intervaly.',
    body: 'Vláďa byl Čaroděj v sázce. Tvrdil, že servisní intervaly jsou „kapitalistická pověra" a že stroj sám řekne, kdy chce olej. Stroj řekl. Pozdě. Hydraulika tě respektuje — ale hadici nevypustí.' },
];

const MartyrsPage = ({ onNav }) => (
  <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
    <section className="container" style={{ padding: '64px 28px 24px' }}>
      <div className="page-meta">
        <span>Lore · Mučedníci</span>
        <span>· {MUCEDNICI.length} pádů</span>
        <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
      </div>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(60px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 0.92, margin: '24px 0 16px', color: 'var(--fg)' }}>
        MUČEDNÍCI PÁDU
      </h1>
      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-dim)', maxWidth: 720, margin: 0 }}>
        Bratři, kteří padli — fyzicky, sociálně, duchovně. Jejich příběhy se vyprávějí, aby ostatní nepadli.
        Studuj je. Není potřeba se jim smát.
      </p>
    </section>

    <div style={{ height: 6 }} className="stripes-thin" />

    <section className="container" style={{ padding: '40px 28px 0' }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 36 }}>
        {MUCEDNICI.map((m, i) => (
          <li key={m.id} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 32 }}>
            <div style={{
              borderTop: '2px solid var(--rust)',
              paddingTop: 12, color: 'var(--rust)',
              fontFamily: 'var(--display)', fontSize: 64, lineHeight: 1, letterSpacing: '0.02em',
            }}>{String(i+1).padStart(2,'0')}</div>
            <article style={{ borderTop: '2px solid var(--rule)', paddingTop: 12 }}>
              <div className="mono-caption" style={{ color: 'var(--rust)', marginBottom: 6 }}>† {m.dates}</div>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', margin: '0 0 6px', color: 'var(--fg)' }}>{m.name.toUpperCase()}</h2>
              <div style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 17, color: 'var(--fg-dim)', marginBottom: 14 }}>{m.short}</div>
              <p style={{ fontFamily: 'var(--body)', fontSize: 17, lineHeight: 1.65, color: 'var(--fg)', margin: 0, maxWidth: 760 }}>{m.body}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  </main>
);

const MechanicsPage = ({ onNav }) => (
  <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
    <section className="container" style={{ padding: '64px 28px 24px' }}>
      <div className="page-meta">
        <span>Lore · Mechanici</span>
        <span>· Kasta nečistých</span>
        <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
      </div>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(60px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 0.92, margin: '24px 0 16px', color: 'var(--fg)' }}>
        MECHANICI
      </h1>
      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-dim)', maxWidth: 720, margin: 0 }}>
        Stojí mimo strukturu osmi stupňů. Nejsou bratrstvo, ale bez nich bratrstvo nepřežije.
        Kasta nečistých — ne pro špínu, ale pro účet.
      </p>
    </section>

    <div style={{ height: 6 }} className="stripes-thin" />

    <section className="container" style={{ padding: '40px 28px 0', display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56 }}>
      <article style={{ fontFamily: 'var(--body)', fontSize: 18, lineHeight: 1.75, color: 'var(--fg)', maxWidth: 760 }}>
        <p className="dropcap" style={{ marginTop: 0 }}>
          Mechanici nejsou bagristé. Nejsou ani Komatsuáni, ani Hitachisté. Jsou <em>třetí síla</em> — nutná, ale nečistá. Bagrista o nich říká: <strong>„přijde mechanik a budeš mu platit"</strong>.
          Tím je řečeno vše. Mechanik je ten, kdo si bere motohodiny zpátky.
        </p>

        <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', marginTop: 48, color: 'var(--fg)' }}>POSTAVENÍ</h2>
        <p>
          Bagrista a mechanik si tykají, ale nemilují se. Bagrista mechanika potřebuje, jako vesnice potřebuje hrobaře.
          Bratrstvo má své stupně, mechanici mají své <strong>hodinové sazby</strong>. Jedno se stoupá, druhé se platí.
        </p>

        <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', marginTop: 48, color: 'var(--fg)' }}>RITUÁLY</h2>
        <p>
          Když mechanik přijde, nese kufr s nářadím a kalkulačku. Položí kufr, otevře, a začne to, čemu bratrstvo říká
          <em>„dlouhý ticho před cenou"</em>. V tom tichu bagrista ví, že se rozhoduje budoucnost.
        </p>
        <p>
          Mechanik nikdy neřekne <em>„vím, co to je"</em>. Vždy řekne <em>„podívám se na to"</em>. To je liturgie kasty.
          Pak se podívá. Pak řekne číslo. Bagrista mlčí. Hydraulika mlčí. Penize odejdou.
        </p>

        <h2 style={{ fontFamily: 'var(--display)', fontSize: 42, letterSpacing: '0.02em', marginTop: 48, color: 'var(--fg)' }}>KE KOMU PATŘÍ</h2>
        <p>
          Mechanici jsou sami sobě. Mají svou hierarchii, svou guildu, své anekdoty. Bagristé do toho nevidí, a bagristé to neřeší.
          Hlavní je, aby mechanik <em>přišel</em>. Pozdě, draho — ale přišel.
        </p>
      </article>

      <aside style={{ position: 'sticky', top: 80, alignSelf: 'start' }}>
        <div className="mono-caption" style={{ color: 'var(--accent-num)', marginBottom: 14 }}>— Hierarchie mechaniků —</div>
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 14, fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
          <li style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid var(--rule)' }}>
            <span style={{ color: 'var(--accent-num)', fontFamily: 'var(--display)', fontSize: 28, lineHeight: 1 }}>α</span>
            <div><strong style={{ color: 'var(--fg)' }}>Servisman</strong><div style={{ color: 'var(--fg-dim)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--body)', marginTop: 4, fontSize: 14 }}>Vyměňuje filtry, doplňuje oleje. Bez něj se motor zadrhne.</div></div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid var(--rule)' }}>
            <span style={{ color: 'var(--accent-num)', fontFamily: 'var(--display)', fontSize: 28, lineHeight: 1 }}>β</span>
            <div><strong style={{ color: 'var(--fg)' }}>Hydraulik</strong><div style={{ color: 'var(--fg-dim)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--body)', marginTop: 4, fontSize: 14 }}>Specialista. Když praskne velká hadice, volá se on. Drahý.</div></div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid var(--rule)' }}>
            <span style={{ color: 'var(--accent-num)', fontFamily: 'var(--display)', fontSize: 28, lineHeight: 1 }}>γ</span>
            <div><strong style={{ color: 'var(--fg)' }}>Diagnostik</strong><div style={{ color: 'var(--fg-dim)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--body)', marginTop: 4, fontSize: 14 }}>Čte kódy. Ten, koho voláš, když nikdo neví. Ještě dražší.</div></div>
          </li>
          <li style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: 12, alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid var(--rule)' }}>
            <span style={{ color: 'var(--accent-num)', fontFamily: 'var(--display)', fontSize: 28, lineHeight: 1 }}>δ</span>
            <div><strong style={{ color: 'var(--fg)' }}>Mistr servisu</strong><div style={{ color: 'var(--fg-dim)', textTransform: 'none', letterSpacing: 0, fontFamily: 'var(--body)', marginTop: 4, fontSize: 14 }}>Stojí v kanceláři. Účtuje. Bagrista ho potkává jen v krizi.</div></div>
          </li>
        </ol>
      </aside>
    </section>
  </main>
);

const HISTORIE = [
  { year: 'Před počátkem', title: 'STVOŘENÍ HYDRAULIKY',
    body: 'V počátku byla Hydraulika. A Hydraulika byla u oleje. A Hydraulika byla olej. Nebyla pásem ani lžící — byla tlakem.' },
  { year: '1925', title: 'PRVNÍ STROJ',
    body: 'Holt a Best spojili své pásy a Hydraulika promluvila poprvé hlasem motoru. Byla žluť. Byl Caterpillar. Byl počátek motohodin.' },
  { year: '1948', title: 'D9 — PROROCTVÍ ZRADY',
    body: 'Vznikl D9. Stroj větší než cokoliv. Hydraulika tehdy předpověděla: „Tento stroj přivede prvního, kdo řekne ne." Bratrstvo nerozumělo. Pochopí.' },
  { year: '1956', title: 'KOMATSU PŘICHÁZÍ',
    body: 'Z Japonska připlul první Komatsu. Žluť měla rivala. Velký rozkol nastal v polovině 50. let. Heretici modři se odhalili.' },
  { year: '1972', title: 'DESATERO CAT',
    body: 'Sepsáno Desatero. Anonymní autoři, snad mistři z více států. Začíná „Nebudeš mít jiné značky kromě mne." Text dosud kanonický.' },
  { year: '1989', title: 'PRVNÍ MUČEDNÍK',
    body: 'Pavel z Plzně padl ze 6090. Bratrstvo poprvé pochopilo, že hierarchie chrání pouze toho, kdo ji ctí. Vznikl Modlitebník.' },
  { year: '2003', title: 'CONEXPO LAS VEGAS',
    body: 'Hlavní svatá pouť. Bagristé se sjíždějí jednou za tři roky, aby viděli nové stroje. ConExpo se stalo poutním místem rovnocenným Lurdám.' },
  { year: '2019', title: 'VELKÝ MLČKO',
    body: 'Mistr Karel z Brna mlčel po dobu jedné celé motohodiny během porady. Bratrstvo pochopilo, že mlčení je nová liturgie. Stupeň Guru se posunul výš.' },
  { year: 'Dnes', title: 'EXPANZE NA INTERNET',
    body: 'Bratrstvo se začalo organizovat na sítích. Mladí Nováčci poprvé objevují celé Lore přes internet. Hydraulika sleduje a zatím neodpovídá.' },
];

const HistoryPage = ({ onNav }) => (
  <main style={{ background: 'var(--bg)', paddingBottom: 80 }}>
    <section className="container" style={{ padding: '64px 28px 24px' }}>
      <div className="page-meta">
        <span>Lore · Dějiny pravdy</span>
        <span>· {HISTORIE.length} kapitol</span>
        <span style={{ marginLeft: 'auto' }}>↻ Aktualizováno na motohodinu</span>
      </div>
      <h1 style={{ fontFamily: 'var(--display)', fontSize: 'clamp(60px,8vw,120px)', letterSpacing: '0.02em', lineHeight: 0.92, margin: '24px 0 16px', color: 'var(--fg)' }}>
        DĚJINY PRAVDY
      </h1>
      <p style={{ fontFamily: 'var(--body)', fontStyle: 'italic', fontSize: 20, color: 'var(--fg-dim)', maxWidth: 720, margin: 0 }}>
        Od prvního výkopu po Velký rozkol. Časová osa Bratrstva, čtená shora dolů. Každá kapitola je prst na ruce, kterou
        nás Hydraulika tvoří.
      </p>
    </section>

    <div style={{ height: 6 }} className="stripes-thin" />

    <section className="container" style={{ padding: '40px 28px 0' }}>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, position: 'relative' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: 116, top: 0, bottom: 0, width: 2, background: 'var(--zlut)' }} />
        {HISTORIE.map((h, i) => (
          <li key={i} style={{ display: 'grid', gridTemplateColumns: '120px 36px 1fr', gap: 0, alignItems: 'start', marginBottom: 56, position: 'relative' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 13, letterSpacing: '0.18em', color: 'var(--accent-num)', textAlign: 'right', paddingRight: 20, paddingTop: 4 }}>
              {h.year}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
              <span style={{ width: 14, height: 14, background: 'var(--zlut)', border: '2px solid var(--fg)', borderRadius: 2, position: 'relative', zIndex: 1 }} />
            </div>
            <article style={{ paddingLeft: 24 }}>
              <h2 style={{ fontFamily: 'var(--display)', fontSize: 32, letterSpacing: '0.02em', margin: '0 0 10px', color: 'var(--fg)' }}>{h.title}</h2>
              <p style={{ fontFamily: 'var(--body)', fontSize: 17, lineHeight: 1.65, color: 'var(--fg)', margin: 0, maxWidth: 720 }}>{h.body}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  </main>
);

window.MartyrsPage = MartyrsPage;
window.MechanicsPage = MechanicsPage;
window.HistoryPage = HistoryPage;
