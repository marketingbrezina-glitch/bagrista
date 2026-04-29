type Props = {
  current: number;
  total: number;
};

export function Progress({ current, total }: Props) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--mono)',
          fontSize: 11,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'var(--fg-dim)',
          marginBottom: 8,
        }}
      >
        <span>
          Otázka {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span style={{ color: 'var(--accent-num)' }}>{Math.round(pct)} %</span>
      </div>
      <div
        style={{
          height: 6,
          background: 'var(--bg-3)',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: 'var(--zlut)',
            transition: 'width 200ms ease',
          }}
        />
      </div>
    </div>
  );
}
