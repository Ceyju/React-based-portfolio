import { useEffect, useState } from 'react';
import { fallbackGitHub } from '../data/portfolio';
import { fetchGitHubDashboard } from '../services/github';

export function useGitHubData() {
  const [state, setState] = useState({ data: fallbackGitHub, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    fetchGitHubDashboard({ signal: controller.signal })
      .then((data) => setState({ data, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: { ...fallbackGitHub, source: 'fallback' }, loading: false });
      });
    return () => controller.abort();
  }, []);

  return state;
}
