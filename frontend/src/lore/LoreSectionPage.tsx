import { Link, useParams } from 'react-router-dom';
import { findHub, getIntro, listByCategory, type LoreCategory } from './loreContent';
import { MarkdownView } from './MarkdownView';

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

const titleStyle = {
  fontFamily: 'var(--display)',
  fontSize: 'clamp(48px, 9vw, 96px)',
  letterSpacing: '0.02em',
  margin: '0 0 12px',
  lineHeight: 0.95,
  color: 'var(--fg)',
  textTransform: 'uppercase' as const,
};

const perexStyle = {
  fontFamily: 'var(--body)',
  fontStyle: 'italic' as const,
  fontSize: 20,
  lineHeight: 1.5,
  color: 'var(--fg-dim)',
  margin: '0 0 32px',
  maxWidth: 720,
};

export function LoreSectionPage() {
  const { category } = useParams<{ category: string }>();
  if (!category) {
    return (
      <main className="container" style={{ padding: '48px 28px' }}>
        <p>Sekce nenalezena.</p>
      </main>
    );
  }

  if (!isLoreCategory(category)) {
    const hub = findHub(category);
    if (!hub) {
      return (
        <main className="container" style={{ padding: '48px 28px' }}>
          <div className="page-meta">
            <Link to="/lore">← Lore</Link>
          </div>
          <p>Stránka „{category}" v lore není.</p>
        </main>
      );
    }
    const hubTitle = typeof hub.data.nazev === 'string' ? hub.data.nazev : hub.slug;
    const hubPerex = typeof hub.data.perex === 'string' ? hub.data.perex : undefined;
    return (
      <main className="container" style={{ padding: '48px 28px 32px' }}>
        <div className="page-meta">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/lore">Lore</Link>
          <span>›</span>
          <span style={{ color: 'var(--fg)' }}>{hubTitle}</span>
        </div>
        <h1 style={titleStyle}>{hubTitle}</h1>
        {hubPerex && <p style={perexStyle}>{hubPerex}</p>}
        <div style={{ height: 6, marginBottom: 32 }} className="stripes-thin" />
        <MarkdownView body={hub.body} />
      </main>
    );
  }

  const items = listByCategory(category);
  const intro = getIntro(category);
  const title = SECTION_TITLES[category];

  return (
    <main className="container" style={{ padding: '48px 28px 32px' }}>
      <div className="page-meta">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/lore">Lore</Link>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>{title}</span>
        <span style={{ flex: 1 }} />
        <span>{items.length} položek</span>
      </div>
      <h1 style={titleStyle}>{title}</h1>
      {intro && (
        <div style={{ ...perexStyle, fontSize: 18 }}>
          <MarkdownView body={intro.body} />
        </div>
      )}
      <div style={{ height: 6, marginBottom: 32 }} className="stripes-thin" />

      <div className="card-grid">
        {items.map((doc) => {
          const itemTitle = typeof doc.data.nazev === 'string' ? doc.data.nazev : doc.slug;
          const subtitle = typeof doc.data.perex === 'string' ? doc.data.perex : undefined;
          const idPrefix = typeof doc.data.id === 'number' ? `${String(doc.data.id).padStart(2, '0')} · ` : '';
          return (
            <Link key={doc.slug} to={`/lore/${category}/${doc.slug}`} className="tile">
              <div className="mono-caption" style={{ marginBottom: 6, color: 'var(--accent-num)' }}>
                {idPrefix}
                {category === 'levels' && typeof doc.data.model === 'string' ? doc.data.model : category}
              </div>
              <div className="tile-title">{itemTitle}</div>
              {subtitle && <div className="tile-sub">{subtitle}</div>}
            </Link>
          );
        })}
      </div>
    </main>
  );
}
