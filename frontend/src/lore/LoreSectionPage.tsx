import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findHub, getIntro, listByCategory, type LoreCategory } from './loreContent';
import { MarkdownView } from './MarkdownView';

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

const breadcrumbStyle: CSSProperties = {
  fontSize: 13,
  color: '#888',
  marginBottom: 16,
};

const introStyle: CSSProperties = {
  fontSize: 15,
  color: '#444',
  marginBottom: 32,
  lineHeight: 1.6,
};

const listStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: 12,
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const cardStyle: CSSProperties = {
  display: 'block',
  padding: '14px 16px',
  border: '1px solid #e5e5e5',
  borderRadius: 8,
  textDecoration: 'none',
  color: '#222',
  background: '#fff',
};

const itemTitle: CSSProperties = {
  fontSize: 15,
  fontWeight: 600,
  marginBottom: 4,
};

const itemSub: CSSProperties = {
  fontSize: 13,
  color: '#777',
  lineHeight: 1.4,
};

const SECTION_TITLES: Record<LoreCategory, string> = {
  levels: 'Osm stupňů',
  phases: 'Cyklus bagrování',
  sects: 'Kacířské sekty',
  brands: 'Značky',
  holidays: 'Svátky',
  rituals: 'Rituály',
  concepts: 'Pojmy',
  scriptures: 'Svatá písma',
  hub: 'Lore',
};

const VALID_CATEGORIES: readonly LoreCategory[] = [
  'levels',
  'phases',
  'sects',
  'brands',
  'holidays',
  'rituals',
  'concepts',
  'scriptures',
];

function isLoreCategory(value: string): value is LoreCategory {
  return (VALID_CATEGORIES as readonly string[]).includes(value);
}

export function LoreSectionPage() {
  const { category } = useParams<{ category: string }>();
  if (!category) {
    return (
      <main style={pageStyle}>
        <p style={breadcrumbStyle}>
          <Link to="/lore">← Lore</Link>
        </p>
        <p>Sekce nenalezena.</p>
      </main>
    );
  }

  if (!isLoreCategory(category)) {
    const hub = findHub(category);
    if (!hub) {
      return (
        <main style={pageStyle}>
          <p style={breadcrumbStyle}>
            <Link to="/lore" style={{ color: '#666' }}>
              ← Lore
            </Link>
          </p>
          <p>Stránka „{category}" v lore není.</p>
        </main>
      );
    }
    const hubTitle = typeof hub.data.nazev === 'string' ? hub.data.nazev : hub.slug;
    const hubPerex = typeof hub.data.perex === 'string' ? hub.data.perex : undefined;
    return (
      <main style={pageStyle}>
        <p style={breadcrumbStyle}>
          <Link to="/lore" style={{ color: '#888' }}>
            ← Lore
          </Link>
        </p>
        <h1 style={titleStyle}>{hubTitle}</h1>
        {hubPerex && <p style={{ ...introStyle, marginBottom: 32 }}>{hubPerex}</p>}
        <MarkdownView body={hub.body} />
      </main>
    );
  }

  const items = listByCategory(category);
  const intro = getIntro(category);
  const title = SECTION_TITLES[category];

  return (
    <main style={pageStyle}>
      <p style={breadcrumbStyle}>
        <Link to="/lore" style={{ color: '#666' }}>
          ← Lore
        </Link>
      </p>
      <h1 style={titleStyle}>{title}</h1>
      {intro && (
        <div style={introStyle}>
          <MarkdownView body={intro.body} />
        </div>
      )}
      <ul style={listStyle}>
        {items.map((doc) => (
          <li key={doc.slug}>
            <Link to={`/lore/${category}/${doc.slug}`} style={cardStyle}>
              <div style={itemTitle}>
                {typeof doc.data.id === 'number' && `${doc.data.id}. `}
                {typeof doc.data.nazev === 'string' ? doc.data.nazev : doc.slug}
              </div>
              {typeof doc.data.perex === 'string' && (
                <div style={itemSub}>{doc.data.perex}</div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
