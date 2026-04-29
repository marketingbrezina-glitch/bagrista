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
