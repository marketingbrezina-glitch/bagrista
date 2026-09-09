/**
 * Zápis do knihy — příjem kontaktu z `/bratrstvo`.
 *
 * Dvě nezávislé cesty, obě volitelné, alespoň jedna musí být nastavená:
 *
 *  1. Archiv na GitHubu (soukromé repo) — každý zápis = jeden JSON soubor.
 *     Slouží jako trvalé úložiště, dokud (a i poté co) běží mailový nástroj.
 *  2. SmartEmailing API v3 — přímý import do kontaktního seznamu.
 *
 * Proč vůbec serverová funkce, když je web jinak statický:
 * Oba cíle se autentizují tajným tokenem. Cokoli v prohlížeči si může kdokoli
 * přečíst, takže token v bundlu = cizí přístup. Tokeny proto zůstávají tady,
 * na serveru, a prohlížeč mluví jen s námi. Viz DECISIONS.md
 * (2026-09-07 — Zápis kontaktů, 2026-09-09 — GitHub archiv).
 *
 * Nastavení (Vercel → Settings → Environment Variables):
 *   CONTACTS_GITHUB_REPO        "owner/nazev" soukromého repa, např. "marketingbrezina-glitch/bagrista-kontakty"
 *   CONTACTS_GITHUB_TOKEN       fine-grained PAT s právem Contents: Read and write jen na to repo
 *   SMARTEMAILING_USERNAME      e-mail účtu
 *   SMARTEMAILING_API_KEY       API klíč (Nastavení účtu → API klíče)
 *   SMARTEMAILING_LIST_ID       číslo kontaktního seznamu
 *   SMARTEMAILING_DOI_EMAIL_ID  volitelné — ID potvrzovacího e-mailu (double opt-in)
 */

export const config = { runtime: 'edge' };

const SMARTEMAILING_API = 'https://app.smartemailing.cz/api/v3/import';
const GITHUB_API = 'https://api.github.com';

type Payload = { email?: unknown; consent?: unknown };

type GitHubArchive = { repo: string; token: string };
type SmartEmailing = { username: string; apiKey: string; listId: number; doiEmailId: number };

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/** Záměrně mírná — přísnou validaci dělá až mailový nástroj. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

function readGitHubArchive(): GitHubArchive | null {
  const repo = process.env.CONTACTS_GITHUB_REPO;
  const token = process.env.CONTACTS_GITHUB_TOKEN;
  if (!repo || !token || !/^[\w.-]+\/[\w.-]+$/.test(repo)) return null;
  return { repo, token };
}

function readSmartEmailing(): SmartEmailing | null {
  const username = process.env.SMARTEMAILING_USERNAME;
  const apiKey = process.env.SMARTEMAILING_API_KEY;
  const listId = Number(process.env.SMARTEMAILING_LIST_ID);
  if (!username || !apiKey || !Number.isFinite(listId)) return null;
  return { username, apiKey, listId, doiEmailId: Number(process.env.SMARTEMAILING_DOI_EMAIL_ID) };
}

/** btoa umí jen Latin-1; přes TextEncoder projde i diakritika. */
function base64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

/**
 * Jeden soubor na jeden zápis — dva lidé odesílající ve stejnou chvíli si
 * nepřepíšou soubor (Contents API by při sdíleném souboru vyžadovalo sha
 * a řešení konfliktů). Duplicity se čistí až při exportu.
 */
async function archiveToGitHub(archive: GitHubArchive, email: string): Promise<boolean> {
  const now = new Date();
  const day = now.toISOString().slice(0, 10);
  const stamp = now.toISOString().replace(/[:.]/g, '-');
  const nonce = crypto.randomUUID().slice(0, 8);
  const path = `kontakty/${day}/${stamp}-${nonce}.json`;
  const record = { email, consent: true, at: now.toISOString(), source: 'bratrstvo' };

  try {
    const res = await fetch(`${GITHUB_API}/repos/${archive.repo}/contents/${path}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${archive.token}`,
        accept: 'application/vnd.github+json',
        'x-github-api-version': '2022-11-28',
        'user-agent': 'bagrista-subscribe',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        message: `zapis: ${day}`,
        content: base64Utf8(JSON.stringify(record, null, 2) + '\n'),
      }),
    });
    if (!res.ok) {
      // Odpověď nevracíme ven — může nést detaily o repu.
      console.error('GitHub archiv selhal', res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('GitHub archiv nedostupný', err);
    return false;
  }
}

/** Vrací null při úspěchu, jinak chybovou odpověď pro klienta. */
async function importToSmartEmailing(se: SmartEmailing, email: string): Promise<Response | null> {
  const body: Record<string, unknown> = {
    settings: {
      update: true,
      skip_invalid_emails: true,
      preserve_unsubscribed: true,
      ...(Number.isFinite(se.doiEmailId)
        ? { double_opt_in_settings: { campaign: { email_id: se.doiEmailId } } }
        : {}),
    },
    data: [
      {
        emailaddress: email,
        contactlists: [{ id: se.listId, status: 'confirmed' }],
      },
    ],
  };

  let upstream: Response;
  try {
    upstream = await fetch(SMARTEMAILING_API, {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${se.username}:${se.apiKey}`)}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    return json({ error: 'Rozesílací služba neodpovídá. Zkus to za chvíli.' }, 502);
  }

  if (upstream.status === 429) {
    return json({ error: 'Moc rychle. Zkus to za chvíli.' }, 429);
  }
  if (!upstream.ok) {
    // Odpověď zdroje nevracíme ven — může nést detaily o účtu.
    console.error('SmartEmailing import selhal', upstream.status, await upstream.text());
    return json({ error: 'Zápis se nepovedl. Zkus to prosím znovu.' }, 502);
  }
  return null;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Použij POST.' }, 405);
  }

  const archive = readGitHubArchive();
  const smartEmailing = readSmartEmailing();

  if (!archive && !smartEmailing) {
    // Radši přiznat, že kniha ještě není založená, než kontakt tiše zahodit.
    return json({ error: 'not_configured' }, 503);
  }

  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return json({ error: 'Nečitelný požadavek.' }, 400);
  }

  const email = typeof payload.email === 'string' ? payload.email.trim() : '';
  if (!looksLikeEmail(email)) {
    return json({ error: 'Tohle nevypadá na e-mailovou adresu.' }, 400);
  }
  if (payload.consent !== true) {
    return json({ error: 'Bez souhlasu tě do knihy zapsat nemůžeme.' }, 400);
  }

  const archived = archive ? await archiveToGitHub(archive, email) : false;

  if (smartEmailing) {
    const failure = await importToSmartEmailing(smartEmailing, email);
    // Když je kontakt bezpečně v archivu, výpadek SmartEmailingu uživateli neukazujeme.
    if (failure && !archived) return failure;
    return json({ ok: true, doubleOptIn: Number.isFinite(smartEmailing.doiEmailId) }, 200);
  }

  if (!archived) {
    return json({ error: 'Zápis se nepovedl. Zkus to prosím znovu.' }, 502);
  }
  return json({ ok: true, doubleOptIn: false }, 200);
}
