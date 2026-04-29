import { Bucket } from './Bucket';

export function WordmarkInline() {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
      <span
        style={{
          fontFamily: 'var(--headline)',
          fontSize: 11,
          letterSpacing: '0.42em',
          textTransform: 'uppercase',
          color: 'var(--fg-dim)',
        }}
      >
        Jsem
      </span>
      <span style={{ position: 'relative', display: 'inline-block' }}>
        <span style={{ position: 'absolute', right: 2, top: -8, transform: 'rotate(-8deg)' }}>
          <Bucket size={14} />
        </span>
        <span
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 22,
            letterSpacing: '-0.005em',
            textTransform: 'uppercase',
            color: 'var(--fg)',
          }}
        >
          BAGRISTA
        </span>
      </span>
    </span>
  );
}

type WordmarkLargeProps = {
  size?: number;
};

export function WordmarkLarge({ size = 1 }: WordmarkLargeProps) {
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div
        style={{
          fontFamily: 'var(--headline)',
          fontWeight: 500,
          fontSize: 22 * size,
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          color: 'var(--fg-dim)',
          marginBottom: 12 * size,
          paddingLeft: '0.55em',
        }}
      >
        Jsem
      </div>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          style={{
            position: 'absolute',
            right: 18 * size,
            top: -42 * size,
            transform: 'rotate(-8deg)',
          }}
        >
          <Bucket size={68 * size} />
        </div>
        <h1
          style={{
            fontFamily: "'Archivo Black', 'Anton', sans-serif",
            fontSize: 'clamp(80px, 13vw, 200px)',
            lineHeight: 0.88,
            letterSpacing: '-0.012em',
            textTransform: 'uppercase',
            color: 'var(--fg)',
            margin: 0,
          }}
        >
          BAGRISTA
        </h1>
      </div>
    </div>
  );
}
