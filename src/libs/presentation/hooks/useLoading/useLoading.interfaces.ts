/**
 * useLoading Hook Interfaces
 */

export interface UseLoadingReturn {
  actualizando: () => void;
  cargandoDatos: () => void;
  descargando: () => void;
  eliminando: () => void;
  enviando: () => void;
  guardando: () => void;
  procesando: () => void;
  subiendoArchivos: () => void;

  mostrarCargaGlobal: () => void;
  ocultarCargaGlobal: () => void;
  showGlobalLoading: () => void;
  hideGlobalLoading: () => void;

  isAnyLoading: boolean;
  isGlobalLoading: boolean;

  mensajes: {
    readonly ACTUALIZANDO: 'Actualizando...';
    readonly CARGANDO: 'Cargando...';
    readonly CARGANDO_DATOS: 'Cargando datos...';
    readonly DESCARGANDO: 'Descargando...';
    readonly ELIMINANDO: 'Eliminando...';
    readonly ENVIANDO: 'Enviando...';
    readonly GUARDANDO: 'Guardando...';
    readonly PROCESANDO: 'Procesando...';
    readonly SUBIENDO: 'Subiendo archivos...';
  };
}
