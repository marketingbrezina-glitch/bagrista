type Props = {
  label: string;
  score: number;
  max: number;
};

export function AxisBar({ label, score, max }: Props) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (score / max) * 100)) : 0;
  return (
    <div style={{ marginBottom: 16 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 6,
        }}
      >
        <span className="lab" style={{ color: 'var(--ink)' }}>
          {label}
        </span>
        <span
          style={{
            fontFamily: 'var(--np)',
            fontWeight: 700,
            fontSize: 18,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {Math.round(pct)} %
        </span>
      </div>
      <div className="prog" style={{ height: 8 }}>
        <i style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
