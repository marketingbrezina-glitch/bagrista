import { Link, NavLink, Outlet } from 'react-router-dom';
import { WordmarkInline } from './brand/Wordmark';

const NAV_LINKS: { label: string; to: string; end?: boolean }[] = [
  { label: 'Domů', to: '/', end: true },
  { label: 'Kvíz', to: '/kviz' },
  { label: 'Stupně', to: '/lore/levels' },
  { label: 'Sekty', to: '/lore/sects' },
  { label: 'Slovník', to: '/lore/slovnik' },
  { label: 'Modlitebník', to: '/lore/modlitebnik' },
];

export function Layout() {
  return (
    <div className="shell">
      <header className="topbar quiz-no-print">
        <div className="topbar-inner">
          <Link to="/" className="brand">
            <WordmarkInline />
          </Link>
          <nav className="nav">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link to="/kviz" className="btn">
            Spusť kvíz <span style={{ fontSize: 14 }}>→</span>
          </Link>
        </div>
        <div style={{ height: 4 }} className="stripes-thin" />
      </header>

      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

      <footer className="footer quiz-no-print">
        <div className="footer-inner">
          <div>
            <h4>— Bratrstvo žluté lžíce —</h4>
            <div className="footer-creed">
              <em>„Skrze pásy, s pásy a v pásech."</em>
              <br />
              <br />
              Bagrista je tu pro všechny, kteří hledají pravdu s lopatou v ruce.
              Na motohodinu!
            </div>
          </div>
          <div>
            <h4>Lore</h4>
            <ul>
              <li><Link to="/lore/levels">Osm stupňů</Link></li>
              <li><Link to="/lore/sects">Kacířské sekty</Link></li>
              <li><Link to="/lore/modlitebnik">Modlitebník</Link></li>
              <li><Link to="/lore/mucednici">Mučedníci</Link></li>
              <li><Link to="/lore/mechanici">Mechanici</Link></li>
              <li><Link to="/lore/dejiny-pravdy">Dějiny pravdy</Link></li>
            </ul>
          </div>
          <div>
            <h4>Pojmy</h4>
            <ul>
              <li><Link to="/lore/concepts/zlut">Žluť</Link></li>
              <li><Link to="/lore/concepts/hydraulika">Hydraulika</Link></li>
              <li><Link to="/lore/concepts/motohodina">Motohodina</Link></li>
              <li><Link to="/lore/concepts/schrodingeruv-vtip">Schrödingerův vtip</Link></li>
              <li><Link to="/lore/concepts/desatero">Desatero CAT</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>MTH ∞ · BGR-001 · Vyznání v.1</span>
          <span>— Ať tě žluť provází —</span>
        </div>
      </footer>
    </div>
  );
}
