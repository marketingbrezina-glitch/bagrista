type FrontmatterValue = string | number | boolean;

export type LoreDoc = {
  filePath: string;
  category: LoreCategory;
  slug: string;
  data: Record<string, FrontmatterValue>;
  body: string;
};

export type LoreCategory =
  | 'levels'
  | 'phases'
  | 'sects'
  | 'brands'
  | 'holidays'
  | 'rituals'
  | 'concepts'
  | 'scriptures'
  | 'hub';

const RAW_FILES = import.meta.glob('../../../content/lore/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseFrontmatter(raw: string): {
  data: Record<string, FrontmatterValue>;
  body: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match || match[1] === undefined || match[2] === undefined) {
    return { data: {}, body: raw };
  }
  const yamlBlock = match[1];
  const body = match[2];
  const data: Record<string, FrontmatterValue> = {};
  for (const line of yamlBlock.split('\n')) {
    const trimmed = line.replace(/\s+$/, '');
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(trimmed);
    if (!m || m[1] === undefined || m[2] === undefined) continue;
    const key = m[1];
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value === 'true') {
      data[key] = true;
      continue;
    }
    if (value === 'false') {
      data[key] = false;
      continue;
    }
    if (value !== '' && !Number.isNaN(Number(value))) {
      data[key] = Number(value);
      continue;
    }
    data[key] = value;
  }
  return { data, body };
}

function categoryFromPath(filePath: string): LoreCategory {
  const m = /\/content\/lore\/([^/]+)\//.exec(filePath);
  if (!m || !m[1]) return 'hub';
  const dir = m[1];
  switch (dir) {
    case 'levels':
    case 'phases':
    case 'sects':
    case 'brands':
    case 'holidays':
    case 'rituals':
    case 'concepts':
    case 'scriptures':
      return dir;
    default:
      return 'hub';
  }
}

function slugFromFile(filePath: string, frontmatterSlug: FrontmatterValue | undefined): string {
  if (typeof frontmatterSlug === 'string' && frontmatterSlug.length > 0) {
    return frontmatterSlug;
  }
  const filename = filePath.split('/').pop() ?? '';
  return filename.replace(/\.md$/, '');
}

function isInternalFile(filePath: string): boolean {
  const filename = filePath.split('/').pop() ?? '';
  return filename.startsWith('_');
}

const ALL_DOCS: LoreDoc[] = Object.entries(RAW_FILES)
  .filter(([path]) => !isInternalFile(path))
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      filePath: path,
      category: categoryFromPath(path),
      slug: slugFromFile(path, data.slug),
      data,
      body,
    };
  });

const INTERNAL_DOCS: LoreDoc[] = Object.entries(RAW_FILES)
  .filter(([path]) => isInternalFile(path))
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      filePath: path,
      category: categoryFromPath(path),
      slug: slugFromFile(path, data.slug),
      data,
      body,
    };
  });

type LinkTarget = { path: string; label: string };

const SLUG_INDEX: Map<string, LinkTarget> = (() => {
  const index = new Map<string, LinkTarget>();
  const register = (key: string, target: LinkTarget) => {
    if (!key) return;
    if (!index.has(key)) index.set(key, target);
    const lower = key.toLowerCase();
    if (lower !== key && !index.has(lower)) index.set(lower, target);
  };

  for (const doc of ALL_DOCS) {
    const path = doc.category === 'hub' ? `/lore/${doc.slug}` : `/lore/${doc.category}/${doc.slug}`;
    const nazev = typeof doc.data.nazev === 'string' ? doc.data.nazev : doc.slug;
    const target: LinkTarget = { path, label: nazev };
    register(nazev, target);
    register(doc.slug, target);

    if (doc.category === 'levels' && typeof doc.data.id === 'number') {
      const model = typeof doc.data.model === 'string' ? doc.data.model : '';
      register(`Stupeň ${doc.data.id} — ${model} · ${nazev}`, target);
      register(`Stupeň ${doc.data.id}`, target);
    }
    if (doc.category === 'phases' && typeof doc.data.id === 'number') {
      register(`Fáze ${doc.data.id} — ${nazev}`, target);
      register(`Fáze ${doc.data.id}`, target);
    }
  }

  for (const doc of INTERNAL_DOCS) {
    if (doc.slug !== '_intro') continue;
    if (doc.category === 'hub') continue;
    const path = `/lore/${doc.category}`;
    const nazev = typeof doc.data.nazev === 'string' ? doc.data.nazev : doc.category;
    register(nazev, { path, label: nazev });
  }
  return index;
})();

function lookupTarget(key: string): LinkTarget | undefined {
  return SLUG_INDEX.get(key) ?? SLUG_INDEX.get(key.toLowerCase());
}

export function processWikiLinks(body: string): string {
  return body.replace(/\[\[([^\]]+)\]\]/g, (_match, raw: string) => {
    const pipe = raw.indexOf('|');
    const targetRaw = pipe >= 0 ? raw.slice(0, pipe) : raw;
    const aliasRaw = pipe >= 0 ? raw.slice(pipe + 1) : null;
    const hash = targetRaw.indexOf('#');
    const base = hash >= 0 ? targetRaw.slice(0, hash) : targetRaw;
    const anchor = hash >= 0 ? targetRaw.slice(hash + 1) : null;

    const target = lookupTarget(base.trim());
    const display = (aliasRaw ?? target?.label ?? base).trim();
    const escapedDisplay = display.replace(/([\[\]\\])/g, '\\$1');

    if (!target) {
      return `**${escapedDisplay}**`;
    }
    const url = anchor ? `${target.path}#${anchor}` : target.path;
    return `**[${escapedDisplay}](${url})**`;
  });
}

export function findLevelById(id: number): LoreDoc | undefined {
  return ALL_DOCS.find(
    (d) => d.category === 'levels' && typeof d.data.id === 'number' && d.data.id === id,
  );
}

export function listByCategory(category: LoreCategory): LoreDoc[] {
  const docs = ALL_DOCS.filter(
    (d) => d.category === category && d.data.skryto_v_seznamu !== true,
  );
  if (category === 'levels' || category === 'phases') {
    return [...docs].sort((a, b) => {
      const ai = typeof a.data.id === 'number' ? a.data.id : 0;
      const bi = typeof b.data.id === 'number' ? b.data.id : 0;
      return ai - bi;
    });
  }
  return [...docs].sort((a, b) => {
    const an = typeof a.data.nazev === 'string' ? a.data.nazev : a.slug;
    const bn = typeof b.data.nazev === 'string' ? b.data.nazev : b.slug;
    return an.localeCompare(bn, 'cs');
  });
}

export function findDoc(category: LoreCategory, slug: string): LoreDoc | undefined {
  return ALL_DOCS.find((d) => d.category === category && d.slug === slug);
}

export function findHub(slug: string): LoreDoc | undefined {
  return ALL_DOCS.find((d) => d.category === 'hub' && d.slug === slug);
}

export function getIntro(category: LoreCategory): LoreDoc | undefined {
  return INTERNAL_DOCS.find(
    (d) => d.category === category && d.slug === '_intro',
  );
}

export function allHubs(): LoreDoc[] {
  return ALL_DOCS.filter((d) => d.category === 'hub');
}
