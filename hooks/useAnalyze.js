import { useState, useRef, useCallback } from 'react';
import { analyzeUrl } from '../client/api';

export function useAnalyze() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const analyze = useCallback(async (url) => {
    if (!url) {
      setError(new Error('No URL provided'));
      return null;
    }
    if (loading) return null; // avoid duplicate
    setLoading(true);
    setError(null);
    controllerRef.current = new AbortController();
    try {
      const res = await analyzeUrl(url, { signal: controllerRef.current.signal });
      setData(res);
      setLoading(false);
      return res;
    } catch (err) {
      setError(err);
      setLoading(false);
      return null;
    }
  }, [loading]);

  const cancel = useCallback(() => {
    if (controllerRef.current) controllerRef.current.abort();
    setLoading(false);
  }, []);

  return { data, loading, error, analyze, cancel, setData };
}
