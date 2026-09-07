import { Link, useParams } from 'react-router-dom';
import { docTitle, num, optStr, str, tons } from './frontmatter';
import {
  AsideDocument,
  MartyrRoll,
  PrayerBook,
  Timeline,
  TocLayout,
  type TocEntry,
} from './HubLayouts';
import { findHub, getIntro, listByCategory, type LoreCategory, type LoreDoc } from './loreContent';
import { MarkdownView } from './MarkdownView';
import { slugify, splitSections } from './sections';

const SECTION_TITLES: Record<LoreCategory, string> = {
  levels: 'Schody víry',
  phases: 'Cyklus bagrování',
  sects: 'Kacířské sekty',
  brands: 'Značky',
  holidays: 'Svátky',
  rituals: 'Rituály',
  concepts: 'Slovník pravdy',
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
  concepts: 'Lore · Slovník',
  scriptures: 'Lore · Kánon',
  hub: 'Lore',
};

const SECTION_LEADS: Partial<Record<LoreCategory, string>> = {
  concepts:
    'Pojmy, které je třeba znát, abys mluvil řečí Bratrstva. Doménový kánon — kanonický význam, ne uliční.',
  sects:
    'Sedm větví, které odpadly od Žluti. Některé pošetile, jiné záměrně. Studuj je, abys je poznal, ne aby ses k nim přidal.',
};

const CONCEPT_KINDS: Record<string, string> = {
  dovednost: 'Dovednost',
  symbol: 'Symbol',
  pravidlo: 'Pravidlo',
  jednotka: 'Jednotka času',
  prostor: 'Posvátné místo',
  kosmologie: 'Kosmologická síla',
  koncept: 'Koncept',
};

/** Barvy sekt jsou v hlavičce slovem — pro proužek nad kartou potřebujeme hex. */
const ACCENTS: Record<string, string> = {
  modrá: '#1F4FB8',
  oranžová: '#E8730C',
  šedá: '#6A665D',
  žlutá: '#D9A80C',
  zelená: '#2E7D32',
};

function accentOf(doc: LoreDoc): string | undefined {
  const raw = optStr(doc, 'barva_logo') ?? optStr(doc, 'barva');
  const first = raw?.split(/[\s(]/)[0]?.toLowerCase();
  return first ? ACCENTS[first] : undefined;
}

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
  const isSects = category === 'sects';

  return (
    <section className="sec" style={{ borderBottom: 0, paddingTop: 32 }}>
      <div
        className="three"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}
      >
        {items.map((doc) => {
          const id = num(doc, 'id');
          const model = optStr(doc, 'model');
          const accent = isSects ? accentOf(doc) : undefined;
          const rubric =
            id !== undefined
              ? String(id).padStart(2, '0')
              : isSects
                ? 'Kacířská sekta'
                : (model ?? SECTION_TITLES[category]);
          const motto = optStr(doc, 'motto');

          return (
            <Link
              key={doc.slug}
              to={`/lore/${category}/${doc.slug}`}
              className="card tile click"
              style={{
                textDecoration: 'none',
                ...(accent ? { borderTop: `4px solid ${accent}` } : {}),
              }}
            >
              <div className="sh">
                <span>{rubric}</span>
                {accent ? (
                  <span style={{ color: accent, fontWeight: 600 }}>■</span>
                ) : (
                  model && id !== undefined && <span>{model}</span>
                )}
              </div>
              <h3 className="st">{docTitle(doc)}</h3>
              {motto && (
                <p className="sm" style={{ fontStyle: 'italic', marginBottom: 12 }}>
                  „{motto}"
                </p>
              )}
              <p className="sm">{str(doc, 'perex')}</p>
              <span className="more">Číst dále →</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/** Pojmy jako slovníková hesla s rejstříkem. */
function ConceptGlossary({ items }: { items: LoreDoc[] }) {
  const entries: TocEntry[] = items.map((doc) => {
    const kind = optStr(doc, 'typ_pojmu');
    return {
      id: doc.slug,
      title: docTitle(doc),
      descriptor: kind ? (CONCEPT_KINDS[kind] ?? kind) : undefined,
      content: (
        <>
          <p style={{ fontSize: 18, lineHeight: 1.65, margin: '14px 0 18px' }}>
            {str(doc, 'perex')}
          </p>
          <Link to={`/lore/concepts/${doc.slug}`} className="more">
            Celé heslo →
          </Link>
        </>
      ),
    };
  });

  return <TocLayout entries={entries} />;
}

const HUB_NOUNS: Record<string, string> = {
  modlitebnik: 'oratií',
  mucednici: 'kategorií',
  'dejiny-pravdy': 'epoch',
};

/** Každý hub má v mockupu vlastní tvar — Modlitebník karty, Dějiny osu, … */
function HubBody({ hub }: { hub: LoreDoc }) {
  switch (hub.slug) {
    case 'modlitebnik':
      return <PrayerBook body={hub.body} />;
    case 'mucednici':
      return <MartyrRoll body={hub.body} />;
    case 'dejiny-pravdy':
      return <Timeline body={hub.body} />;
    case 'mechanici':
      return <AsideDocument body={hub.body} />;
    default:
      return <HubDocument doc={hub} />;
  }
}

/** Hub dokument bez vlastního tvaru (Slovník, Credo) — rejstřík plus hesla. */
function HubDocument({ doc }: { doc: LoreDoc }) {
  const { intro, sections } = splitSections(doc.body);

  // Rejstřík dává smysl až od několika hesel — kratší text ať se prostě čte.
  if (sections.length < 4) {
    return (
      <section className="sec" style={{ borderBottom: 0 }}>
        <MarkdownView body={doc.body} />
      </section>
    );
  }

  const entries: TocEntry[] = sections.map((section) => ({
    id: section.id || slugify(section.title),
    title: section.title,
    content: <MarkdownView body={section.body} />,
  }));

  return (
    <>
      {intro && (
        <section className="sec">
          <div className="body">
            <MarkdownView body={intro} />
          </div>
        </section>
      )}
      <TocLayout entries={entries} />
    </>
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
    const count = splitSections(hub.body).sections.length;
    const noun = HUB_NOUNS[hub.slug] ?? 'kapitol';

    return (
      <main>
        <Breadcrumb current={hubTitle} />
        <section className="head solo">
          <div>
            <div className="by lab">
              <span>Lore · {hubTitle}</span>
              {count > 1 && (
                <span>
                  {count} {noun}
                </span>
              )}
            </div>
            <h1>{hubTitle}</h1>
            {optStr(hub, 'perex') && <p className="dk">{str(hub, 'perex')}</p>}
          </div>
        </section>
        <HubBody hub={hub} />
      </main>
    );
  }

  const items = listByCategory(category);
  const intro = getIntro(category);
  const title = SECTION_TITLES[category];
  const lead = SECTION_LEADS[category];

  return (
    <main>
      <Breadcrumb current={title} />
      <section className="head solo">
        <div>
          <div className="by lab">
            <span>{SECTION_RUBRICS[category]}</span>
            <span>
              {items.length} {category === 'concepts' ? 'pojmů' : 'položek'}
            </span>
          </div>
          <h1>{title}</h1>
          {lead && <p className="dk">{lead}</p>}
        </div>
      </section>

      {intro && category !== 'concepts' && (
        <section className="sec">
          <div className="body">
            <MarkdownView body={intro.body} />
          </div>
        </section>
      )}

      {items.length === 0 ? (
        <section className="sec" style={{ borderBottom: 0 }}>
          <div className="note">
            <div className="lab">Sekce bez seznamu</div>
            <p className="q">
              {category === 'brands'
                ? 'Ke značce se nechodí seznamem. Vede k ní jen odkaz z článku o její sektě — tak to má být.'
                : 'Tahle sekce zatím nemá žádné heslo.'}
            </p>
          </div>
          <Link to="/lore/sects" className="btn o" style={{ marginTop: 8 }}>
            {category === 'brands' ? 'Na kacířské sekty' : 'Zpět na Lore'}
          </Link>
        </section>
      ) : category === 'levels' ? (
        <Staircase items={items} />
      ) : category === 'concepts' ? (
        <ConceptGlossary items={items} />
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
