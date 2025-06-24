import { useCallback, useState } from "react";

export default function useFetch<T, V>(fetchFunction: (...args: T[]) => Promise<V>) {
    const [data, setData] = useState<V | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = useCallback(async (...args: T[]) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(...args);
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(String(err)));
        } finally {
            setLoading(false);
        }
    }, [fetchFunction]);

    const reset = useCallback(() => {
        setData(undefined);
        setLoading(false);
        setError(null);
    }, []);

    return {
        data,
        loading,
        error,
        fetchData,
        reset
    };
}