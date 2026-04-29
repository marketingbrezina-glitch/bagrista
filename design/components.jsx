// Shared Bagrista components

const Bucket = ({ size = 28, color = 'var(--zlut)', tilt = -8 }) => (
  <svg width={size} height={size * 0.7} viewBox="0 0 100 70" style={{ transform: `rotate(${tilt}deg)` }}>
    <path d="M 8 8 L 92 14 L 84 50 L 16 46 Z" fill={color} />
    <path d="M 16 46 L 20 60 L 26 50 L 32 62 L 38 51 L 44 63 L 50 51 L 56 63 L 62 51 L 68 62 L 74 50 L 80 60 L 84 50 Z" fill={color} />
    <circle cx="50" cy="14" r="5" fill="var(--black)" />
    <circle cx="50" cy="14" r="2" fill={color} />
  </svg>
);

// The "Jsem Bagrista" wordmark — bucket-as-diacritic variant
const Wordmark = ({ size = 1, light = false, accent = 'var(--zlut)' }) => {
  const fg = light ? 'var(--fg)' : 'var(--bg)';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
      <div style={{
        fontFamily: 'var(--headline)',
        fontWeight: 500,
        fontSize: 14 * size,
        letterSpacing: '0.5em',
        textTransform: 'uppercase',
        marginBottom: 4 * size,
        paddingLeft: '0.5em',
        color: fg,
        opacity: 0.85,
      }}>Jsem</div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{
          position: 'absolute',
          right: `${8 * size}px`,
          top: `-${20 * size}px`,
          transform: 'rotate(-8deg)',
        }}>
          <Bucket size={32 * size} color={accent} />
        </div>
        <div style={{
          fontFamily: "'Archivo Black', 'Anton', sans-serif",
          fontWeight: 900,
          fontSize: 64 * size,
          letterSpacing: '-0.005em',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          color: fg,
        }}>BAGRISTA</div>
      </div>
    </div>
  );
};

// Compact wordmark for navbars/footers
const WordmarkInline = ({ light = true }) => {
  const fg = light ? 'var(--fg)' : 'var(--bg)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontFamily: 'var(--headline)',
        fontSize: 11, letterSpacing: '0.42em',
        textTransform: 'uppercase',
        color: 'var(--fg-dim)',
      }}>Jsem</span>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{
          position: 'absolute', right: 2, top: -8,
          transform: 'rotate(-8deg)',
        }}>
          <Bucket size={14} color="var(--zlut)" />
        </span>
        <span style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: 22,
          letterSpacing: '-0.005em',
          textTransform: 'uppercase',
          color: fg,
        }}>BAGRISTA</span>
      </span>
    </div>
  );
};

// Top navigation
const TopBar = ({ page, onNav }) => {
  const links = [
    ['HOME', 'home'],
    ['KVÍZ', 'quiz'],
    ['STUPNĚ', 'bridge'],
    ['SEKTY', 'sects'],
    ['SLOVNÍK', 'glossary'],
    ['MODLITEBNÍK', 'prayers'],
  ];
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" onClick={() => onNav('home')}>
          <WordmarkInline />
        </a>
        <nav className="nav">
          {links.map(([label, key]) => (
            <a key={key}
              className={page === key ? 'active' : ''}
              onClick={() => onNav(key)}>{label}</a>
          ))}
        </nav>
        <button className="btn" onClick={() => onNav('quiz')}>
          Spusť kvíz <span style={{ fontSize: 14 }}>→</span>
        </button>
      </div>
      <div style={{ height: 4 }} className="stripes-thin" />
    </header>
  );
};

// Footer
const Footer = ({ onNav }) => (
  <footer className="footer">
    <div className="footer-inner">
      <div>
        <h4>— Bratrstvo žluté lžíce —</h4>
        <div className="footer-creed">
          <em>„Skrze pásy, s pásy a v pásech."</em>
          <br /><br />
          Bagrista je tu pro všechny, kteří hledají pravdu s lopatou v ruce.
          Na motohodinu!
        </div>
      </div>
      <div>
        <h4>Lore</h4>
        <ul>
          <li><a onClick={() => onNav && onNav('bridge')}>Stupně (7)</a></li>
          <li><a onClick={() => onNav && onNav('sects')}>Sekty (7)</a></li>
          <li><a onClick={() => onNav && onNav('prayers')}>Modlitebník</a></li>
          <li><a onClick={() => onNav && onNav('martyrs')}>Mučedníci</a></li>
          <li><a onClick={() => onNav && onNav('mechanics')}>Mechanici</a></li>
          <li><a onClick={() => onNav && onNav('history')}>Dějiny pravdy</a></li>
        </ul>
      </div>
      <div>
        <h4>Pojmy</h4>
        <ul>
          <li><a onClick={() => onNav && onNav('glossary')}>Žluť</a></li>
          <li><a onClick={() => onNav && onNav('glossary')}>Hydraulika</a></li>
          <li><a onClick={() => onNav && onNav('glossary')}>Motohodina</a></li>
          <li><a onClick={() => onNav && onNav('glossary')}>Schrödingerův vtip</a></li>
          <li><a onClick={() => onNav && onNav('glossary')}>Desatero CAT</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <span>MTH ∞ · BGR-001 · Vyznání v.1</span>
      <span>— Ať tě žluť provází —</span>
    </div>
  </footer>
);

// Quote / creed block
const Creed = ({ label = 'Závěrečné požehnání', text, attrib }) => (
  <div className="creed">
    <div className="creed-label">— {label} —</div>
    <div className="creed-text">{text}</div>
    {attrib && <div className="creed-attrib">{attrib}</div>}
  </div>
);

// Wiki-style internal link
const Wiki = ({ children, onClick }) => (
  <a className="wikilink" onClick={onClick}>{children}</a>
);

Object.assign(window, {
  Bucket, Wordmark, WordmarkInline, TopBar, Footer, Creed, Wiki,
});
