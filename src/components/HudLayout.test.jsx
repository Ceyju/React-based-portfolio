import { describe, expect, it } from 'vitest';
import { pages } from './HudLayout';

describe('HUD navigation', () => {
  it('keeps the approved seven-page route order', () => {
    expect(pages.map((page) => page.path)).toEqual([
      '/', '/profile', '/experience', '/projects', '/github', '/resume', '/contact',
    ]);
  });
});
