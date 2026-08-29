/**
 * ProductPreview Component
 *
 * Three of the eight product screens (proyección · plan de ahorro · cajita)
 * rebuilt as static, miniature UI inside a PhoneFrame. Shows real product
 * shape on the landing without screenshots.
 */

'use client';

import { useTranslation } from 'react-i18next';

import { PhoneFrame } from '../PhoneFrame';
import {
  PREVIEW_BOX,
  PREVIEW_BREAKDOWN,
  PREVIEW_PLAN,
  PREVIEW_TRIP,
} from './ProductPreview.constants';
import type { ProductPreviewProps } from './ProductPreview.interfaces';

import {
  AmountField,
  AmountUnit,
  AmountValue,
  BigNumber,
  BigNumberMuted,
  Card,
  CardBody,
  Celebrate,
  Chip,
  ChipRow,
  Cta,
  DarkCard,
  DarkCardLabel,
  DarkCardValue,
  Milestone,
  Milestones,
  MonthDot,
  MonthRow,
  Note,
  OkText,
  OkTitle,
  ProgressTrack,
  Radio,
  Row,
  RowHint,
  RowLabel,
  RowValue,
  ScreenSubtitle,
  ScreenTitle,
  SectionLabel,
  Segment,
  Segmented,
  Slider,
  Stat,
  StatGrid,
  StatLabel,
  StatValue,
  StepLabel,
} from './ProductPreview.styled';

const REACHED_MILESTONES = 1;

export const ProductPreview = ({ caption, screen, tilt = 'none' }: ProductPreviewProps) => {
  const { t } = useTranslation();

  const renderProjection = () => (
    <>
      <StepLabel>{t('home.preview.projection.step')}</StepLabel>
      <ProgressTrack $percent={50} />
      <DarkCard>
        <DarkCardLabel>{t('home.preview.projection.lead')}</DarkCardLabel>
        <DarkCardValue>{PREVIEW_TRIP.RANGE}</DarkCardValue>
        <DarkCardLabel>{PREVIEW_TRIP.META}</DarkCardLabel>
        <ChipRow>
          <Chip>{PREVIEW_TRIP.DESTINATION}</Chip>
          <Chip>{PREVIEW_TRIP.STYLE}</Chip>
        </ChipRow>
      </DarkCard>
      <Card>
        <Row>
          <SectionLabel>{t('home.preview.projection.details')}</SectionLabel>
        </Row>
        {PREVIEW_BREAKDOWN.map((item) => (
          <Row key={item.key}>
            <RowLabel>
              {item.emoji} {t(`home.preview.projection.items.${item.key}`)}
            </RowLabel>
            <RowValue>{item.range}</RowValue>
          </Row>
        ))}
      </Card>
      <Note>{t('home.preview.projection.note')}</Note>
      <Cta>{t('home.preview.projection.cta')}</Cta>
    </>
  );

  const renderPlan = () => (
    <>
      <StepLabel>{t('home.preview.plan.step')}</StepLabel>
      <ProgressTrack $percent={62} />
      <ScreenTitle>{t('home.preview.plan.title')}</ScreenTitle>
      <ScreenSubtitle>{t('home.preview.plan.subtitle')}</ScreenSubtitle>
      <SectionLabel>{t('home.preview.plan.goalLabel')}</SectionLabel>
      <Card>
        {PREVIEW_PLAN.GOALS.map((goal) => (
          <Row $selected={goal.selected} key={goal.key}>
            <Radio $on={goal.selected} />
            <RowLabel>
              {t(`home.preview.plan.goals.${goal.key}.title`)}
              <RowHint>{t(`home.preview.plan.goals.${goal.key}.hint`)}</RowHint>
            </RowLabel>
            <RowValue>{goal.amount}</RowValue>
          </Row>
        ))}
      </Card>
      <SectionLabel>{t('home.preview.plan.frequencyLabel')}</SectionLabel>
      <Segmented>
        <Segment>{t('home.preview.plan.weekly')}</Segment>
        <Segment>{t('home.preview.plan.biweekly')}</Segment>
        <Segment $on>{t('home.preview.plan.monthly')}</Segment>
      </Segmented>
      <SectionLabel>{t('home.preview.plan.amountLabel')}</SectionLabel>
      <AmountField>
        <AmountValue>{PREVIEW_PLAN.MONTHLY}</AmountValue>
        <AmountUnit>{t('home.preview.plan.perMonth')}</AmountUnit>
      </AmountField>
      <Slider $percent={PREVIEW_PLAN.SLIDER_PERCENT} />
      <Card $tone='ok'>
        <CardBody>
          <OkTitle>{t('home.preview.plan.okTitle')}</OkTitle>
          <OkText>{t('home.preview.plan.okText')}</OkText>
        </CardBody>
      </Card>
    </>
  );

  const renderBox = () => (
    <>
      <ScreenTitle>{t('home.preview.box.greeting')}</ScreenTitle>
      <ScreenSubtitle>{t('home.preview.box.trip')}</ScreenSubtitle>
      <Card>
        <CardBody>
          <SectionLabel>{t('home.preview.box.savedLabel')}</SectionLabel>
          <BigNumber>
            {PREVIEW_BOX.SAVED}{' '}
            <BigNumberMuted>
              {t('home.preview.box.of')} {PREVIEW_BOX.GOAL}
            </BigNumberMuted>
          </BigNumber>
          <ProgressTrack $percent={PREVIEW_BOX.PROGRESS_PERCENT} />
          <Milestones>
            {PREVIEW_BOX.MILESTONES.map((milestone, index) => (
              <Milestone $reached={index < REACHED_MILESTONES} key={milestone}>
                {milestone}
              </Milestone>
            ))}
          </Milestones>
        </CardBody>
      </Card>
      <Celebrate>{t('home.preview.box.celebrate')}</Celebrate>
      <StatGrid>
        <Stat>
          <StatValue>{PREVIEW_BOX.REMAINING}</StatValue>
          <StatLabel>{t('home.preview.box.remaining')}</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{t('home.preview.box.monthsValue')}</StatValue>
          <StatLabel>{t('home.preview.box.monthsLabel')}</StatLabel>
        </Stat>
        <Stat>
          <StatValue>{t('home.preview.box.entriesValue')}</StatValue>
          <StatLabel>{t('home.preview.box.entriesLabel')}</StatLabel>
        </Stat>
      </StatGrid>
      <SectionLabel>{t('home.preview.box.entries')}</SectionLabel>
      <MonthRow>
        {PREVIEW_BOX.MONTHS.map((month) => (
          <MonthDot key={month}>{month}</MonthDot>
        ))}
      </MonthRow>
      <Card>
        <Row>
          <RowLabel>
            {t('home.preview.box.next')}
            <RowHint>
              {t('home.preview.box.nextDate')} · {PREVIEW_BOX.NEXT_AMOUNT}
            </RowHint>
          </RowLabel>
          <Chip $tone='coral'>{t('home.preview.box.register')}</Chip>
        </Row>
      </Card>
    </>
  );

  const renderScreen = () => {
    switch (screen) {
      case 'plan':
        return renderPlan();
      case 'cajita':
        return renderBox();
      case 'projection':
      default:
        return renderProjection();
    }
  };

  return (
    <PhoneFrame caption={caption} tilt={tilt}>
      {renderScreen()}
    </PhoneFrame>
  );
};
