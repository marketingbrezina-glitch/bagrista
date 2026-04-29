import Fastify from 'fastify';

const PORT = Number(process.env.PORT ?? 3001);
const HOST = process.env.HOST ?? '0.0.0.0';
const LOG_LEVEL = process.env.LOG_LEVEL ?? 'info';

const app = Fastify({
  logger: { level: LOG_LEVEL },
});

app.get('/api/health', async () => {
  return { status: 'ok' };
});

const start = async () => {
  try {
    await app.listen({ port: PORT, host: HOST });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
