import { beforeEach, describe, expect, it } from 'vitest';
import { aggregateLanguages, CACHE_KEY, CACHE_TTL, normalizeCommits, readCache } from './github';

describe('GitHub data utilities', () => {
  beforeEach(() => window.localStorage.clear());

  it('aggregates and sorts language byte totals', () => {
    expect(aggregateLanguages([{ JavaScript: 50, CSS: 10 }, { JavaScript: 25, Python: 100 }])).toEqual([
      { name: 'Python', bytes: 100 }, { name: 'JavaScript', bytes: 75 }, { name: 'CSS', bytes: 10 },
    ]);
  });

  it('normalizes commit messages and keeps newest first', () => {
    const result = normalizeCommits([
      { repository: 'one', commits: [{ sha: '123456789', html_url: '#', commit: { message: 'Older\nbody', author: { date: '2026-01-01' } } }] },
      { repository: 'two', commits: [{ sha: 'abcdefghi', html_url: '#', commit: { message: 'Newer', author: { date: '2026-02-01' } } }] },
    ]);
    expect(result[0]).toMatchObject({ repository: 'two', sha: 'abcdefg', message: 'Newer' });
  });

  it('marks expired cache records as stale', () => {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: 1000, data: { profile: {} } }));
    expect(readCache(1000 + CACHE_TTL + 1).fresh).toBe(false);
  });
});
