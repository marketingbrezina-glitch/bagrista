/**
 * Zápis do knihy — příjem kontaktu z `/bratrstvo` a předání do SmartEmailingu.
 *
 * Proč vůbec serverová funkce, když je web jinak statický:
 * SmartEmailing API v3 se autentizuje Basic auth (e-mail + API klíč). Cokoli
 * v prohlížeči si může kdokoli přečíst, takže klíč v bundlu = cizí přístup do
 * rozesílacího účtu. Klíč proto zůstává tady, na serveru, a prohlížeč mluví
 * jen s námi. Viz DECISIONS.md (2026-09-07 — Zápis kontaktů).
 *
 * Nastavení (Vercel → Settings → Environment Variables):
 *   SMARTEMAILING_USERNAME     e-mail účtu
 *   SMARTEMAILING_API_KEY      API klíč (Nastavení účtu → API klíče)
 *   SMARTEMAILING_LIST_ID      číslo kontaktního seznamu
 *   SMARTEMAILING_DOI_EMAIL_ID  volitelné — ID potvrzovacího e-mailu (double opt-in)
 */

export const config = { runtime: 'edge' };

const API = 'https://app.smartemailing.cz/api/v3/import';

type Payload = { email?: unknown; consent?: unknown };

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

/** Záměrně mírná — přísnou validaci dělá až SmartEmailing. */
function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Použij POST.' }, 405);
  }

  const username = process.env.SMARTEMAILING_USERNAME;
  const apiKey = process.env.SMARTEMAILING_API_KEY;
  const listId = Number(process.env.SMARTEMAILING_LIST_ID);
  const doiEmailId = Number(process.env.SMARTEMAILING_DOI_EMAIL_ID);

  if (!username || !apiKey || !Number.isFinite(listId)) {
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

  const body: Record<string, unknown> = {
    settings: {
      update: true,
      skip_invalid_emails: true,
      preserve_unsubscribed: true,
      ...(Number.isFinite(doiEmailId)
        ? { double_opt_in_settings: { campaign: { email_id: doiEmailId } } }
        : {}),
    },
    data: [
      {
        emailaddress: email,
        contactlists: [{ id: listId, status: 'confirmed' }],
      },
    ],
  };

  let upstream: Response;
  try {
    upstream = await fetch(API, {
      method: 'POST',
      headers: {
        authorization: `Basic ${btoa(`${username}:${apiKey}`)}`,
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

  return json({ ok: true, doubleOptIn: Number.isFinite(doiEmailId) }, 200);
}
