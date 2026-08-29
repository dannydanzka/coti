import { config as loadEnv } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

/**
 * El CLI de Prisma no comparte la carga de variables de Next.js: sólo lee `.env`.
 * Cargamos primero `.env.local` (la que usa el desarrollo local, gitignored) y
 * después `.env`, sin sobrescribir lo ya definido — mismo orden de precedencia
 * que aplica Next.
 */
loadEnv({ path: '.env.local' });
loadEnv({ path: '.env' });

export default defineConfig({
  datasource: {
    /**
     * El CLI (migrate, db push, studio) usa la conexión DIRECTA, no el pooler:
     * pgbouncer en modo transacción no soporta las sentencias preparadas ni los
     * locks de aviso que necesita `migrate`.
     *
     * El runtime de la app va por el pooler — `DATABASE_URL` — a través del
     * adaptador en `src/lib/prisma.ts`.
     *
     * NO definir aquí `shadowDatabaseUrl` apuntando a una base real: Prisma
     * RESETEA la shadow database en cada `migrate dev`. Sólo debe apuntar a una
     * base vacía y desechable.
     */
    url: env('DIRECT_URL'),
  },
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  schema: 'prisma/schema.prisma',
});
