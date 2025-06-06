import { useEffect, useState, useRef } from "react";
import { get } from "../util/api";
import toast from "react-hot-toast";

export function useFetchOnceADay<T = unknown>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchData = async () => {
      const now = Date.now();
      const timeKey = `fetch_timestamp:${endpoint}`;
      const dataKey = `fetch_data:${endpoint}`;

      const lastFetch = localStorage.getItem(timeKey);
      const cachedData = localStorage.getItem(dataKey);

      const within24h =
        lastFetch && now - parseInt(lastFetch) < 24 * 60 * 60 * 1000;

      if (within24h && cachedData) {
        console.log("Usando dados do cache localStorage 📦");
        setData(JSON.parse(cachedData));
        setLoading(false);
        return;
      }

      try {
        const res = await get(endpoint);

        if (res.status === 304) {
          toast.success("Conteúdo não modificado (304 - cache validado)");
          if (cachedData) {
            setData(JSON.parse(cachedData));
          }
        } else {
          setData(res.data.data);
          localStorage.setItem(dataKey, JSON.stringify(res.data.data));
        }

        localStorage.setItem(timeKey, now.toString());
      } catch (err) {
        toast.error("Erro ao buscar dados.");
        console.error(err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { data, loading, error };
}
