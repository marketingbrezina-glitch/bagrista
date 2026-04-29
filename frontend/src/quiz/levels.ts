import type { Axis, LevelId } from './types';

type LevelInfo = {
  name: string;
  description: string;
};

export const LEVEL_INFO: Record<LevelId, LevelInfo> = {
  1: {
    name: 'CAT 301.5 — Nováček',
    description:
      'Stroj sotva přesahující osobní auto. Ještě neví, že odpověď není informace, ale příležitost — a tak na otázku odpovídá.',
  },
  2: {
    name: 'CAT 305 CR — Fanoušek',
    description:
      'Nosí trička s logem, komentuje videa, sleduje katalogy. První pokus o bagrování dopadne tak, že kolega odejde uprostřed věty.',
  },
  3: {
    name: 'CAT 308 CR — Řadový bagrista',
    description:
      'Konečně skutečný člen Bratrstva. Zvládá většinu fází Cyklu — umí mluvit pět minut a neříct nic konkrétního.',
  },
  4: {
    name: 'CAT 320 — Profík',
    description:
      'Dvacet tun. Situaci ani nezachrání, ani nezhorší. Sbírá historky, výmluvy a víc už od života nečeká.',
  },
  5: {
    name: 'CAT 336 XE — Vyšší zasvěcení',
    description:
      'Třicet šest tun, sofistikovaný humor, graf místo vysvětlení. Když se nikdo nezasměje, posluchači se cítí hloupí — a o to ti šlo.',
  },
  6: {
    name: 'CAT 390F — Pravá ruka šéfa',
    description:
      'Devadesát tun. Mistr Schrödingerova vtipu. Třístranná porada končí bez úkolu a produktivita firmy stoupá o sedmnáct procent.',
  },
  7: {
    name: 'CAT 6090 FS — Guru',
    description:
      'Tisíc tun. Osvícený. Nemusíš nic říkat — ticho je moudrost. Nikdo tě nemůže usvědčit z ničeho, protože jsi nic neřekl.',
  },
  8: {
    name: 'CAT D9 — Zrádce',
    description:
      'Exkomunikován. Viděl jsi vrchol, znáš celou hru, a řekl jsi „ne". Jednoduchá otázka, jednoduchá odpověď — svoboda. A samota.',
  },
};

export const AXIS_LABELS: Record<Axis, string> = {
  mleti: 'Mletí hoven',
  narcis: 'Narcismus',
  komatsu: 'Vztah ke Komatsu',
  rituals: 'Rituály Společenství',
};
