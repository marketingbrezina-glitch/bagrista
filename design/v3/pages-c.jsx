const QuizPage = ({ onNav }) => {
  const Q = window.KVIZ_OTAZKY, R = window.STUPNE_VYSLEDKY;
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const total = Q.length;
  const select = (s) => { setAnswers([...answers, s]); setStep(step + 1); };
  const restart = () => { setStep(0); setAnswers([]); };

  if (step >= total) {
    const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
    const st = Math.max(1, Math.min(7, Math.round(avg)));
    const r = R[st];
    return (
      <main>
        <section className="head" style={{ gridTemplateColumns: '1fr 260px' }}>
          <div>
            <div className="by lab"><span>Výsledek</span><span>{answers.length} otázek zodpovězeno</span></div>
            <div className="lab" style={{ marginBottom: 8 }}>Hydraulika tě zařadila na</div>
            <h1 style={{ fontSize: 'clamp(56px,7vw,92px)', fontWeight: 900 }}>{window.cap(r.name)}</h1>
            <p className="dk" style={{ fontStyle: 'normal', fontSize: 17 }}>{r.kicker} · {r.model}</p>
          </div>
          <div className="card y" style={{ textAlign: 'center' }}><div className="lab" style={{ color: 'var(--ink-2)' }}>Stupeň</div><div style={{ fontFamily: 'var(--np)', fontWeight: 900, fontSize: 120, lineHeight: 1, letterSpacing: '-0.04em' }}>{String(st).padStart(2,'0')}</div><div className="lab" style={{ color: 'var(--ink-2)' }}>z 08</div></div>
        </section>
        <section className="sec two">
          <div><div className="sh top"><span>Výklad</span></div><div className="body"><p>{r.txt}</p><p style={{ color: 'var(--ink-2)', fontStyle: 'italic' }}>Pravda je proměnlivá. Motohodiny stoupají. Možná za rok budeš jinde.</p></div></div>
          <div><Note label="Závěrečné požehnání" attrib="Tak jest, na motohodinu.">Ať tě žluť provází. Ať tě pásy nesou.<br />Ať máš lžíci plnou a korbu blízko.</Note></div>
        </section>
        <section className="sec" style={{ borderBottom: 0, display: 'flex', gap: 12, justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><button className="btn" onClick={() => onNav('detail')}>Číst o svém stupni</button><button className="btn o" onClick={() => onNav('bridge')}>Všech 7 stupňů</button></div>
          <button className="btn o" onClick={restart}>Spustit znovu</button>
        </section>
      </main>
    );
  }

  const q = Q[step];
  return (
    <main>
      <div style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: 20, borderBottom: '1px solid var(--hair)' }}>
        <span className="lab" style={{ color: 'var(--ink)' }}>Otázka {step + 1} / {total}</span>
        <div className="prog" style={{ flex: 1 }}><i style={{ width: `${(step / total) * 100}%` }} /></div>
        <span className="lab">{Math.round((step / total) * 100)} %</span>
      </div>
      <section className="sec" style={{ maxWidth: 860, borderBottom: 0 }}>
        <div className="lab" style={{ marginBottom: 14 }}>Hydraulika se ptá</div>
        <h1 style={{ fontSize: 'clamp(30px,4vw,44px)', marginBottom: 32 }}>{q.q}</h1>
        <div style={{ display: 'grid', gap: 10 }}>
          {q.a.map((o, i) => <button key={i} className="opt" onClick={() => select(o.s)}><b>{String.fromCharCode(65 + i)}</b>{o.t}</button>)}
        </div>
      </section>
    </main>
  );
};

const MartyrsPage = ({ onNav }) => {
  const M = window.MUCEDNICI;
  return (
    <main>
      <PageHead rubric="Lore · Mučedníci" meta={`${M.length} pádů`} title="Mučedníci pádu"
        lead="Bratři, kteří padli — fyzicky, sociálně, duchovně. Jejich příběhy se vyprávějí, aby ostatní nepadli. Studuj je. Není potřeba se jim smát." />
      <section className="sec" style={{ borderBottom: 0 }}>
        {M.map((m, i) => (
          <article key={m.id} style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 28, padding: '28px 0', borderTop: i ? '1px solid var(--hair)' : 0 }}>
            <div style={{ fontFamily: 'var(--np)', fontWeight: 900, fontSize: 40, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--red)' }}>{String(i+1).padStart(2,'0')}</div>
            <div style={{ maxWidth: 720 }}>
              <div className="lab" style={{ marginBottom: 6 }}>† {m.dates}</div>
              <h3 style={{ fontSize: 30 }}>{m.name}</h3>
              <p style={{ fontStyle: 'italic', color: 'var(--ink-2)', margin: '8px 0 12px' }}>{m.short}</p>
              <p style={{ margin: 0, lineHeight: 1.65 }}>{m.body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

const MechanicsPage = ({ onNav }) => (
  <main>
    <PageHead rubric="Lore · Mechanici" meta="Kasta nečistých" title="Mechanici"
      lead="Stojí mimo strukturu osmi stupňů. Nejsou bratrstvo, ale bez nich bratrstvo nepřežije. Kasta nečistých — ne pro špínu, ale pro účet." />
    <section className="sec" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 64, borderBottom: 0 }}>
      <div>
        <div className="sh top"><span>Kapitola</span><span>Mechanici</span></div>
        <div className="body">
          <p>Mechanici nejsou bagristé. Nejsou ani Komatsuáni, ani Hitachisté. Jsou <em>třetí síla</em> — nutná, ale nečistá. Bagrista o nich říká: <strong>„přijde mechanik a budeš mu platit"</strong>. Tím je řečeno vše. Mechanik je ten, kdo si bere motohodiny zpátky.</p>
          <h2>Postavení</h2>
          <p>Bagrista a mechanik si tykají, ale nemilují se. Bagrista mechanika potřebuje, jako vesnice potřebuje hrobaře. Bratrstvo má své stupně, mechanici mají své <strong>hodinové sazby</strong>. Jedno se stoupá, druhé se platí.</p>
          <h2>Rituály</h2>
          <p>Když mechanik přijde, nese kufr s nářadím a kalkulačku. Položí kufr, otevře, a začne to, čemu bratrstvo říká <em>„dlouhý ticho před cenou"</em>. V tom tichu bagrista ví, že se rozhoduje budoucnost.</p>
          <p>Mechanik nikdy neřekne <em>„vím, co to je"</em>. Vždy řekne <em>„podívám se na to"</em>. To je liturgie kasty. Pak se podívá. Pak řekne číslo. Bagrista mlčí. Hydraulika mlčí. Penize odejdou.</p>
          <h2>Ke komu patří</h2>
          <p>Mechanici jsou sami sobě. Mají svou hierarchii, svou guildu, své anekdoty. Bagristé do toho nevidí, a bagristé to neřeší. Hlavní je, aby mechanik <em>přišel</em>. Pozdě, draho — ale přišel.</p>
        </div>
      </div>
      <aside className="card" style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
        <div className="sh"><span>Hierarchie mechaniků</span></div>
        {[['α','Servisman','Vyměňuje filtry, doplňuje oleje. Bez něj se motor zadrhne.'],['β','Hydraulik','Specialista. Když praskne velká hadice, volá se on. Drahý.'],['γ','Diagnostik','Čte kódy. Ten, koho voláš, když nikdo neví. Ještě dražší.'],['δ','Mistr servisu','Stojí v kanceláři. Účtuje. Bagrista ho potkává jen v krizi.']].map(([g,t,d], i) => (
          <div key={g} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, padding: '12px 0', borderTop: i ? '1px solid var(--hair)' : 0 }}>
            <span style={{ fontFamily: 'var(--np)', fontWeight: 700, fontSize: 22 }}>{g}</span>
            <div><div style={{ fontWeight: 600, fontSize: 16 }}>{t}</div><div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4 }}>{d}</div></div>
          </div>
        ))}
      </aside>
    </section>
  </main>
);

const HistoryPage = ({ onNav }) => {
  const H = window.HISTORIE;
  return (
    <main>
      <PageHead rubric="Lore · Dějiny pravdy" meta={`${H.length} kapitol`} title="Dějiny pravdy"
        lead="Od prvního výkopu po Velký rozkol. Časová osa Bratrstva, čtená shora dolů. Každá kapitola je prst na ruce, kterou nás Hydraulika tvoří." />
      <section className="sec" style={{ borderBottom: 0 }}>
        <ol className="tl">
          {H.map((h, i) => (
            <li key={i}><div className="yr">{h.year}</div><div className="dot" /><div style={{ maxWidth: 680 }}><h3 style={{ fontSize: 26 }}>{window.cap(h.title)}</h3><p style={{ margin: '10px 0 0', lineHeight: 1.65 }}>{h.body}</p></div></li>
          ))}
        </ol>
      </section>
    </main>
  );
};

Object.assign(window, { QuizPage, MartyrsPage, MechanicsPage, HistoryPage });
