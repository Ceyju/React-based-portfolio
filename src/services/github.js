import { fallbackGitHub, featuredRepositories } from '../data/portfolio';

export const CACHE_KEY = 'km-github-dashboard-v1';
export const CACHE_TTL = 60 * 60 * 1000;
const API_ROOT = 'https://api.github.com';
const API_HEADERS = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

export function aggregateLanguages(languageMaps) {
  const totals = languageMaps.reduce((all, current) => {
    Object.entries(current || {}).forEach(([name, bytes]) => {
      all[name] = (all[name] || 0) + bytes;
    });
    return all;
  }, {});

  return Object.entries(totals)
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes);
}

export function normalizeCommits(results) {
  return results
    .flatMap(({ repository, commits }) =>
      commits.map((commit) => ({
        repository,
        sha: commit.sha.slice(0, 7),
        message: commit.commit.message.split('\n')[0],
        date: commit.commit.author?.date || commit.commit.committer?.date,
        url: commit.html_url,
      })),
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 8);
}

export function normalizePushes(events) {
  return events
    .filter((event) => event.type === 'PushEvent' && featuredRepositories.includes(event.repo.name.split('/')[1]))
    .map((event) => ({
      id: event.id,
      repository: event.repo.name.split('/')[1],
      date: event.created_at,
      count: event.payload.size || event.payload.commits?.length || 0,
      ref: event.payload.ref?.replace('refs/heads/', '') || 'default',
    }))
    .slice(0, 6);
}

export function readCache(now = Date.now()) {
  try {
    const cached = JSON.parse(window.localStorage.getItem(CACHE_KEY));
    if (!cached?.timestamp || !cached?.data) return null;
    return { ...cached, fresh: now - cached.timestamp < CACHE_TTL };
  } catch {
    return null;
  }
}

export function writeCache(data, now = Date.now()) {
  window.localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: now }));
}

async function request(path, signal) {
  const response = await fetch(`${API_ROOT}${path}`, { headers: API_HEADERS, signal });
  if (!response.ok) {
    const error = new Error(`GitHub request failed: ${response.status}`);
    error.status = response.status;
    error.rateLimited = response.status === 403 || response.status === 429;
    throw error;
  }
  return response.json();
}

async function mapWithConcurrency(items, limit, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await worker(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
  return results;
}

export async function fetchGitHubDashboard({ signal } = {}) {
  const cached = readCache();
  if (cached?.fresh) return { ...cached.data, source: 'cache' };

  try {
    const [profile, repositories, events] = await Promise.all([
      request('/users/Ceyju', signal),
      request('/users/Ceyju/repos?per_page=100&sort=pushed', signal),
      request('/users/Ceyju/events/public?per_page=30', signal),
    ]);

    const publicFeatured = featuredRepositories.filter((name) =>
      repositories.some((repo) => repo.name === name && !repo.fork && !repo.archived),
    );
    const details = await mapWithConcurrency(publicFeatured, 2, async (repository) => {
      const [languages, commits] = await Promise.all([
        request(`/repos/Ceyju/${repository}/languages`, signal),
        request(`/repos/Ceyju/${repository}/commits?per_page=3`, signal),
      ]);
      return { repository, languages, commits };
    });

    const data = {
      profile,
      languages: aggregateLanguages(details.map((entry) => entry.languages)),
      commits: normalizeCommits(details),
      pushes: normalizePushes(events),
    };
    writeCache(data);
    return { ...data, source: 'live' };
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    if (cached?.data) return { ...cached.data, source: 'stale', error };
    return { ...fallbackGitHub, source: 'fallback', error };
  }
}
