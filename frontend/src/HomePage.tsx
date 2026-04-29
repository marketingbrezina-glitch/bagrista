import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const pageStyle: CSSProperties = {
  maxWidth: 720,
  margin: '0 auto',
  padding: '64px 24px',
};

const titleStyle: CSSProperties = {
  fontSize: 44,
  letterSpacing: '-0.02em',
  margin: 0,
  marginBottom: 12,
  fontWeight: 700,
};

const taglineStyle: CSSProperties = {
  fontSize: 20,
  color: '#555',
  lineHeight: 1.4,
  marginBottom: 40,
};

const ctaRow: CSSProperties = {
  display: 'flex',
  gap: 12,
  flexWrap: 'wrap',
  marginBottom: 56,
};

const primaryCta: CSSProperties = {
  background: '#222',
  color: '#fff',
  padding: '14px 22px',
  borderRadius: 6,
  textDecoration: 'none',
  fontSize: 16,
  fontWeight: 500,
};

const secondaryCta: CSSProperties = {
  background: '#fff',
  color: '#222',
  padding: '14px 22px',
  borderRadius: 6,
  textDecoration: 'none',
  fontSize: 16,
  fontWeight: 500,
  border: '1px solid #222',
};

const sectionStyle: CSSProperties = {
  fontSize: 15,
  lineHeight: 1.6,
  color: '#444',
  borderTop: '1px solid #eee',
  paddingTop: 32,
};

export function HomePage() {
  return (
    <main style={pageStyle}>
      <h1 style={titleStyle}>Bagrista</h1>
      <p style={taglineStyle}>
        Osobnostní profilování bagristů. Kvíz, doktrína a encyklopedie{' '}
        <strong>Společenství kopajících</strong>.
      </p>
      <div style={ctaRow}>
        <Link to="/kviz" style={primaryCta}>
          Spustit kvíz
        </Link>
        <Link to="/lore" style={secondaryCta}>
          Procházet lore
        </Link>
      </div>
      <div style={sectionStyle}>
        <p>
          Devatenáct otázek tě zařadí do jednoho z osmi charakterových stupňů — od
          Nováčka v CAT 301.5 až po Zrádce v CAT D9. Encyklopedie shrnuje doktrínu,
          rituály, svátky a kacířské sekty, jichž se Společenství vědomě straní.
        </p>
        <p style={{ color: '#888', fontSize: 13 }}>
          Tento web je satira. Žádné stroje, ani návštěvníci, nebyli při výrobě
          poškozeni.
        </p>
      </div>
    </main>
  );
}
