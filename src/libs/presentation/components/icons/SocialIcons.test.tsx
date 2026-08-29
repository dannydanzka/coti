/**
 * SocialIcons Tests
 */

import { assertTestId, render } from '@testing';

import { FacebookIcon, InstagramIcon, LinkedinIcon, MailIcon, YoutubeIcon } from './SocialIcons';

describe('SocialIcons', () => {
  it('renders FacebookIcon', () => {
    render(<FacebookIcon data-testid='fb' />);
    assertTestId('fb');
  });

  it('renders InstagramIcon', () => {
    render(<InstagramIcon data-testid='ig' />);
    assertTestId('ig');
  });

  it('renders YoutubeIcon', () => {
    render(<YoutubeIcon data-testid='yt' />);
    assertTestId('yt');
  });

  it('renders LinkedinIcon', () => {
    render(<LinkedinIcon data-testid='li' />);
    assertTestId('li');
  });

  it('renders MailIcon', () => {
    render(<MailIcon data-testid='mail' />);
    assertTestId('mail');
  });
});
