/**
 * MeetButton Tests
 *
 * Skinned CTA wrapper: renders its label and fires onClick.
 * Spanish locale mandatory.
 */

import { assertText, render, user } from '@testing';

import { MeetButton } from './MeetButton';

describe('MeetButton', () => {
  it('renders the label and fires onClick', async () => {
    const onClick = vi.fn();
    render(<MeetButton onClick={onClick}>Apartar mi ejemplar</MeetButton>);

    assertText('Apartar mi ejemplar');
    await user.clickButton('Apartar mi ejemplar');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('renders the outline variant label', () => {
    render(<MeetButton variant='outline'>Comprar · Pack Dear Adry</MeetButton>);

    assertText('Comprar · Pack Dear Adry');
  });
});
