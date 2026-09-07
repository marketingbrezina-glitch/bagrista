import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';

type NavItem = { label: string; to: string; end?: boolean };

const NAV_LINKS: NavItem[] = [
  { label: 'Domů', to: '/', end: true },
  { label: 'Kvíz', to: '/kviz' },
  { label: 'Stupně', to: '/lore/levels' },
  { label: 'Sekty', to: '/lore/sects' },
  { label: 'Slovník', to: '/lore/slovnik' },
  { label: 'Modlitebník', to: '/lore/modlitebnik' },
  { label: 'Mučedníci', to: '/lore/mucednici' },
  { label: 'Mechanici', to: '/lore/mechanici' },
  { label: 'Dějiny', to: '/lore/dejiny-pravdy' },
];

const FOOTER_LORE: NavItem[] = [
  { label: 'Stupně (8)', to: '/lore/levels' },
  { label: 'Sekty (7)', to: '/lore/sects' },
  { label: 'Modlitebník', to: '/lore/modlitebnik' },
  { label: 'Mučedníci', to: '/lore/mucednici' },
  { label: 'Mechanici', to: '/lore/mechanici' },
  { label: 'Dějiny pravdy', to: '/lore/dejiny-pravdy' },
];

const FOOTER_CONCEPTS: NavItem[] = [
  { label: 'Žluť', to: '/lore/concepts/zlut' },
  { label: 'Hydraulika', to: '/lore/concepts/hydraulika' },
  { label: 'Motohodina', to: '/lore/concepts/motohodina' },
  { label: 'Schrödingerův vtip', to: '/lore/concepts/schrodingeruv-vtip' },
  { label: 'Desatero', to: '/lore/concepts/desatero' },
];

export function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <div className="sheet">
      <header className="quiz-no-print">
        <div className="ears lab">
          <span>Bratrstvo žluté lžíce</span>
          <span>Vydání první · Na motohodinu</span>
        </div>

        <div className={isHome ? 'plate' : 'plate sm'}>
          <h1>
            <small>Věstník bagrovací komunity</small>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Jsem Bagrista
            </Link>
          </h1>
          <div className="mot">„Skrze pásy, s pásy a v pásech."</div>
        </div>

        <nav className="navr">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? 'on' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Outlet />

      <footer className="quiz-no-print" style={{ display: 'block' }}>
        <div className="fcols">
          <div>
            <div className="sh">
              <span>Bratrstvo žluté lžíce</span>
            </div>
            <p>
              <em>„Skrze pásy, s pásy a v pásech."</em>
              <br />
              Bagrista je tu pro všechny, kteří hledají pravdu s lopatou v ruce. Na
              motohodinu!
            </p>
          </div>

          <div>
            <div className="sh">
              <span>Lore</span>
            </div>
            <ul>
              {FOOTER_LORE.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="sh">
              <span>Pojmy</span>
            </div>
            <ul>
              {FOOTER_CONCEPTS.map((link) => (
                <li key={link.to}>
                  <Link to={link.to}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lab" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>© Bagrista · Bratrstvo žluté lžíce</span>
          <span>Ať tě žluť provází</span>
        </div>
      </footer>
    </div>
  );
}
