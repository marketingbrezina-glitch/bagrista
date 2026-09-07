import { Link, useParams } from 'react-router-dom';
import { docTitle, num, optStr, str, tons } from './frontmatter';
import { findDoc, getOutro, type LoreCategory, type LoreDoc } from './loreContent';
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
  levels: 'Schody víry',
  phases: 'Cyklus bagrování',
  sects: 'Kacířské sekty',
  brands: 'Značky',
  holidays: 'Svátky',
  rituals: 'Rituály',
  concepts: 'Pojmy',
  scriptures: 'Svatá písma',
  hub: 'Lore',
};

const RUBRICS: Record<LoreCategory, string> = {
  levels: 'Stupeň víry',
  phases: 'Fáze cyklu',
  sects: 'Hereze',
  brands: 'Značka',
  holidays: 'Svátek',
  rituals: 'Rituál',
  concepts: 'Pojem',
  scriptures: 'Svaté písmo',
  hub: 'Lore',
};

const FREKVENCE_LABELS: Record<string, string> = {
  denni: 'Denní',
  tydenni: 'Týdenní',
  mesicni: 'Měsíční',
  sezonni: 'Sezónní',
  inicacni: 'Iniciační',
};

/** Popisky do karty dokumentu — jen ta pole, která daná kategorie skutečně nese. */
function metaPairs(doc: LoreDoc): [string, string][] {
  const pairs: [string, string][] = [];
  const push = (label: string, value: string | number | undefined) => {
    if (value !== undefined && value !== '') pairs.push([label, String(value)]);
  };

  push('Model', optStr(doc, 'model'));
  push('Hmotnost', tons(doc));
  push('Stav', optStr(doc, 'stav')?.split('.')[0]?.trim());
  push('Původ', optStr(doc, 'puvod'));
  push('Země', optStr(doc, 'zeme'));
  push('Založeno', num(doc, 'zalozeno'));
  push('Barva', optStr(doc, 'barva') ?? optStr(doc, 'barva_logo'));
  push('Nebezpečnost', num(doc, 'nebezpecnost') && `${num(doc, 'nebezpecnost')} / 5`);
  push('Kdy', optStr(doc, 'kdy'));
  push('Typ', optStr(doc, 'typ') ?? optStr(doc, 'typ_pojmu'));
  const frekvence = optStr(doc, 'frekvence');
  push('Frekvence', frekvence ? (FREKVENCE_LABELS[frekvence] ?? frekvence) : undefined);
  push('Trvání', num(doc, 'delka_min') && `${num(doc, 'delka_min')} min`);
  push('Posvátnost', num(doc, 'posvatnost') && `${num(doc, 'posvatnost')} / 5`);
  push('Hláška', optStr(doc, 'cislo_fraze'));

  return pairs;
}

function NeighbourCard({
  category,
  slug,
  direction,
}: {
  category: LoreCategory;
  slug: string;
  direction: 'prev' | 'next';
}) {
  const doc = findDoc(category, slug);
  const isNext = direction === 'next';

  return (
    <Link
      to={`/lore/${category}/${slug}`}
      className="card click"
      style={{ textDecoration: 'none', textAlign: isNext ? 'right' : 'left' }}
    >
      <div className="lab">{isNext ? 'Další →' : '← Předchozí'}</div>
      <div style={{ fontFamily: 'var(--np)', fontWeight: 700, fontSize: 24, marginTop: 6 }}>
        {doc ? docTitle(doc) : slug.replace(/-/g, ' ')}
      </div>
      {doc && optStr(doc, 'model') && (
        <div className="lab" style={{ marginTop: 4, textTransform: 'none', letterSpacing: 0 }}>
          {str(doc, 'model')}
        </div>
      )}
    </Link>
  );
}

export function LoreDocPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();

  if (!category || !slug || !isLoreCategory(category)) {
    return (
      <main>
        <div className="crumb lab">
          <Link to="/lore">← Lore</Link>
        </div>
        <section className="head solo">
          <h1>Stránka nenalezena</h1>
        </section>
      </main>
    );
  }

  const doc = findDoc(category, slug);
  if (!doc) {
    return (
      <main>
        <div className="crumb lab">
          <Link to={`/lore/${category}`}>← {SECTION_TITLES[category]}</Link>
        </div>
        <section className="head solo">
          <div>
            <div className="by lab">
              <span>Chybějící kapitola</span>
            </div>
            <h1>Kapitola se zapisuje</h1>
            <p className="dk">Tahle stránka v Loru zatím není.</p>
          </div>
        </section>
      </main>
    );
  }

  const title = docTitle(doc);
  const id = num(doc, 'id');
  const total = category === 'phases' ? 7 : 8;
  const perex = optStr(doc, 'perex');
  const motto = optStr(doc, 'motto');
  const stav = optStr(doc, 'stav');
  // `stav` u stupňů je celá věta („Pravý bagrista. Tohle je první stupeň…").
  // Do štítku patří jen první část, jinak nowrap rozhodí řádek.
  const stavTag = stav?.split('.')[0]?.trim();
  const posvatne = doc.data.posvatne === true;
  const prevSlug = optStr(doc, 'predchozi');
  const nextSlug = optStr(doc, 'dalsi');
  const pairs = metaPairs(doc);
  const outro = getOutro(category);

  const rubric =
    id !== undefined ? `${RUBRICS[category]} · ${String(id).padStart(2, '0')}` : RUBRICS[category];

  return (
    <main>
      <div className="crumb lab">
        <Link to="/">Domů</Link>
        <span>›</span>
        <Link to="/lore">Lore</Link>
        <span>›</span>
        <Link to={`/lore/${category}`}>{SECTION_TITLES[category]}</Link>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>{title}</span>
        {id !== undefined && (
          <span style={{ marginLeft: 'auto' }}>
            {String(id).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        )}
      </div>

      <section className={pairs.length > 0 ? 'head' : 'head solo'}>
        <div>
          <div className="by lab">
            <span>{rubric}</span>
            {optStr(doc, 'model') && <span>{str(doc, 'model')}</span>}
          </div>
          <h1>{title}</h1>
          {(perex ?? motto) && <p className="dk">„{perex ?? motto}"</p>}
          {(stavTag ?? posvatne) && (
            <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
              {posvatne && <span className="tag y">Kanonický</span>}
              {stavTag && <span className="tag">{stavTag}</span>}
            </div>
          )}
        </div>

        {pairs.length > 0 && (
          <aside className="card">
            <div className="sh">
              <span>Karta</span>
              {id !== undefined && (
                <span>
                  {String(id).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              )}
            </div>
            {id !== undefined && (
              <div
                style={{
                  fontFamily: 'var(--np)',
                  fontWeight: 900,
                  fontSize: 64,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                {String(id).padStart(2, '0')}
              </div>
            )}
            <dl className="kv">
              {pairs.map(([label, value]) => (
                <div key={label} style={{ display: 'contents' }}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </section>

      <section className="sec">
        <div className="sh top" style={{ maxWidth: 760 }}>
          <span>{SECTION_TITLES[category]}</span>
          <span>{title}</span>
        </div>
        <MarkdownView body={doc.body} />

        {outro && (
          <div className="note">
            <div className="lab">{str(outro, 'nazev', 'Závěrečné požehnání')}</div>
            <div className="lore-prose" style={{ marginTop: 8 }}>
              <MarkdownView body={outro.body} />
            </div>
          </div>
        )}
      </section>

      {(prevSlug ?? nextSlug) && (
        <section
          className="sec"
          style={{
            borderBottom: 0,
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
            gap: 16,
            alignItems: 'center',
          }}
        >
          {prevSlug ? (
            <NeighbourCard category={category} slug={prevSlug} direction="prev" />
          ) : (
            <div />
          )}
          <Link to={`/lore/${category}`} className="btn o">
            {SECTION_TITLES[category]}
          </Link>
          {nextSlug ? (
            <NeighbourCard category={category} slug={nextSlug} direction="next" />
          ) : (
            <div />
          )}
        </section>
      )}
    </main>
  );
}
