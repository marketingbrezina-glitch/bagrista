type Props = {
  label: string;
  score: number;
  max: number;
};

export function AxisBar({ label, score, max }: Props) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (score / max) * 100)) : 0;
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 14,
          marginBottom: 4,
        }}
      >
        <span>{label}</span>
        <span style={{ color: '#666', fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(pct)} %
        </span>
      </div>
      <div
        style={{
          height: 8,
          background: '#eee',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: '#333',
          }}
        />
      </div>
    </div>
  );
}
