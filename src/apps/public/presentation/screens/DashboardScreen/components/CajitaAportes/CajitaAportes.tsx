'use client';

/**
 * CajitaAportes
 *
 * La gráfica de barras del historial. Las alturas se escalan contra el aporte
 * más grande de los visibles, y el último se pinta en coral.
 */

import type { CajitaAportesProps } from '../../DashboardScreen.interfaces';
import { construirBarras } from '../../DashboardScreen.helpers';
import { DASHBOARD_UI_TEXT } from '../../DashboardScreen.constants';

import {
  AporteBar,
  AporteColumn,
  AporteLabel,
  AportesCard,
  AportesChart,
  AportesEmpty,
  AportesTitle,
} from '../../DashboardScreen.styled';

export const CajitaAportes = ({ cajita }: CajitaAportesProps) => {
  const barras = construirBarras(cajita.registros);

  return (
    <AportesCard>
      <AportesTitle>{DASHBOARD_UI_TEXT.APORTES.TITLE}</AportesTitle>

      {barras.length === 0 ? (
        <AportesEmpty>{DASHBOARD_UI_TEXT.APORTES.EMPTY}</AportesEmpty>
      ) : (
        <AportesChart>
          {barras.map((barra) => (
            <AporteColumn key={barra.id}>
              <AporteBar $altura={barra.alturaPorcentaje} $ultimo={barra.esUltimo} />
              <AporteLabel>{barra.etiqueta}</AporteLabel>
            </AporteColumn>
          ))}
        </AportesChart>
      )}
    </AportesCard>
  );
};
