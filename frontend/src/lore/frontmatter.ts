import type { LoreDoc } from './loreContent';

/** Bezpečné čtení hodnot z YAML hlavičky — frontmatter je netypovaný. */

export function str(doc: LoreDoc | undefined, key: string, fallback = ''): string {
  const value = doc?.data[key];
  return typeof value === 'string' ? value : fallback;
}

export function optStr(doc: LoreDoc | undefined, key: string): string | undefined {
  const value = doc?.data[key];
  return typeof value === 'string' ? value : undefined;
}

export function num(doc: LoreDoc | undefined, key: string): number | undefined {
  const value = doc?.data[key];
  return typeof value === 'number' ? value : undefined;
}

/** Název dokumentu — `nazev` z hlavičky, jinak slug jako záloha. */
export function docTitle(doc: LoreDoc): string {
  return str(doc, 'nazev', doc.slug);
}
