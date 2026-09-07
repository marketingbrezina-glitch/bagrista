export type MdSection = {
  /** Kotva pro odkaz z rejstříku — `/lore/slovnik#zlut`. */
  id: string;
  title: string;
  body: string;
  /** Poslední `#` nadpis nad sekcí — Dějiny mají uprostřed „Velká válka s Komatsu". */
  part?: string;
};

export type SplitDoc = {
  /** Text před prvním `##` nadpisem. */
  intro: string;
  sections: MdSection[];
};

const DIACRITICS = /[̀-ͯ]/g;

/**
 * Nadpis ze zdroje může nést inline markdown — `## Lidová rčení s [[Komatsu]]`.
 * Do rejstříku i do `<h2>` patří holý text, ne syntaxe.
 */
export function stripInline(text: string): string {
  return text
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .trim();
}

/** „Lidová rčení s „Komatsu"" → „lidova-rceni-s-komatsu" */
export function slugify(title: string): string {
  return title
    .normalize('NFD')
    .replace(DIACRITICS, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Rozseká hub dokument na sekce podle `##` nadpisů.
 * Řádky uvnitř fenced bloků se ignorují, ať se nerozbije ukázka kódu.
 */
function splitOnLevel(markdown: string, level: 2 | 3): SplitDoc {
  const marker = new RegExp(`^#{${level}}\\s+(.*\\S)\\s*$`);
  const partMarker = /^#\s+(.*\S)\s*$/;

  const lines = markdown.split('\n');
  const intro: string[] = [];
  const sections: MdSection[] = [];

  let current: { title: string; body: string[]; part?: string } | null = null;
  let part: string | undefined;
  let inFence = false;

  const flush = () => {
    if (!current) return;
    sections.push({
      id: slugify(current.title),
      title: current.title,
      body: current.body.join('\n').trim(),
      ...(current.part ? { part: current.part } : {}),
    });
    current = null;
  };

  for (const line of lines) {
    if (/^\s*```/.test(line)) inFence = !inFence;

    if (!inFence && level === 2) {
      const partHit = partMarker.exec(line);
      if (partHit?.[1]) {
        flush();
        part = stripInline(partHit[1]);
        continue;
      }
    }

    const heading = inFence ? null : marker.exec(line);
    if (heading?.[1]) {
      flush();
      current = { title: stripInline(heading[1]), body: [], ...(part ? { part } : {}) };
      continue;
    }

    if (current) current.body.push(line);
    else intro.push(line);
  }

  flush();
  return { intro: intro.join('\n').trim(), sections };
}

/** Rozseká dokument na sekce podle `##`; `#` nadpisy značkují části. */
export function splitSections(markdown: string): SplitDoc {
  return splitOnLevel(markdown, 2);
}

/** Rozseká sekci na podsekce podle `###` — jednotliví mučedníci, knihy Pentateuchu. */
export function splitSubsections(markdown: string): SplitDoc {
  return splitOnLevel(markdown, 3);
}
