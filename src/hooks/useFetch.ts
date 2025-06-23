import { useState } from "react";

export default function useFetch<T,V>(fetchFunction: (...args: T[]) => Promise<V>){
    const [data, setData] = useState<V>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (...args: T[]) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchFunction(...args);
            setData(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(undefined);
        setLoading(false);
        setError(null);
    };

    return {
        data,
        loading,
        error,
        fetchData,
        reset
    };
}