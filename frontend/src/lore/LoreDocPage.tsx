import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import { findDoc, type LoreCategory } from './loreContent';
import { MarkdownView } from './MarkdownView';

const pageStyle: CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '48px 24px',
};

const breadcrumbStyle: CSSProperties = {
  fontSize: 13,
  color: '#888',
  marginBottom: 16,
};

const titleStyle: CSSProperties = {
  fontSize: 32,
  margin: 0,
  marginBottom: 4,
  fontWeight: 700,
  letterSpacing: '-0.01em',
};

const subtitleStyle: CSSProperties = {
  fontSize: 17,
  color: '#666',
  margin: 0,
  marginBottom: 24,
};

const metaRow: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 12,
  fontSize: 12,
  color: '#888',
  marginBottom: 32,
  paddingBottom: 16,
  borderBottom: '1px solid #eee',
};

const navRow: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 48,
  paddingTop: 24,
  borderTop: '1px solid #eee',
  fontSize: 14,
  color: '#666',
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
      <main style={pageStyle}>
        <p style={breadcrumbStyle}>
          <Link to="/lore" style={{ color: '#666' }}>
            ← Lore
          </Link>
        </p>
        <p>Stránka nenalezena.</p>
      </main>
    );
  }

  const doc = findDoc(category, slug);
  if (!doc) {
    return (
      <main style={pageStyle}>
        <p style={breadcrumbStyle}>
          <Link to={`/lore/${category}`} style={{ color: '#666' }}>
            ← {SECTION_TITLES[category]}
          </Link>
        </p>
        <p>Tahle stránka v lore zatím není.</p>
      </main>
    );
  }

  const title = typeof doc.data.nazev === 'string' ? doc.data.nazev : doc.slug;
  const model = typeof doc.data.model === 'string' ? doc.data.model : undefined;
  const motto = typeof doc.data.motto === 'string' ? doc.data.motto : undefined;
  const perex = typeof doc.data.perex === 'string' ? doc.data.perex : undefined;

  const metaItems: string[] = [];
  if (typeof doc.data.kdy === 'string') metaItems.push(`Kdy: ${doc.data.kdy}`);
  if (typeof doc.data.frekvence === 'string') metaItems.push(`Frekvence: ${doc.data.frekvence}`);
  if (typeof doc.data.delka_min === 'number') metaItems.push(`${doc.data.delka_min} min`);
  if (typeof doc.data.hmotnost_t === 'number') metaItems.push(`${doc.data.hmotnost_t} t`);
  if (typeof doc.data.zeme === 'string') metaItems.push(doc.data.zeme);
  if (typeof doc.data.zalozeno === 'number') metaItems.push(`Založeno ${doc.data.zalozeno}`);
  if (typeof doc.data.typ_pojmu === 'string') metaItems.push(doc.data.typ_pojmu);
  if (typeof doc.data.cislo_fraze === 'string') metaItems.push(`Fáze ${doc.data.cislo_fraze}`);
  if (typeof doc.data.stav === 'string') metaItems.push(doc.data.stav);

  const prevSlug = typeof doc.data.predchozi === 'string' ? doc.data.predchozi : undefined;
  const nextSlug = typeof doc.data.dalsi === 'string' ? doc.data.dalsi : undefined;

  return (
    <main style={pageStyle}>
      <p style={breadcrumbStyle}>
        <Link to="/lore" style={{ color: '#888' }}>
          Lore
        </Link>
        {' / '}
        <Link to={`/lore/${category}`} style={{ color: '#666' }}>
          {SECTION_TITLES[category]}
        </Link>
      </p>
      <h1 style={titleStyle}>
        {typeof doc.data.id === 'number' && category === 'levels' ? (
          <>Bagrista úrovně {doc.data.id}</>
        ) : (
          title
        )}
      </h1>
      {(model || (typeof doc.data.id === 'number' && category === 'levels')) && (
        <p style={subtitleStyle}>
          {model ?? title}
          {model && typeof doc.data.id === 'number' && ' '}
          {model && typeof doc.data.id === 'number' && (
            <span style={{ color: '#999' }}>{title}</span>
          )}
        </p>
      )}
      {motto && (
        <p style={{ fontStyle: 'italic', color: '#555', marginBottom: 24 }}>„{motto}"</p>
      )}
      {perex && (
        <p style={{ fontSize: 17, color: '#444', lineHeight: 1.5, marginBottom: 24 }}>
          {perex}
        </p>
      )}
      {metaItems.length > 0 && <div style={metaRow}>{metaItems.join(' · ')}</div>}

      <MarkdownView body={doc.body} />

      {(prevSlug || nextSlug) && (
        <div style={navRow}>
          <span>
            {prevSlug && (
              <Link to={`/lore/${category}/${prevSlug}`} style={{ color: '#444' }}>
                ← Předchozí
              </Link>
            )}
          </span>
          <span>
            {nextSlug && (
              <Link to={`/lore/${category}/${nextSlug}`} style={{ color: '#444' }}>
                Další →
              </Link>
            )}
          </span>
        </div>
      )}
    </main>
  );
}
