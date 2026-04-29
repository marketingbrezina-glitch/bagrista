import { Link, useParams } from 'react-router-dom';
import { findDoc, type LoreCategory } from './loreContent';
import { MarkdownView } from './MarkdownView';

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

export function LoreDocPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  if (!category || !slug || !isLoreCategory(category)) {
    return (
      <main className="container" style={{ padding: '48px 28px' }}>
        <div className="page-meta">
          <Link to="/lore">← Lore</Link>
        </div>
        <p>Stránka nenalezena.</p>
      </main>
    );
  }

  const doc = findDoc(category, slug);
  if (!doc) {
    return (
      <main className="container" style={{ padding: '48px 28px' }}>
        <div className="page-meta">
          <Link to={`/lore/${category}`}>← {SECTION_TITLES[category]}</Link>
        </div>
        <p>Tahle stránka v lore zatím není.</p>
      </main>
    );
  }

  const title = typeof doc.data.nazev === 'string' ? doc.data.nazev : doc.slug;
  const model = typeof doc.data.model === 'string' ? doc.data.model : undefined;
  const motto = typeof doc.data.motto === 'string' ? doc.data.motto : undefined;
  const perex = typeof doc.data.perex === 'string' ? doc.data.perex : undefined;
  const id = typeof doc.data.id === 'number' ? doc.data.id : undefined;

  const metaItems: string[] = [];
  if (typeof doc.data.kdy === 'string') metaItems.push(doc.data.kdy);
  if (typeof doc.data.frekvence === 'string') metaItems.push(doc.data.frekvence);
  if (typeof doc.data.delka_min === 'number') metaItems.push(`${doc.data.delka_min} min`);
  if (typeof doc.data.hmotnost_t === 'number') metaItems.push(`${doc.data.hmotnost_t} t`);
  if (typeof doc.data.zeme === 'string') metaItems.push(doc.data.zeme);
  if (typeof doc.data.zalozeno === 'number') metaItems.push(`Zal. ${doc.data.zalozeno}`);
  if (typeof doc.data.typ_pojmu === 'string') metaItems.push(doc.data.typ_pojmu);
  if (typeof doc.data.cislo_fraze === 'string') metaItems.push(`Fáze ${doc.data.cislo_fraze}`);
  if (typeof doc.data.stav === 'string') metaItems.push(doc.data.stav);

  const prevSlug = typeof doc.data.predchozi === 'string' ? doc.data.predchozi : undefined;
  const nextSlug = typeof doc.data.dalsi === 'string' ? doc.data.dalsi : undefined;

  const heroH1 =
    category === 'levels' && id !== undefined ? `Bagrista úrovně ${id}` : title;

  const subtitle =
    category === 'levels'
      ? [model, title].filter(Boolean).join(' · ')
      : model;

  return (
    <main className="container" style={{ padding: '48px 28px 32px', maxWidth: 880 }}>
      <div className="page-meta">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/lore">Lore</Link>
        <span>›</span>
        <Link to={`/lore/${category}`}>{SECTION_TITLES[category]}</Link>
        <span>›</span>
        <span style={{ color: 'var(--fg)' }}>{title}</span>
        {id !== undefined && (
          <>
            <span style={{ flex: 1 }} />
            <span>
              {String(id).padStart(2, '0')} / {category === 'phases' ? '07' : '08'}
            </span>
          </>
        )}
      </div>

      <h1
        style={{
          fontFamily: 'var(--display)',
          fontSize: 'clamp(48px, 9vw, 96px)',
          letterSpacing: '0.02em',
          lineHeight: 0.95,
          margin: 0,
          marginBottom: 8,
          color: 'var(--fg)',
          textTransform: 'uppercase',
        }}
      >
        {heroH1}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--mono)',
            fontSize: 13,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--accent-num)',
            margin: 0,
            marginBottom: 18,
          }}
        >
          {subtitle}
        </p>
      )}

      {motto && (
        <p
          style={{
            fontStyle: 'italic',
            fontSize: 22,
            color: 'var(--fg-dim)',
            margin: '0 0 24px',
            lineHeight: 1.5,
          }}
        >
          „{motto}"
        </p>
      )}
      {perex && (
        <p
          style={{
            fontStyle: 'italic',
            fontSize: 20,
            color: 'var(--fg)',
            lineHeight: 1.55,
            margin: '0 0 28px',
          }}
        >
          {perex}
        </p>
      )}

      {metaItems.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 32,
          }}
        >
          {metaItems.map((m) => (
            <span key={m} className="chip">
              {m}
            </span>
          ))}
        </div>
      )}

      <div style={{ height: 6, marginBottom: 32 }} className="stripes-thin" />

      <MarkdownView body={doc.body} />

      {(prevSlug || nextSlug) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginTop: 56,
            paddingTop: 28,
            borderTop: '1px dashed var(--rule-dashed)',
          }}
        >
          {prevSlug ? (
            <Link to={`/lore/${category}/${prevSlug}`} className="tile" style={{ textAlign: 'left' }}>
              <div className="mono-caption" style={{ marginBottom: 6 }}>← Předchozí</div>
              <div className="tile-title" style={{ fontSize: 18 }}>{prevSlug.replace(/-/g, ' ')}</div>
            </Link>
          ) : (
            <div />
          )}
          {nextSlug ? (
            <Link to={`/lore/${category}/${nextSlug}`} className="tile" style={{ textAlign: 'right' }}>
              <div className="mono-caption" style={{ marginBottom: 6 }}>Další →</div>
              <div className="tile-title" style={{ fontSize: 18 }}>{nextSlug.replace(/-/g, ' ')}</div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </main>
  );
}
