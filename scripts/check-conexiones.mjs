#!/usr/bin/env node
/* global console, process */
/**
 * Prueba de conexiones de COTI — base de datos y Vercel.
 * Uso: node scripts/check-conexiones.mjs
 */
import 'dotenv/config';
import { readFileSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import pg from 'pg';

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const no = (m) => console.log(`  \x1b[31m✗\x1b[0m ${m}`);
const wa = (m) => console.log(`  \x1b[33m!\x1b[0m ${m}`);
const titulo = (m) => console.log(`\n\x1b[1m${m}\x1b[0m`);

let fallos = 0;

// ─── 1. Base de datos ───
titulo('Base de datos (Supabase → Prisma)');

const url = process.env.DATABASE_URL;
const directo = process.env.DIRECT_URL;

if (!url) {
  no('DATABASE_URL no está definida');
  wa('Pégala en .env.local — Supabase → Settings → Database → Connection string (pooler, 6543)');
  fallos++;
} else {
  const ref = url.match(/postgres\.([a-z0-9]+):/)?.[1] ?? '?';
  const host = url.match(/@([^:/]+):(\d+)/);
  ok(`DATABASE_URL definida — proyecto ${ref}, ${host?.[1]}:${host?.[2]}`);
  if (!url.includes('uselibpqcompat')) {
    wa('Falta uselibpqcompat=true → fallará con "self-signed certificate in certificate chain"');
  }

  const pool = new pg.Pool({ connectionString: url, connectionTimeoutMillis: 10_000 });
  try {
    const { rows } = await pool.query('select current_database() db, version() v');
    ok(`Conectado a "${rows[0].db}" — ${rows[0].v.split(' on ')[0]}`);

    const t = await pool.query(
      "select table_name from information_schema.tables where table_schema='public' order by 1",
    );
    if (t.rowCount === 0) wa('Schema public vacío — falta correr la migración');
    else ok(`${t.rowCount} tablas: ${t.rows.map((r) => r.table_name).join(', ')}`);
  } catch (e) {
    no(`Conexión fallida: ${e.message}`);
    fallos++;
  } finally {
    await pool.end().catch(() => {});
  }
}

if (!directo) {
  wa('DIRECT_URL no definida — las migraciones de Prisma la necesitan (puerto 5432)');
} else {
  const pool = new pg.Pool({ connectionString: directo, connectionTimeoutMillis: 10_000 });
  try {
    await pool.query('select 1');
    ok('DIRECT_URL conecta (migraciones habilitadas)');
  } catch (e) {
    no(`DIRECT_URL falla: ${e.message}`);
    fallos++;
  } finally {
    await pool.end().catch(() => {});
  }
}

// ─── 2. Vercel ───
titulo('Vercel');

const sh = (cmd) => execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

try {
  const quien = sh('vercel whoami').split('\n').pop().trim();
  ok(`Sesión activa: ${quien}`);
} catch {
  no('Sin sesión — corre `vercel login`');
  fallos++;
}

if (existsSync('.vercel/project.json')) {
  const p = JSON.parse(readFileSync('.vercel/project.json', 'utf8'));
  ok(`Proyecto vinculado: ${p.projectName} (${p.projectId})`);
  ok(`Team: ${p.orgId}`);
} else {
  no('Sin .vercel/project.json — corre `vercel link`');
  fallos++;
}

try {
  const envs = sh('vercel env ls production 2>/dev/null');
  const tiene = (k) => (envs.includes(k) ? ok(`${k} está en producción`) : wa(`${k} NO está en producción — el deploy fallará`));
  tiene('DATABASE_URL');
  tiene('DIRECT_URL');
} catch {
  wa('No se pudo listar variables de producción');
}

titulo(fallos === 0 ? '✅ Sin fallos' : `❌ ${fallos} fallo(s)`);
process.exit(fallos === 0 ? 0 : 1);
