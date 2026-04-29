import type { CSSProperties } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const headerStyle: CSSProperties = {
  borderBottom: '1px solid #e5e5e5',
  background: '#fff',
};

const headerInner: CSSProperties = {
  maxWidth: 960,
  margin: '0 auto',
  padding: '16px 24px',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: 24,
  flexWrap: 'wrap',
};

const brandStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
  color: '#222',
  textDecoration: 'none',
  letterSpacing: '-0.01em',
};

const navStyle: CSSProperties = {
  display: 'flex',
  gap: 20,
  fontSize: 15,
};

const linkBase: CSSProperties = {
  color: '#444',
  textDecoration: 'none',
  paddingBottom: 2,
  borderBottomWidth: 2,
  borderBottomStyle: 'solid',
  borderBottomColor: 'transparent',
};

const linkActive: CSSProperties = {
  ...linkBase,
  color: '#000',
  borderBottomColor: '#000',
};

const footerStyle: CSSProperties = {
  borderTop: '1px solid #eee',
  padding: '16px 24px',
  marginTop: 64,
  fontSize: 12,
  color: '#999',
  textAlign: 'center',
};

const mainStyle: CSSProperties = {
  fontFamily: 'system-ui, sans-serif',
  color: '#222',
  minHeight: 'calc(100vh - 140px)',
};

export function Layout() {
  return (
    <div style={mainStyle}>
      <header style={headerStyle} className="quiz-no-print">
        <div style={headerInner}>
          <Link to="/" style={brandStyle}>
            Bagrista
          </Link>
          <nav style={navStyle}>
            <NavLink to="/" end style={({ isActive }) => (isActive ? linkActive : linkBase)}>
              Domů
            </NavLink>
            <NavLink to="/kviz" style={({ isActive }) => (isActive ? linkActive : linkBase)}>
              Kvíz
            </NavLink>
            <NavLink to="/lore" style={({ isActive }) => (isActive ? linkActive : linkBase)}>
              Lore
            </NavLink>
          </nav>
        </div>
      </header>

      <Outlet />

      <footer style={footerStyle} className="quiz-no-print">
        Bagristé Pravdy — Společenství kopajících. Satira, ne náboženství.
      </footer>
    </div>
  );
}
