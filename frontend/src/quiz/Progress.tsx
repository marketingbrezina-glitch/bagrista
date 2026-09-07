type Props = {
  current: number;
  total: number;
};

export function Progress({ current, total }: Props) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div
      style={{
        padding: '16px 0',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        borderBottom: '1px solid var(--hair)',
      }}
    >
      <span className="lab" style={{ color: 'var(--ink)' }}>
        Otázka {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
      <div className="prog" style={{ flex: 1 }}>
        <i style={{ width: `${pct}%` }} />
      </div>
      <span className="lab">{Math.round(pct)} %</span>
    </div>
  );
}
