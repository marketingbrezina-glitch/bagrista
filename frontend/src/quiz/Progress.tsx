type Props = {
  current: number;
  total: number;
};

export function Progress({ current, total }: Props) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div>
      <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
        Otázka {current} z {total}
      </div>
      <div
        style={{
          height: 6,
          background: '#eee',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: '#333',
            transition: 'width 200ms ease',
          }}
        />
      </div>
    </div>
  );
}
