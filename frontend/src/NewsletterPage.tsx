import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { trackEvent } from './analytics';

/**
 * Adresa formuláře u poskytovatele rozesílky (Buttondown, ConvertKit, …).
 * Dokud není nastavená, stránka o zápisu mlčí místo aby předstírala, že sbírá —
 * formulář, který e-maily tiše zahazuje, je horší než žádný.
 *
 * Nastavuje se v Vercelu jako `VITE_NEWSLETTER_ACTION`, stejně jako GA měřicí ID.
 */
const ACTION = import.meta.env.VITE_NEWSLETTER_ACTION ?? '';

const PROMISES: [string, string][] = [
  ['Kadence', 'Nepravidelně. Když je co říct.'],
  ['Obsah', 'Nová hesla z Lore, hospodské moudro, sezónní připomínky.'],
  ['Cena', 'Žádná. Bratrstvo neprodává.'],
  ['Odchod', 'Jedním klikem v každém vydání. Bez výslechu.'],
];

export function NewsletterPage() {
  const [submitted, setSubmitted] = useState(false);
  const live = ACTION.length > 0;

  function onSubmit(_event: FormEvent<HTMLFormElement>) {
    trackEvent('newsletter_signup');
    setSubmitted(true);
    // Formulář se odesílá nativně na adresu poskytovatele, event nerušíme.
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
            {live && <span>Zdarma · odejít lze kdykoli</span>}
          </div>
          <h1>Přidej se k Bratrstvu</h1>
          <p className="dk">
            Nikdo tě zkoušet nebude. Zápis do knihy je prostý — jméno schránky a tichý
            souhlas. Věstník ti pak nosí, co se v Bratrstvu šustne: nová hesla z Lore,
            hospodské moudro a připomínku, než přijdou Dušičky a ty budeš stát u hromady
            pneumatik zase nepřipravený.
          </p>
        </div>

        <aside className="card">
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
        </aside>
      </section>

      <section className="sec" style={{ borderBottom: 0 }}>
        {!live ? (
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
        ) : submitted ? (
          <>
            <div className="note">
              <div className="lab">Zapsán</div>
              <p className="q">
                „Tvé jméno stojí v knize." Zkontroluj schránku — potvrzení už jede. Tak
                jest, na motohodinu.
              </p>
            </div>
            <div className="btn-row">
              <Link to="/kviz" className="btn">
                Zjisti svůj stupeň
              </Link>
            </div>
          </>
        ) : (
          <form
            action={ACTION}
            method="post"
            target="_blank"
            onSubmit={onSubmit}
            style={{ maxWidth: 560 }}
          >
            <div className="sh top">
              <span>Zápis do knihy</span>
            </div>

            <label className="lab" htmlFor="email" style={{ display: 'block', marginBottom: 8 }}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="bagrista@example.cz"
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
              <input type="checkbox" name="consent" required style={{ marginTop: 4 }} />
              <span>
                Souhlasím, aby mi Bratrstvo posílalo Věstník na uvedený e-mail. Adresu
                nepředáme nikomu dalšímu a odejít jde jedním klikem v každém vydání.
              </span>
            </label>

            <button type="submit" className="btn">
              Zapiš mě do knihy
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
