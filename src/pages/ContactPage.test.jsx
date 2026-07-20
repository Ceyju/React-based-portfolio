import { describe, expect, it } from 'vitest';
import { validateContact } from './ContactPage';

describe('contact validation', () => {
  it('rejects incomplete input', () => {
    expect(validateContact({ name: 'K', email: 'nope', message: 'short' })).toEqual({
      name: 'Enter at least two characters.',
      email: 'Enter a valid email address.',
      message: 'Tell me a little more (20 characters minimum).',
    });
  });

  it('accepts a complete transmission', () => {
    expect(validateContact({ name: 'Kurt', email: 'kurt@example.com', message: 'A sufficiently detailed project brief.' })).toEqual({});
  });
});
