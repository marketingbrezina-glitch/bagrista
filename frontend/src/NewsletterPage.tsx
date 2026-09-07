import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from './analytics';

type State = 'idle' | 'sending' | 'done' | 'error' | 'not-configured';

const PROMISES: [string, string][] = [
  ['Kadence', 'Nepravidelně. Když je co říct.'],
  ['Obsah', 'Nová hesla z Lore, hospodské moudro, sezónní připomínky.'],
  ['Cena', 'Žádná. Bratrstvo neprodává.'],
  ['Odchod', 'Jedním klikem v každém vydání. Bez výslechu.'],
];

export function NewsletterPage() {
  const [state, setState] = useState<State>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const consent = form.get('consent') === 'on';

    setState('sending');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, consent }),
      });

      if (res.status === 503) {
        setState('not-configured');
        return;
      }

      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const err =
          typeof data === 'object' && data !== null && 'error' in data
            ? String((data as { error: unknown }).error)
            : 'Zápis se nepovedl.';
        setMessage(err);
        setState('error');
        return;
      }

      trackEvent('newsletter_signup');
      setState('done');
    } catch {
      setMessage('Spojení selhalo. Zkus to prosím znovu.');
      setState('error');
    }
  }

  return (
    <main>
      <div className="crumb lab">
        <Link to="/">Domů</Link>
        <span>›</span>
        <span style={{ color: 'var(--ink)' }}>Bratrstvo</span>
      </div>

      <section className="head">
        <div>
          <div className="by lab">
            <span>Bratrstvo · Zápis</span>
            <span>Zdarma · odejít lze kdykoli</span>
          </div>
          <h1>Přidej se k Bratrstvu</h1>
          <p className="dk">
            Největší společenství bagristů ve střední a východní Evropě. Na motohodinu!
          </p>
          <div className="body" style={{ marginTop: 24, maxWidth: 620 }}>
            <p>
              Nikdo tě zkoušet nebude. Zápis do knihy je prostý — jméno schránky a tichý
              souhlas. Žádné vstupné, žádný obřad, žádné otázky na to, co máš pod zadkem.
              Berem i pětky, berem i dvacítky. Berem i toho, kdo ještě neví.
            </p>
            <p>
              Věstník ti pak nosí, co se v Bratrstvu šustne: nová hesla z{' '}
              <Link to="/lore" className="wikilink">
                Lore
              </Link>
              , hospodské moudro, poznámky z lomu a připomínku, než přijdou{' '}
              <Link to="/lore/holidays/dusicky" className="wikilink">
                Dušičky
              </Link>{' '}
              a ty budeš stát u hromady pneumatik zase nepřipravený.
            </p>
          </div>
        </div>

        <aside>
          <figure style={{ margin: 0 }}>
            <img
              src="/cirkev.jpg"
              alt="Dva bagristé v žlutých ornátech a přilbách CAT se modlí na kopci; nad nimi v oblacích bagry se svatozáří."
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                border: '1px solid var(--cardline)',
                boxShadow: 'var(--sh)',
              }}
            />
            <figcaption className="lab" style={{ marginTop: 10, whiteSpace: 'normal' }}>
              Ranní rozjímání vyššího zasvěcení. Lom u Mokré, nedatováno.
            </figcaption>
          </figure>
        </aside>
      </section>

      <section className="sec two" style={{ borderBottom: 0 }}>
        <div>
          {state === 'done' ? (
            <>
              <div className="note">
                <div className="lab">Zapsán</div>
                <p className="q">
                  „Tvé jméno stojí v knize." Zkontroluj schránku — potvrzení už jede. Tak
                  jest, na motohodinu.
                </p>
              </div>
              <Link to="/kviz" className="btn">
                Zjisti svůj stupeň
              </Link>
            </>
          ) : state === 'not-configured' ? (
            <>
              <div className="note">
                <div className="lab">Ohlášení</div>
                <p className="q">
                  „Kniha je vysázena, písař ještě brousí pero." Zápis se právě zařizuje —
                  zkus to za pár dní.
                </p>
              </div>
              <div className="btn-row">
                <Link to="/kviz" className="btn">
                  Zatím zjisti svůj stupeň
                </Link>
                <Link to="/lore" className="btn o">
                  Číst písmo
                </Link>
              </div>
            </>
          ) : (
            <form onSubmit={onSubmit} style={{ maxWidth: 520 }}>
              <div className="sh top">
                <span>Zápis do knihy</span>
              </div>

              <label
                className="lab"
                htmlFor="email"
                style={{ display: 'block', marginBottom: 8 }}
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="bagrista@example.cz"
                disabled={state === 'sending'}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontFamily: 'var(--serif)',
                  fontSize: 18,
                  color: 'var(--ink)',
                  background: 'var(--paper-2)',
                  border: '1px solid var(--cardline)',
                  boxShadow: 'var(--sh)',
                }}
              />

              <label
                style={{
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start',
                  margin: '20px 0 24px',
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: 'var(--ink-2)',
                }}
              >
                <input
                  type="checkbox"
                  name="consent"
                  required
                  disabled={state === 'sending'}
                  style={{ marginTop: 4 }}
                />
                <span>
                  Souhlasím, aby mi Bratrstvo posílalo Věstník na uvedený e-mail. Adresu
                  nepředáme nikomu dalšímu a odejít jde jedním klikem v každém vydání.
                </span>
              </label>

              <button type="submit" className="btn" disabled={state === 'sending'}>
                {state === 'sending' ? 'Zapisuji…' : 'Zapiš mě do knihy'}
              </button>

              {state === 'error' && (
                <p
                  style={{
                    marginTop: 16,
                    color: 'var(--red)',
                    fontSize: 15,
                  }}
                >
                  {message}
                </p>
              )}
            </form>
          )}
        </div>

        <div>
          <div className="card">
            <div className="sh">
              <span>Co to obnáší</span>
            </div>
            <dl className="kv">
              {PROMISES.map(([key, value]) => (
                <div key={key} style={{ display: 'contents' }}>
                  <dt>{key}</dt>
                  <dd style={{ fontWeight: 400 }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
