-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'ADMIN', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "Temporada" AS ENUM ('BAJA', 'MEDIA', 'ALTA');

-- CreateEnum
CREATE TYPE "EstadoViaje" AS ENUM ('BORRADOR', 'AHORRANDO', 'COMPLETADO');

-- CreateEnum
CREATE TYPE "Prioridad" AS ENUM ('MUST_GO', 'WOULD_BE_NICE');

-- CreateEnum
CREATE TYPE "Frecuencia" AS ENUM ('SEMANAL', 'QUINCENAL', 'MENSUAL', 'TRIMESTRAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "phone" VARCHAR(20),
    "age" INTEGER,
    "photoUrl" VARCHAR(500),
    "bio" VARCHAR(200),
    "street" VARCHAR(150),
    "number" VARCHAR(20),
    "neighborhood" VARCHAR(100),
    "city" VARCHAR(100),
    "state" VARCHAR(100),
    "zipCode" VARCHAR(10),
    "country" VARCHAR(100) DEFAULT 'México',
    "role" "UserRole" NOT NULL DEFAULT 'PARTICIPANT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deletedAt" TIMESTAMP(3),
    "deletedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "password_reset_tokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destino" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "continente" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "vueloMin" INTEGER NOT NULL,
    "vueloMax" INTEGER NOT NULL,
    "hospedajeMin" INTEGER NOT NULL,
    "hospedajeMax" INTEGER NOT NULL,
    "diarioMin" INTEGER NOT NULL,
    "diarioMax" INTEGER NOT NULL,
    "visaCosto" INTEGER NOT NULL DEFAULT 0,
    "diasSugeridos" INTEGER NOT NULL DEFAULT 7,

    CONSTRAINT "Destino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemporadaDestino" (
    "id" TEXT NOT NULL,
    "destinoId" TEXT NOT NULL,
    "mes" INTEGER NOT NULL,
    "temporada" "Temporada" NOT NULL,
    "multiplicador" DOUBLE PRECISION NOT NULL DEFAULT 1.0,

    CONSTRAINT "TemporadaDestino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atraccion" (
    "id" TEXT NOT NULL,
    "destinoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "costoMin" INTEGER NOT NULL,
    "costoMax" INTEGER NOT NULL,

    CONSTRAINT "Atraccion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Viaje" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destinoId" TEXT NOT NULL,
    "estado" "EstadoViaje" NOT NULL DEFAULT 'BORRADOR',
    "fechaSalida" TIMESTAMP(3),
    "noches" INTEGER NOT NULL DEFAULT 7,
    "personas" INTEGER NOT NULL DEFAULT 1,
    "costoMin" INTEGER NOT NULL,
    "costoMax" INTEGER NOT NULL,
    "estiloAlojamiento" TEXT NOT NULL DEFAULT 'MEDIO',
    "estiloComida" TEXT NOT NULL DEFAULT 'MEDIO',
    "ritmo" TEXT NOT NULL DEFAULT 'MEDIO',
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Viaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AtraccionViaje" (
    "id" TEXT NOT NULL,
    "viajeId" TEXT NOT NULL,
    "atraccionId" TEXT NOT NULL,
    "prioridad" "Prioridad" NOT NULL DEFAULT 'WOULD_BE_NICE',

    CONSTRAINT "AtraccionViaje_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanDeAhorro" (
    "id" TEXT NOT NULL,
    "viajeId" TEXT NOT NULL,
    "meta" INTEGER NOT NULL,
    "montoInicial" INTEGER NOT NULL DEFAULT 0,
    "aportacion" INTEGER NOT NULL,
    "frecuencia" "Frecuencia" NOT NULL DEFAULT 'MENSUAL',
    "fechaObjetivo" TIMESTAMP(3) NOT NULL,
    "recordatorios" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanDeAhorro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistroDeAhorro" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nota" TEXT,

    CONSTRAINT "RegistroDeAhorro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitoRecorte" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "etiqueta" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "costoMensual" INTEGER NOT NULL,
    "recorte" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "HabitoRecorte_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE INDEX "users_isActive_idx" ON "users"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_tokens_token_key" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_token_idx" ON "password_reset_tokens"("token");

-- CreateIndex
CREATE INDEX "password_reset_tokens_userId_idx" ON "password_reset_tokens"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Destino_slug_key" ON "Destino"("slug");

-- CreateIndex
CREATE INDEX "Destino_continente_idx" ON "Destino"("continente");

-- CreateIndex
CREATE UNIQUE INDEX "TemporadaDestino_destinoId_mes_key" ON "TemporadaDestino"("destinoId", "mes");

-- CreateIndex
CREATE INDEX "Atraccion_destinoId_idx" ON "Atraccion"("destinoId");

-- CreateIndex
CREATE INDEX "Viaje_userId_idx" ON "Viaje"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AtraccionViaje_viajeId_atraccionId_key" ON "AtraccionViaje"("viajeId", "atraccionId");

-- CreateIndex
CREATE UNIQUE INDEX "PlanDeAhorro_viajeId_key" ON "PlanDeAhorro"("viajeId");

-- CreateIndex
CREATE INDEX "RegistroDeAhorro_planId_fecha_idx" ON "RegistroDeAhorro"("planId", "fecha");

-- CreateIndex
CREATE INDEX "HabitoRecorte_planId_idx" ON "HabitoRecorte"("planId");

-- AddForeignKey
ALTER TABLE "TemporadaDestino" ADD CONSTRAINT "TemporadaDestino_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atraccion" ADD CONSTRAINT "Atraccion_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destino"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_destinoId_fkey" FOREIGN KEY ("destinoId") REFERENCES "Destino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtraccionViaje" ADD CONSTRAINT "AtraccionViaje_viajeId_fkey" FOREIGN KEY ("viajeId") REFERENCES "Viaje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AtraccionViaje" ADD CONSTRAINT "AtraccionViaje_atraccionId_fkey" FOREIGN KEY ("atraccionId") REFERENCES "Atraccion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanDeAhorro" ADD CONSTRAINT "PlanDeAhorro_viajeId_fkey" FOREIGN KEY ("viajeId") REFERENCES "Viaje"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistroDeAhorro" ADD CONSTRAINT "RegistroDeAhorro_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanDeAhorro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitoRecorte" ADD CONSTRAINT "HabitoRecorte_planId_fkey" FOREIGN KEY ("planId") REFERENCES "PlanDeAhorro"("id") ON DELETE CASCADE ON UPDATE CASCADE;

