/**
 * useTripPlanner
 *
 * Estado y matemática del wizard de 7 pasos. El borrador vive en Redux; la
 * proyección y el plan se derivan aquí con las funciones puras del dominio
 * (`proyectarCosto`, `fechaDeLlegada`). El servidor recalcula al guardar.
 */

'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { AUTHENTICATED_ROUTES } from '@constants';
import {
  createViajeAction,
  fetchDestinosAction,
  goToStep,
  PLANNER_TOTAL_STEPS,
  resetDraft,
  selectDestinos,
  selectDestinoSeleccionado,
  selectDestinosLoaded,
  selectPlannerDraft,
  selectTravelSaving,
  updateDraft,
} from '@redux';
import type { EstiloViaje, PrioridadAtraccion } from '@interfaces';
import { fechaDeLlegada, periodosEntre, proyectarCosto } from '@domain';
import type { PlannerDraft } from '@redux';
import { useAppDispatch, useAppSelector } from '@hooks';

import {
  ESTILO_ALOJAMIENTO,
  ESTILO_COMIDA,
  ESTILO_RITMO,
  MS_PER_DAY,
  MUST_GO,
} from './useTripPlanner.constants';
import type {
  PlannerPlanSummary,
  PlannerProjection,
  UseTripPlannerReturn,
} from './useTripPlanner.interfaces';

const resolveEjes = (estilos: EstiloViaje[]) => {
  let estiloAlojamiento = 'MEDIO' as NonNullable<(typeof ESTILO_ALOJAMIENTO)[EstiloViaje]>;
  let estiloComida = 'MEDIO' as NonNullable<(typeof ESTILO_COMIDA)[EstiloViaje]>;
  let ritmo = 'MEDIO' as NonNullable<(typeof ESTILO_RITMO)[EstiloViaje]>;
  estilos.forEach((estilo) => {
    estiloAlojamiento = ESTILO_ALOJAMIENTO[estilo] ?? estiloAlojamiento;
    estiloComida = ESTILO_COMIDA[estilo] ?? estiloComida;
    ritmo = ESTILO_RITMO[estilo] ?? ritmo;
  });
  return { estiloAlojamiento, estiloComida, ritmo };
};

const nochesEntre = (salida: string | null, regreso: string | null): number => {
  if (!salida || !regreso) return 0;
  const dias = Math.round((new Date(regreso).getTime() - new Date(salida).getTime()) / MS_PER_DAY);
  return Math.max(0, dias);
};

export const useTripPlanner = (): UseTripPlannerReturn => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const draft = useAppSelector(selectPlannerDraft);
  const destinos = useAppSelector(selectDestinos);
  const destinosLoaded = useAppSelector(selectDestinosLoaded);
  const destino = useAppSelector(selectDestinoSeleccionado);
  const isSaving = useAppSelector(selectTravelSaving);

  useEffect(() => {
    if (!destinosLoaded) {
      void dispatch(fetchDestinosAction());
    }
  }, [destinosLoaded, dispatch]);

  const noches = useMemo(
    () => nochesEntre(draft.fechaSalida, draft.fechaRegreso),
    [draft.fechaRegreso, draft.fechaSalida]
  );

  const projection = useMemo<PlannerProjection | null>(() => {
    if (!destino || !draft.fechaSalida || noches === 0) return null;
    const mes = new Date(draft.fechaSalida).getMonth() + 1;
    const multiplicadorTemporada =
      destino.temporadas.find((temporada) => temporada.mes === mes)?.multiplicador ?? 1;
    const porId = new Map(destino.atracciones.map((item) => [item.id, item]));
    let atraccionesMustGo = 0;
    let atraccionesOpcionales = 0;
    Object.entries(draft.atracciones).forEach(([id, prioridad]) => {
      const atraccion = porId.get(id);
      if (!atraccion) return;
      if (prioridad === MUST_GO) atraccionesMustGo += atraccion.costoMin;
      else atraccionesOpcionales += atraccion.costoMax;
    });
    const rango = proyectarCosto(destino, {
      ...resolveEjes(draft.estilos),
      atraccionesMustGo,
      atraccionesOpcionales,
      multiplicadorTemporada,
      noches,
      personas: draft.personas,
    });
    return {
      metas: {
        COMODO: Math.round((rango.min + rango.max) / 2),
        MINIMO: rango.min,
        SIN_LIMITES: rango.max,
      },
      multiplicadorTemporada,
      rango,
    };
  }, [destino, draft.atracciones, draft.estilos, draft.fechaSalida, draft.personas, noches]);

  const plan = useMemo<PlannerPlanSummary | null>(() => {
    if (!projection || !draft.fechaSalida) return null;
    const meta = projection.metas[draft.metaOpcion];
    const montoInicial = draft.tieneAhorro ? draft.montoInicial : 0;
    const hoy = new Date();
    const salida = new Date(draft.fechaSalida);
    const fechaLlegada = fechaDeLlegada(
      meta,
      montoInicial,
      draft.aportacion,
      draft.frecuencia,
      hoy
    );
    return {
      fechaLlegada,
      llegaATiempo: fechaLlegada !== null && fechaLlegada.getTime() <= salida.getTime(),
      meta,
      periodos: periodosEntre(hoy, salida, draft.frecuencia),
      restante: Math.max(0, meta - montoInicial),
    };
  }, [
    draft.aportacion,
    draft.fechaSalida,
    draft.frecuencia,
    draft.metaOpcion,
    draft.montoInicial,
    draft.tieneAhorro,
    projection,
  ]);

  const canContinue = useMemo(() => {
    switch (draft.step) {
      case 1:
        return Boolean(draft.destinoId && draft.fechaSalida && noches > 0);
      case 4:
      case 5:
        return projection !== null && draft.aportacion > 0;
      case 6:
        return !draft.tieneAhorro || draft.montoInicial >= 0;
      default:
        return true;
    }
  }, [draft, noches, projection]);

  const setDraft = useCallback(
    (patch: Partial<PlannerDraft>) => {
      dispatch(updateDraft(patch));
    },
    [dispatch]
  );

  const goNext = useCallback(() => {
    dispatch(goToStep(draft.step + 1));
  }, [dispatch, draft.step]);

  const goBack = useCallback(() => {
    dispatch(goToStep(draft.step - 1));
  }, [dispatch, draft.step]);

  const saveAndExit = useCallback(() => {
    router.push(AUTHENTICATED_ROUTES.DASHBOARD);
  }, [router]);

  const toggleEstilo = useCallback(
    (estilo: EstiloViaje) => {
      const estilos = draft.estilos.includes(estilo)
        ? draft.estilos.filter((item) => item !== estilo)
        : [...draft.estilos, estilo];
      dispatch(updateDraft({ estilos }));
    },
    [dispatch, draft.estilos]
  );

  const setAtraccion = useCallback(
    (atraccionId: string, prioridad: PrioridadAtraccion | null) => {
      const atracciones = { ...draft.atracciones };
      if (prioridad === null) delete atracciones[atraccionId];
      else atracciones[atraccionId] = prioridad;
      dispatch(updateDraft({ atracciones }));
    },
    [dispatch, draft.atracciones]
  );

  const submit = useCallback(async () => {
    if (!draft.destinoId || !draft.fechaSalida || !plan) return;
    const result = await dispatch(
      createViajeAction({
        aportacion: draft.aportacion,
        atracciones: Object.entries(draft.atracciones).map(([atraccionId, prioridad]) => ({
          atraccionId,
          prioridad,
        })),
        destinoId: draft.destinoId,
        ...resolveEjes(draft.estilos),
        fechaSalida: new Date(draft.fechaSalida).toISOString(),
        frecuencia: draft.frecuencia,
        meta: plan.meta,
        montoInicial: draft.tieneAhorro ? draft.montoInicial : 0,
        noches,
        personas: draft.personas,
        recordatorios: draft.recordatorios,
      })
    );
    if (createViajeAction.fulfilled.match(result)) {
      dispatch(resetDraft());
      router.push(AUTHENTICATED_ROUTES.CAJITA);
    }
  }, [dispatch, draft, noches, plan, router]);

  return {
    canContinue,
    destino,
    destinos,
    destinosLoaded,
    draft,
    goBack,
    goNext,
    isSaving,
    noches,
    plan,
    projection,
    saveAndExit,
    setAtraccion,
    setDraft,
    submit,
    toggleEstilo,
    totalSteps: PLANNER_TOTAL_STEPS,
  };
};
