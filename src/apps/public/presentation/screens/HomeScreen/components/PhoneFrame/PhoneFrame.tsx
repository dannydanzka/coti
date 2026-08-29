/**
 * PhoneFrame Component
 *
 * Decorative mobile shell for product previews on the landing. Purely
 * presentational — the "screen" is whatever children render.
 */

'use client';

import type { PhoneFrameProps } from './PhoneFrame.interfaces';
import { STATUS_TIME } from './PhoneFrame.constants';

import {
  Caption,
  Device,
  FrameWrapper,
  HomeIndicator,
  Screen,
  StatusBar,
  StatusPill,
} from './PhoneFrame.styled';

export const PhoneFrame = ({ caption, children, className, tilt = 'none' }: PhoneFrameProps) => (
  <FrameWrapper $tilt={tilt} className={className}>
    <Device aria-hidden='true'>
      <StatusBar>
        {STATUS_TIME}
        <StatusPill />
      </StatusBar>
      <Screen>{children}</Screen>
      <HomeIndicator />
    </Device>
    {caption && <Caption>{caption}</Caption>}
  </FrameWrapper>
);
