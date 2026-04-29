type Props = {
  label: string;
  score: number;
  max: number;
};

export function AxisBar({ label, score, max }: Props) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (score / max) * 100)) : 0;
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          marginBottom: 4,
        }}
      >
        <span style={{ color: 'var(--fg)' }}>{label}</span>
        <span style={{ color: 'var(--accent-num)' }}>{Math.round(pct)} %</span>
      </div>
      <div
        style={{
          height: 8,
          background: 'var(--bg-3)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: 'var(--zlut)',
            transition: 'width 220ms ease',
          }}
        />
      </div>
    </div>
  );
}
