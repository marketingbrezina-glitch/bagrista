import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { LoreCategory } from './loreContent';

const pageStyle: CSSProperties = {
  maxWidth: 800,
  margin: '0 auto',
  padding: '48px 24px',
};

const titleStyle: CSSProperties = {
  fontSize: 32,
  margin: 0,
  marginBottom: 8,
  fontWeight: 700,
};

const introStyle: CSSProperties = {
  fontSize: 16,
  color: '#555',
  marginBottom: 40,
  lineHeight: 1.5,
};

const sectionsGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: 12,
  marginBottom: 48,
};

const cardStyle: CSSProperties = {
  display: 'block',
  padding: '16px 18px',
  border: '1px solid #e5e5e5',
  borderRadius: 8,
  textDecoration: 'none',
  color: '#222',
  background: '#fff',
};

const cardTitle: CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginBottom: 4,
};

const cardSub: CSSProperties = {
  fontSize: 13,
  color: '#777',
  lineHeight: 1.4,
};

type Section = {
  to: string;
  label: string;
  hint: string;
  type: 'category' | 'hub';
  category?: LoreCategory;
};

const SECTIONS: Section[] = [
  { to: '/lore/levels', label: 'Osm stupňů', hint: 'CAT 301.5 → CAT D9', type: 'category', category: 'levels' },
  { to: '/lore/phases', label: 'Cyklus bagrování', hint: '7 fází neúspěšného vtipu', type: 'category', category: 'phases' },
  { to: '/lore/slovnik', label: 'Slovník', hint: 'Pojmy, pozdravy, rčení', type: 'hub' },
  { to: '/lore/modlitebnik', label: 'Modlitebník', hint: 'Modlitby, požehnání, svátosti', type: 'hub' },
  { to: '/lore/credo', label: 'Credo bagristae', hint: 'Vyznání víry', type: 'hub' },
  { to: '/lore/holidays', label: 'Svátky', hint: 'ConExpo, Smutný pátek, Dušičky', type: 'category', category: 'holidays' },
  { to: '/lore/rituals', label: 'Rituály', hint: 'Walk-around, mazání, Naložení Tatry', type: 'category', category: 'rituals' },
  { to: '/lore/concepts', label: 'Pojmy', hint: 'Hydraulika, motohodina, žluť', type: 'category', category: 'concepts' },
  { to: '/lore/sects', label: 'Kacířské sekty', hint: 'Komatsuáni, Hitachisté, Volvoité…', type: 'category', category: 'sects' },
  { to: '/lore/brands', label: 'Značky', hint: 'CAT a jeho stíny', type: 'category', category: 'brands' },
  { to: '/lore/scriptures', label: 'Svatá písma', hint: 'Genesis, Pentateuch, Apokryfy', type: 'category', category: 'scriptures' },
  { to: '/lore/mechanici', label: 'Kasta nečistých', hint: 'Mechanici', type: 'hub' },
  { to: '/lore/mucednici', label: 'Mučedníci', hint: 'Příběhy padlých bagristů', type: 'hub' },
  { to: '/lore/dejiny-pravdy', label: 'Dějiny Pravdy', hint: 'Od Babylonu k Peorii', type: 'hub' },
];

export function LoreHomePage() {
  return (
    <main style={pageStyle}>
      <h1 style={titleStyle}>Lore</h1>
      <p style={introStyle}>
        Encyklopedie Bagristů Pravdy — Společenství kopajících. Osm stupňů, sedm
        fází, sedm svátků a několik kacířských sekt, kterých se výslovně straníme.
      </p>
      <div style={sectionsGrid}>
        {SECTIONS.map((s) => (
          <Link key={s.to} to={s.to} style={cardStyle}>
            <div style={cardTitle}>{s.label}</div>
            <div style={cardSub}>{s.hint}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
