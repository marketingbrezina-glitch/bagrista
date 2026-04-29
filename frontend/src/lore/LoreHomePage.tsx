import { Link } from 'react-router-dom';
import type { LoreCategory } from './loreContent';

type Section = {
  to: string;
  label: string;
  hint: string;
  category?: LoreCategory | 'hub';
};

const SECTIONS: Section[] = [
  { to: '/lore/levels', label: 'Osm stupňů', hint: 'CAT 301.5 → CAT D9', category: 'levels' },
  { to: '/lore/phases', label: 'Cyklus bagrování', hint: '7 fází neúspěšného vtipu', category: 'phases' },
  { to: '/lore/slovnik', label: 'Slovník', hint: 'Pojmy, pozdravy, rčení', category: 'hub' },
  { to: '/lore/modlitebnik', label: 'Modlitebník', hint: 'Modlitby, požehnání, svátosti', category: 'hub' },
  { to: '/lore/credo', label: 'Credo bagristae', hint: 'Vyznání víry', category: 'hub' },
  { to: '/lore/holidays', label: 'Svátky', hint: 'ConExpo, Smutný pátek, Dušičky', category: 'holidays' },
  { to: '/lore/rituals', label: 'Rituály', hint: 'Walk-around, mazání, Naložení Tatry', category: 'rituals' },
  { to: '/lore/concepts', label: 'Pojmy', hint: 'Hydraulika, motohodina, žluť', category: 'concepts' },
  { to: '/lore/sects', label: 'Kacířské sekty', hint: 'Komatsuáni, Hitachisté, Volvoité…', category: 'sects' },
  { to: '/lore/brands', label: 'Značky', hint: 'CAT a jeho stíny', category: 'brands' },
  { to: '/lore/scriptures', label: 'Svatá písma', hint: 'Genesis, Pentateuch, Apokryfy', category: 'scriptures' },
  { to: '/lore/mechanici', label: 'Kasta nečistých', hint: 'Mechanici', category: 'hub' },
  { to: '/lore/mucednici', label: 'Mučedníci', hint: 'Příběhy padlých bagristů', category: 'hub' },
  { to: '/lore/dejiny-pravdy', label: 'Dějiny Pravdy', hint: 'Od Babylonu k Peorii', category: 'hub' },
];

export function LoreHomePage() {
  return (
    <main className="container" style={{ padding: '48px 28px 32px' }}>
      <div className="page-meta">
        <Link to="/">Home</Link>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>Lore</span>
        <span style={{ flex: 1 }} />
        <span>14 sekcí · MTH ∞</span>
      </div>

      <h1
        style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(60px, 11vw, 120px)',
          letterSpacing: '0.02em',
          margin: 0,
          marginBottom: 12,
          lineHeight: 0.95,
          color: 'var(--fg)',
        }}
      >
        LORE
      </h1>
      <p
        style={{
          fontFamily: 'var(--body)',
          fontStyle: 'italic',
          fontSize: 22,
          lineHeight: 1.5,
          color: 'var(--fg-dim)',
          margin: '0 0 32px',
          maxWidth: 720,
        }}
      >
        Encyklopedie Bagristů Pravdy — Společenství kopajících. Osm stupňů, sedm
        fází, sedm svátků a několik kacířských sekt, kterých se výslovně straníme.
      </p>

      <div style={{ height: 6 }} className="stripes-thin" />

      <div className="card-grid" style={{ marginTop: 32 }}>
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} className="tile">
            <div className="tile-title">{s.label}</div>
            <div className="tile-sub">{s.hint}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
