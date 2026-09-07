import { Fragment, type ReactNode } from 'react';
import { MarkdownView } from './MarkdownView';
import { splitSections, splitSubsections, type MdSection } from './sections';

export type TocEntry = {
  id: string;
  title: string;
  /** Popisek vpravo nahoře nad heslem — např. „sakrální barva CAT". */
  descriptor?: string;
  content: ReactNode;
};

/**
 * Rejstřík vlevo, hesla vpravo. Layout Slovníku z design/v3 (pages-b.jsx → GlossaryHub).
 */
export function TocLayout({ entries }: { entries: TocEntry[] }) {
  return (
    <section
      className="sec"
      style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: 64,
        borderBottom: 0,
        alignItems: 'start',
      }}
    >
      <nav style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
        <div className="sh">
          <span>Obsah</span>
          <span>{entries.length}</span>
        </div>
        <div className="toc">
          {entries.map((entry, i) => (
            <a key={entry.id} href={`#${entry.id}`}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              {entry.title}
            </a>
          ))}
        </div>
      </nav>

      <article style={{ maxWidth: 720, minWidth: 0 }}>
        {entries.map((entry, i) => (
          <section
            key={entry.id}
            id={entry.id}
            style={{
              paddingBottom: 36,
              marginBottom: 36,
              borderBottom: '1px solid var(--hair)',
              scrollMarginTop: 24,
            }}
          >
            <div className="sh">
              <span>{String(i + 1).padStart(2, '0')}</span>
              {entry.descriptor && <span>{entry.descriptor}</span>}
            </div>
            <h2 style={{ fontSize: 36 }}>{entry.title}</h2>
            {entry.content}
          </section>
        ))}
      </article>
    </section>
  );
}

/**
 * Štítky jako kotvy nahoře, pod nimi karty modliteb.
 * Layout Modlitebníku z design/v3 (pages-b.jsx → ModlitebnikPage).
 */
export function PrayerBook({ body }: { body: string }) {
  const { intro, sections } = splitSections(body);

  return (
    <section className="sec" style={{ borderBottom: 0 }}>
      {intro && (
        <div className="body" style={{ marginBottom: 32 }}>
          <MarkdownView body={intro} />
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {sections.map((section, i) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="tag"
            style={{ textDecoration: 'none' }}
          >
            {String(i + 1).padStart(2, '0')} · {section.title}
          </a>
        ))}
      </div>

      <div
        className="three"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))' }}
      >
        {sections.map((section, i) => (
          <article
            key={section.id}
            id={section.id}
            className="card prayer-card"
            style={{ padding: '32px 36px', scrollMarginTop: 24 }}
          >
            <div className="sh">
              <span>Oratio {String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 style={{ fontSize: 30, marginBottom: 22 }}>{section.title}</h3>
            <MarkdownView body={section.body} />
            <div
              className="lab"
              style={{
                marginTop: 22,
                paddingTop: 14,
                borderTop: '1px solid var(--hair)',
                color: 'var(--ink)',
              }}
            >
              † Tak jest, na motohodinu.
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/**
 * Listina padlých — kategorie po sobě, v každé číslovaní mučedníci.
 * Layout Mučedníků z design/v3 (pages-c.jsx → MartyrsPage).
 */
export function MartyrRoll({ body }: { body: string }) {
  const { intro, sections } = splitSections(body);
  let running = 0;

  return (
    <>
      {intro && (
        <section className="sec">
          <div className="body">
            <MarkdownView body={intro} />
          </div>
        </section>
      )}

      {sections.map((category) => {
        const people = splitSubsections(category.body);

        return (
          <section key={category.id} className="sec" id={category.id}>
            <div className="sh top">
              <span>{category.title}</span>
              {people.sections.length > 0 && <span>{people.sections.length}</span>}
            </div>

            {people.intro && (
              <div className="body" style={{ marginBottom: 8 }}>
                <MarkdownView body={people.intro} />
              </div>
            )}

            {people.sections.map((person) => {
              running += 1;
              return (
                <article
                  key={person.id}
                  id={person.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '72px 1fr',
                    gap: 28,
                    padding: '28px 0',
                    borderTop: '1px solid var(--hair)',
                    scrollMarginTop: 24,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--np)',
                      fontWeight: 900,
                      fontSize: 40,
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      color: 'var(--red)',
                    }}
                  >
                    {String(running).padStart(2, '0')}
                  </div>
                  <div style={{ maxWidth: 720, minWidth: 0 }}>
                    <h3 style={{ fontSize: 30 }}>{person.title}</h3>
                    <div className="lore-prose" style={{ marginTop: 10 }}>
                      <MarkdownView body={person.body} />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        );
      })}
    </>
  );
}

/** Vytáhne z nadpisu vedoucí číslici nebo římskou číslici: „I. Stvoření" → „I". */
function marker(section: MdSection, index: number): string {
  const hit = /^([IVXLC]+|\d+)[.)]\s/.exec(section.title);
  return hit?.[1] ?? String(index + 1).padStart(2, '0');
}

/** Nadpis bez vedoucí číslice — ta jde do sloupce vlevo. */
function withoutMarker(title: string): string {
  return title.replace(/^([IVXLC]+|\d+)[.)]\s+/, '');
}

/**
 * Časová osa — epochy pod sebou, `#` nadpisy dělí dokument na části.
 * Layout Dějin z design/v3 (pages-c.jsx → HistoryPage).
 */
export function Timeline({ body }: { body: string }) {
  const { intro, sections } = splitSections(body);
  let lastPart: string | undefined;

  return (
    <>
      {intro && (
        <section className="sec">
          <div className="body">
            <MarkdownView body={intro} />
          </div>
        </section>
      )}

      <section className="sec" style={{ borderBottom: 0 }}>
        <ol className="tl">
          {sections.map((section, i) => {
            const partChanged = section.part !== undefined && section.part !== lastPart;
            lastPart = section.part;

            return (
              <Fragment key={section.id}>
                {partChanged && (
                  <li style={{ display: 'block', paddingBottom: 24 }}>
                    <div className="sh top">
                      <span>{section.part}</span>
                    </div>
                  </li>
                )}
                <li id={section.id} style={{ scrollMarginTop: 24 }}>
                  <div className="yr">{marker(section, i)}</div>
                  <div className="dot" />
                  <div style={{ maxWidth: 680, minWidth: 0 }}>
                    <h3 style={{ fontSize: 26 }}>{withoutMarker(section.title)}</h3>
                    <div className="lore-prose" style={{ marginTop: 10 }}>
                      <MarkdownView body={section.body} />
                    </div>
                  </div>
                </li>
              </Fragment>
            );
          })}
        </ol>
      </section>
    </>
  );
}

/**
 * Próza vlevo, lepivý rejstřík vpravo.
 * Layout Mechaniků z design/v3 (pages-c.jsx → MechanicsPage).
 */
export function AsideDocument({ body }: { body: string }) {
  const { intro, sections } = splitSections(body);

  return (
    <section
      className="sec"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 56,
        borderBottom: 0,
        alignItems: 'start',
      }}
    >
      <div style={{ minWidth: 0 }}>
        {intro && (
          <div className="body" style={{ marginBottom: 28 }}>
            <MarkdownView body={intro} />
          </div>
        )}
        {sections.map((section) => (
          <section key={section.id} id={section.id} style={{ scrollMarginTop: 24 }}>
            <div className="sh top">
              <span>{section.title}</span>
            </div>
            <div className="lore-prose" style={{ marginBottom: 36 }}>
              <MarkdownView body={section.body} />
            </div>
          </section>
        ))}
      </div>

      <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
        <div className="sh">
          <span>Kapitoly</span>
          <span>{sections.length}</span>
        </div>
        <div className="toc">
          {sections.map((section, i) => (
            <a key={section.id} href={`#${section.id}`}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              {section.title}
            </a>
          ))}
        </div>
      </aside>
    </section>
  );
}
