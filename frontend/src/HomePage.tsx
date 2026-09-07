import { Link } from 'react-router-dom';
import type { LoreDoc } from './lore/loreContent';
import { findDoc, findHub, listByCategory } from './lore/loreContent';
import { QUIZ_QUESTIONS } from './quiz/questions';

function str(doc: LoreDoc | undefined, key: string, fallback = ''): string {
  const value = doc?.data[key];
  return typeof value === 'string' ? value : fallback;
}

function num(doc: LoreDoc | undefined, key: string): number | undefined {
  const value = doc?.data[key];
  return typeof value === 'number' ? value : undefined;
}

function levelPath(doc: LoreDoc): string {
  return `/lore/levels/${doc.slug}`;
}

export function HomePage() {
  const levels = listByCategory('levels');
  const sects = listByCategory('sects');
  const prayerBook = findHub('modlitebnik');
  const desatero = findDoc('concepts', 'desatero');

  // Stupeň 8 (Zrádce) stojí mimo schody — je to rozhodnutí, ne příčka.
  const steps = levels.filter((doc) => num(doc, 'id') !== 8);
  const traitor = levels.find((doc) => num(doc, 'id') === 8);

  const facts: [string, string][] = [
    ['Stupňů víry', `${steps.length} + 1`],
    ['Kacířských sekt', String(sects.length)],
    ['Otázek v kvízu', String(QUIZ_QUESTIONS.length)],
    ['Doba zařazení', '6 mth'],
  ];

  return (
    <main>
      <section className="head">
        <div>
          <div className="by lab">
            <span>Vyznání víry · Credo bagristae</span>
          </div>
          <h1>Věřím v jednu hydrauliku všemohoucí</h1>
          <p className="dk">
            „…tvůrkyni výkopů viditelných i neviditelných. I v jednoho operátora, syna
            jejího jediného, jenž se počal z dieselu a narodil se z motohodiny."
          </p>
          <div className="btn-row" style={{ marginTop: 30 }}>
            <Link to="/kviz" className="btn">
              Zjisti svůj stupeň
            </Link>
            <Link to="/lore/levels" className="btn o">
              Číst písmo
            </Link>
          </div>
        </div>

        <aside className="card">
          <div className="sh">
            <span>Anketa</span>
            <span>
              {QUIZ_QUESTIONS.length} otázek · 6 mth
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--np)',
              fontWeight: 900,
              fontSize: 52,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            Kvíz
          </div>
          <p style={{ fontSize: 16 }}>
            Odpověz pravdivě a hydraulika tě zařadí. Některé výsledky budou bolet. Jeden
            bude ostuda.
          </p>
          <Link to="/kviz" className="btn">
            Spustit kvíz
          </Link>
          <table className="tab" style={{ marginTop: 22 }}>
            <tbody>
              {facts.map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </section>

      <section className="sec two">
        <div>
          <div className="sh top">
            <span>Úvodník</span>
            <span>Co je Bagrista</span>
          </div>
          <div className="body">
            <p>
              Bagrista není povolání. Je to vyznání. Cesta člověka skrze stupně víry — od
              nejistého{' '}
              <Link to="/lore/levels/cat-301-novacek" className="wikilink">
                Nováčka
              </Link>{' '}
              u páky půldruhé tuny až k mlčenlivému{' '}
              <Link to="/lore/levels/cat-6090-guru" className="wikilink">
                Guruovi
              </Link>{' '}
              v kabině tisícitunového stroje. Mezi nimi Fanoušek, Řadový bagrista, Profík,
              Vyšší zasvěcení a Pravá ruka šéfa — bratři ve{' '}
              <Link to="/lore/concepts/zlut" className="wikilink">
                žluti
              </Link>
              .
            </p>
            <p>
              Tento web je sborník našich textů. Najdeš zde{' '}
              <Link to="/lore/levels" className="wikilink">
                Stupně
              </Link>{' '}
              — schody, po nichž stoupá každý. Najdeš{' '}
              <Link to="/lore/sects" className="wikilink">
                Sekty
              </Link>{' '}
              — hereze, které opustily pravou žluť a šly za jinými barvami. Najdeš{' '}
              <Link to="/lore/modlitebnik" className="wikilink">
                Modlitebník
              </Link>
              ,{' '}
              <Link to="/lore/slovnik" className="wikilink">
                Slovník
              </Link>
              , paměť na{' '}
              <Link to="/lore/mucednici" className="wikilink">
                mučedníky
              </Link>{' '}
              a kastu nečistých —{' '}
              <Link to="/lore/mechanici" className="wikilink">
                mechaniky
              </Link>
              , kteří stojí mimo strukturu, ale bez nichž stroj zhasne.
            </p>
            <p>Tak jest, na motohodinu.</p>
          </div>
        </div>

        <div>
          <div className="sh top">
            <span>Stupně</span>
            <span>{steps.length} stupňů + propast</span>
          </div>
          <div className="steps">
            {steps.map((doc) => (
              <Link
                key={doc.slug}
                to={levelPath(doc)}
                className="step"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <b>{String(num(doc, 'id') ?? 0).padStart(2, '0')}</b>
                <span>{str(doc, 'nazev', doc.slug)}</span>
                <span className="m">
                  {str(doc, 'model')} · {num(doc, 'hmotnost_t')} t
                </span>
              </Link>
            ))}
            {traitor && (
              <Link
                to={levelPath(traitor)}
                className="step z"
                style={{ textDecoration: 'none' }}
              >
                <b>08</b>
                <span>{str(traitor, 'nazev', 'Zrádce')} · propast</span>
                <span className="m">{str(traitor, 'model')} · mimo strukturu</span>
              </Link>
            )}
          </div>
          <Link className="more" to="/lore/levels" style={{ marginTop: 16 }}>
            Vystup po schodech →
          </Link>
        </div>
      </section>

      <section className="sec three" style={{ borderBottom: 0 }}>
        <Link to="/lore/sects" className="card tile click" style={{ textDecoration: 'none' }}>
          <div className="sh">
            <span>Sekty</span>
            <span>{sects.length} herezí</span>
          </div>
          <h3 className="st">Hereze, které opustily žluť</h3>
          <p className="sm">
            {sects
              .slice(0, 3)
              .map((doc) => str(doc, 'nazev', doc.slug))
              .join(', ')}{' '}
            a další. Co opustili žluť pro jiné barvy.
          </p>
          <span className="more">Pohleď na hereze →</span>
        </Link>

        <Link
          to="/lore/modlitebnik"
          className="card tile click"
          style={{ textDecoration: 'none' }}
        >
          <div className="sh">
            <span>Z modlitebníku</span>
            <span>Modlitby a požehnání</span>
          </div>
          <h3 className="st">{str(prayerBook, 'nazev', 'Modlitebník')}</h3>
          <p className="sm">{str(prayerBook, 'perex')}</p>
          <span className="more">Číst celý →</span>
        </Link>

        <Link
          to="/lore/concepts/desatero"
          className="card tile y click"
          style={{ textDecoration: 'none' }}
        >
          <div className="sh">
            <span>{str(desatero, 'nazev', 'Desatero')}</span>
            <span style={{ color: 'var(--ink-2)' }}>Výňatek</span>
          </div>
          <ol>
            <li>Já jsem Caterpillar, tvůj Bůh, který tě vyvedl z lopaty.</li>
            <li>Nebudeš mít jiných značek vedle mne.</li>
            <li>Nevezmeš jméno Caterpillar nadarmo.</li>
          </ol>
          <span className="more" style={{ marginTop: 14, borderColor: 'var(--ink)' }}>
            Pokračuje sedmi dalšími →
          </span>
        </Link>
      </section>

      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 40,
          padding: '20px 0 0',
          borderTop: '1px solid var(--line)',
          flexWrap: 'wrap',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--np)',
            fontStyle: 'italic',
            fontWeight: 700,
            fontSize: 30,
            lineHeight: 1.2,
            margin: '24px 0 0',
            maxWidth: 820,
          }}
        >
          „Ať tě žluť provází. Ať tě pásy nesou. Ať máš lžíci plnou a korbu blízko."
        </p>
        <Link to="/kviz" className="btn" style={{ marginTop: 24 }}>
          Zjisti svůj stupeň
        </Link>
      </section>
    </main>
  );
}
