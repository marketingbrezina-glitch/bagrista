const NAV_LINKS = [['Domů','home'],['Kvíz','quiz'],['Stupně','bridge'],['Sekty','sects'],['Slovník','glossary'],['Modlitebník','prayers'],['Mučedníci','martyrs'],['Mechanici','mechanics'],['Dějiny','history']];
const activeKey = (page) => ({ detail: 'bridge', 'sect-komatsu': 'sects' }[page] || page);

const Masthead = ({ page, onNav }) => (
  <header>
    <div className="ears lab"><span>Bratrstvo žluté lžíce</span><span>Vydání první · Na motohodinu</span></div>
    <div className={'plate' + (page === 'home' ? '' : ' sm')}>
      <h1 onClick={() => onNav('home')}><small>Věstník bagrovací komunity</small>Jsem Bagrista</h1>
      <div className="mot">„Skrze pásy, s pásy a v pásech."</div>
    </div>
    <nav className="navr">
      {NAV_LINKS.map(([l, k]) => <a key={k} className={activeKey(page) === k ? 'on' : ''} onClick={() => onNav(k)}>{l}</a>)}
    </nav>
  </header>
);

const Footer = ({ onNav }) => (
  <footer style={{ display: 'block' }}>
    <div className="fcols">
      <div><div className="sh"><span>Bratrstvo žluté lžíce</span></div><p><em>„Skrze pásy, s pásy a v pásech."</em><br />Bagrista je tu pro všechny, kteří hledají pravdu s lopatou v ruce. Na motohodinu!</p></div>
      <div><div className="sh"><span>Lore</span></div><ul>
        <li><a onClick={() => onNav('bridge')}>Stupně (7)</a></li><li><a onClick={() => onNav('sects')}>Sekty (7)</a></li><li><a onClick={() => onNav('prayers')}>Modlitebník</a></li><li><a onClick={() => onNav('martyrs')}>Mučedníci</a></li><li><a onClick={() => onNav('mechanics')}>Mechanici</a></li><li><a onClick={() => onNav('history')}>Dějiny pravdy</a></li></ul></div>
      <div><div className="sh"><span>Pojmy</span></div><ul>
        <li><a onClick={() => onNav('glossary')}>Žluť</a></li><li><a onClick={() => onNav('glossary')}>Hydraulika</a></li><li><a onClick={() => onNav('glossary')}>Motohodina</a></li><li><a onClick={() => onNav('glossary')}>Schrödingerův vtip</a></li><li><a onClick={() => onNav('glossary')}>Desatero CAT</a></li></ul></div>
    </div>
    <div className="lab" style={{ display: 'flex', justifyContent: 'space-between' }}><span>© Bagrista · Bratrstvo žluté lžíce</span><span>Ať tě žluť provází</span></div>
  </footer>
);

const Note = ({ label, children, attrib }) => (
  <div className="note">
    {label && <div className="lab">{label}</div>}
    <p className="q">{children}</p>
    {attrib && <div className="lab" style={{ marginTop: 10 }}>{attrib}</div>}
  </div>
);

const Wiki = ({ children, onClick }) => <a onClick={onClick} style={{ cursor: 'pointer' }}>{children}</a>;

const PageHead = ({ rubric, meta, title, lead, aside }) => (
  <section className={'head' + (aside ? '' : ' solo')}>
    <div>
      <div className="by lab"><span>{rubric}</span>{meta && <span>{meta}</span>}</div>
      <h1>{title}</h1>
      {lead && <p className="dk">{lead}</p>}
    </div>
    {aside}
  </section>
);

const Crumb = ({ items, right }) => (
  <div className="crumb lab">
    {items.map(([l, fn], i) => <React.Fragment key={i}>{i > 0 && <span>›</span>}{fn ? <a onClick={fn}>{l}</a> : <span style={{ color: 'var(--ink)' }}>{l}</span>}</React.Fragment>)}
    {right && <span style={{ marginLeft: 'auto' }}>{right}</span>}
  </div>
);

Object.assign(window, { Masthead, Footer, Note, Wiki, PageHead, Crumb });
