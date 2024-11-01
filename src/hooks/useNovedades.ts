import { useEffect, useState } from "react";
import { fetchAllNovedades } from "@/server/actions";
import { Novedad } from "@/types/Novedades";

export function useNovedades() {
  const [novedades, setNovedades] = useState<Novedad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = async () => {
    try {
      setLoading(true);
      const fetchedNovedades = await fetchAllNovedades();
      setNovedades(fetchedNovedades);
    } catch (err) {
      setError("Error al cargar las novedades.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  return { novedades, loading, error, refetch };
}
