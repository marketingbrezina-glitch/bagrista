import { Link, useParams } from 'react-router-dom';
import { docTitle, num, optStr, str, tons } from './frontmatter';
import { findHub, getIntro, listByCategory, type LoreCategory, type LoreDoc } from './loreContent';
import { MarkdownView } from './MarkdownView';

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

const SECTION_RUBRICS: Record<LoreCategory, string> = {
  levels: 'Lore · Bridge',
  phases: 'Lore · Kánon',
  sects: 'Lore · Hereze',
  brands: 'Lore · Hereze',
  holidays: 'Lore · Kalendář',
  rituals: 'Lore · Praxe',
  concepts: 'Lore · Jazyk',
  scriptures: 'Lore · Kánon',
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

function Breadcrumb({ current }: { current: string }) {
  return (
    <div className="crumb lab">
      <Link to="/">Domů</Link>
      <span>›</span>
      <Link to="/lore">Lore</Link>
      <span>›</span>
      <span style={{ color: 'var(--ink)' }}>{current}</span>
    </div>
  );
}

/** Schody víry — signature zobrazení osmi stupňů. */
function Staircase({ items }: { items: LoreDoc[] }) {
  const steps = items.filter((doc) => num(doc, 'id') !== 8);
  const traitor = items.find((doc) => num(doc, 'id') === 8);

  return (
    <section className="sec">
      <div className="lab" style={{ marginBottom: 12 }}>
        Začátek · Nováček · 1,5 t
      </div>

      <div className="steps" style={{ gap: 10 }}>
        {steps.map((doc) => (
          <Link
            key={doc.slug}
            to={`/lore/levels/${doc.slug}`}
            className="step big click"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <b>{String(num(doc, 'id') ?? 0).padStart(2, '0')}</b>
            <div>
              <div className="t">{docTitle(doc)}</div>
              <div className="mm">
                {str(doc, 'model')} · {tons(doc)}
              </div>
            </div>
            <p>{str(doc, 'perex')}</p>
            <span className="more">Číst dále →</span>
          </Link>
        ))}
      </div>

      <div className="lab" style={{ margin: '12px 0 28px', textAlign: 'right' }}>
        Vrchol · Guru · mlčení
      </div>

      {traitor && (
        <>
          <div className="lab" style={{ color: 'var(--red)', marginBottom: 10 }}>
            Propast · mimo strukturu
          </div>
          <Link
            to={`/lore/levels/${traitor.slug}`}
            className="step big z click"
            style={{ marginTop: 0, textDecoration: 'none' }}
          >
            <b>08</b>
            <div>
              <div className="t">{docTitle(traitor)}</div>
              <div className="mm" style={{ color: 'var(--red)' }}>
                {str(traitor, 'model')} · exkomunikován
              </div>
            </div>
            <p style={{ color: 'var(--ink-2)' }}>{str(traitor, 'perex')}</p>
            <span className="more" style={{ borderColor: 'var(--red)' }}>
              Číst dále →
            </span>
          </Link>
        </>
      )}
    </section>
  );
}

function CardGrid({ items, category }: { items: LoreDoc[]; category: LoreCategory }) {
  return (
    <section className="sec three" style={{ borderBottom: 0, paddingTop: 32 }}>
      {items.map((doc) => {
        const id = num(doc, 'id');
        const model = optStr(doc, 'model');
        const rubric =
          id !== undefined ? String(id).padStart(2, '0') : (model ?? SECTION_TITLES[category]);
        const motto = optStr(doc, 'motto');

        return (
          <Link
            key={doc.slug}
            to={`/lore/${category}/${doc.slug}`}
            className="card tile click"
            style={{ textDecoration: 'none' }}
          >
            <div className="sh">
              <span>{rubric}</span>
              {model && id !== undefined && <span>{model}</span>}
            </div>
            <h3 className="st">{docTitle(doc)}</h3>
            {motto && (
              <p className="sm" style={{ fontStyle: 'italic', marginBottom: 8 }}>
                „{motto}"
              </p>
            )}
            <p className="sm">{str(doc, 'perex')}</p>
            <span className="more">Číst dále →</span>
          </Link>
        );
      })}
    </section>
  );
}

export function LoreSectionPage() {
  const { category } = useParams<{ category: string }>();

  if (!category) {
    return (
      <main>
        <Breadcrumb current="Nenalezeno" />
        <section className="head solo">
          <h1>Sekce nenalezena</h1>
        </section>
      </main>
    );
  }

  // Hub stránky (Slovník, Modlitebník, Mučedníci, …) jsou jeden dlouhý dokument.
  if (!isLoreCategory(category)) {
    const hub = findHub(category);
    if (!hub) {
      return (
        <main>
          <Breadcrumb current="Nenalezeno" />
          <section className="head solo">
            <div>
              <div className="by lab">
                <span>Chybějící kapitola</span>
              </div>
              <h1>Kapitola se zapisuje</h1>
              <p className="dk">Stránka „{category}" v Loru zatím není.</p>
            </div>
          </section>
        </main>
      );
    }

    const hubTitle = docTitle(hub);
    return (
      <main>
        <Breadcrumb current={hubTitle} />
        <section className="head solo">
          <div>
            <div className="by lab">
              <span>Lore · Sborník</span>
            </div>
            <h1>{hubTitle}</h1>
            {optStr(hub, 'perex') && <p className="dk">{str(hub, 'perex')}</p>}
          </div>
        </section>
        <section className="sec" style={{ borderBottom: 0 }}>
          <MarkdownView body={hub.body} />
        </section>
      </main>
    );
  }

  const items = listByCategory(category);
  const intro = getIntro(category);
  const title = SECTION_TITLES[category];

  return (
    <main>
      <Breadcrumb current={title} />
      <section className="head solo">
        <div>
          <div className="by lab">
            <span>{SECTION_RUBRICS[category]}</span>
            <span>{items.length} položek</span>
          </div>
          <h1>{title}</h1>
        </div>
      </section>

      {intro && (
        <section className="sec">
          <div className="body">
            <MarkdownView body={intro.body} />
          </div>
        </section>
      )}

      {category === 'levels' ? (
        <Staircase items={items} />
      ) : (
        <CardGrid items={items} category={category} />
      )}

      {category === 'levels' && (
        <section className="sec" style={{ borderBottom: 0 }}>
          <div
            className="card"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <div className="lab" style={{ marginBottom: 6 }}>
                Nevíš, kde stojíš?
              </div>
              <h3 style={{ fontSize: 28 }}>Spusť kvíz a hydraulika tě zařadí.</h3>
            </div>
            <Link to="/kviz" className="btn">
              Zjisti svůj stupeň
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
