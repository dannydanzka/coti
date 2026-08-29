/**
 * PlannerScreen
 *
 * Wizard de 7 pasos — define → estilo → atracciones → proyección → plan →
 * punto de partida → activar. El paso 8 (la cajita) vive en CajitaScreen.
 * Un paso a la vez, columna central, progreso arriba.
 */

'use client';

import { useTranslation } from 'react-i18next';

import { useTripPlanner } from '@apps/public/hooks';

import { ActivateStep } from './components/ActivateStep';
import { AttractionsStep } from './components/AttractionsStep';
import { DefineTripStep } from './components/DefineTripStep';
import { ProjectionStep } from './components/ProjectionStep';
import { SavingsPlanStep } from './components/SavingsPlanStep';
import { StartingPointStep } from './components/StartingPointStep';
import { StyleStep } from './components/StyleStep';

import {
  Body,
  ExitButton,
  Shell,
  StepMeter,
  StepMeterLabel,
  StepMeterTrack,
  TopBar,
  TopBarSpacer,
} from './PlannerScreen.styled';

export const PlannerScreen = () => {
  const { t } = useTranslation();
  const planner = useTripPlanner();
  const { draft, saveAndExit, totalSteps } = planner;

  const renderStep = () => {
    switch (draft.step) {
      case 2:
        return <StyleStep planner={planner} />;
      case 3:
        return <AttractionsStep planner={planner} />;
      case 4:
        return <ProjectionStep planner={planner} />;
      case 5:
        return <SavingsPlanStep planner={planner} />;
      case 6:
        return <StartingPointStep planner={planner} />;
      case 7:
        return <ActivateStep planner={planner} />;
      case 1:
      default:
        return <DefineTripStep planner={planner} />;
    }
  };

  return (
    <Shell>
      <TopBar>
        <TopBarSpacer />
        <StepMeter>
          <StepMeterLabel>
            {t('planner.common.stepOf', { step: draft.step, total: totalSteps + 1 })}
          </StepMeterLabel>
          <StepMeterTrack $percent={Math.round((draft.step / (totalSteps + 1)) * 100)} />
        </StepMeter>
        <ExitButton type='button' onClick={saveAndExit}>
          {t('planner.common.saveAndExit')}
        </ExitButton>
      </TopBar>
      <Body>{renderStep()}</Body>
    </Shell>
  );
};
