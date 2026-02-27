import { useState, useEffect, useCallback } from 'react';
type AsyncFn<T> = (...args: any[]) => Promise<T>;
export function useAsync<T>(asyncFn: AsyncFn<T>, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState<string | null>(null);
  const execute = useCallback(async (...args: any[]) => {
    setLoading(true); setError(null);
    try { const result = await asyncFn(...args); setData(result); return result; }
    catch (err: any) { setError(err.response?.data?.error || err.message || 'Erro desconhecido'); return null; }
    finally { setLoading(false); }
  }, [asyncFn]);
  useEffect(() => { if (immediate) execute(); }, []);
  return { data, loading, error, execute };
}
