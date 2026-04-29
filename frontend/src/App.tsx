import { useEffect, useState } from 'react';

type HealthResponse = { status: string };

export function App() {
  const [status, setStatus] = useState<string>('načítám…');

  useEffect(() => {
    fetch('/api/health')
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<HealthResponse>;
      })
      .then((data) => setStatus(data.status))
      .catch((err: unknown) => {
        const msg = err instanceof Error ? err.message : String(err);
        setStatus(`backend nedostupný (${msg})`);
      });
  }, []);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: '2rem', maxWidth: 600 }}>
      <h1>Bagrista</h1>
      <p>
        API status: <strong>{status}</strong>
      </p>
      <p style={{ color: '#666', fontSize: 14 }}>
        Backend musí běžet na <code>:3001</code> (<code>cd backend && npm run dev</code>).
      </p>
    </main>
  );
}
