import { Link } from 'react-router-dom';

type Section = { to: string; label: string; hint: string; rubric: string };

const SECTIONS: Section[] = [
  { to: '/lore/levels', label: 'Osm stupňů', hint: 'CAT 301.5 → CAT D9', rubric: 'Bridge' },
  { to: '/lore/phases', label: 'Cyklus bagrování', hint: 'Sedm fází neúspěšného vtipu', rubric: 'Kánon' },
  { to: '/lore/sects', label: 'Kacířské sekty', hint: 'Komatsuáni, Hitachisté, Volvoité…', rubric: 'Hereze' },
  { to: '/lore/slovnik', label: 'Slovník', hint: 'Pozdravy, aklamace, kletby, rčení', rubric: 'Jazyk' },
  { to: '/lore/modlitebnik', label: 'Modlitebník', hint: 'Modlitby, svaté jídlo, požehnání', rubric: 'Liturgie' },
  { to: '/lore/credo', label: 'Credo bagristae', hint: 'Vyznání víry', rubric: 'Liturgie' },
  { to: '/lore/mucednici', label: 'Mučedníci', hint: 'Oběti gravitace, šéfů, motohodin i slov', rubric: 'Paměť' },
  { to: '/lore/mechanici', label: 'Kasta nečistých', hint: 'Mechanici — mimo strukturu osmi stupňů', rubric: 'Paměť' },
  { to: '/lore/dejiny-pravdy', label: 'Dějiny Pravdy', hint: 'Od Stvoření po Apokalypsu', rubric: 'Dějiny' },
  { to: '/lore/holidays', label: 'Svátky', hint: 'ConExpo, Smutný pátek, Dušičky', rubric: 'Kalendář' },
  { to: '/lore/rituals', label: 'Rituály', hint: 'Walk-around, mazání, Naložení Tatry', rubric: 'Praxe' },
  { to: '/lore/scriptures', label: 'Svatá písma', hint: 'Genesis, Pentateuch, Apokryfy, Zjevení', rubric: 'Kánon' },
  { to: '/lore/concepts', label: 'Pojmy', hint: 'Žluť, Hydraulika, Motohodina, Desatero', rubric: 'Jazyk' },
  { to: '/lore/brands', label: 'Značky', hint: 'Caterpillar a jeho stíny', rubric: 'Hereze' },
];

export function LoreHomePage() {
  return (
    <main>
      <section className="head solo">
        <div>
          <div className="by lab">
            <span>Sborník · Bagristé Pravdy</span>
            <span>{SECTIONS.length} sekcí</span>
          </div>
          <h1>Lore</h1>
          <p className="dk">
            Encyklopedie Společenství kopajících. Osm stupňů víry, sedm fází cyklu, sedm
            herezí a paměť na ty, kdo padli — ať už z korby, pod šéfem, nebo za jedinou
            větu v hospodě.
          </p>
        </div>
      </section>

      <section className="sec three" style={{ borderBottom: 0, paddingTop: 32 }}>
        {SECTIONS.map((section) => (
          <Link
            key={section.to}
            to={section.to}
            className="card tile click"
            style={{ textDecoration: 'none' }}
          >
            <div className="sh">
              <span>{section.rubric}</span>
            </div>
            <h3 className="st">{section.label}</h3>
            <p className="sm">{section.hint}</p>
            <span className="more">Otevřít →</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
