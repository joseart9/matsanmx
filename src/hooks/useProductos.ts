import { useEffect, useState, useCallback } from "react";
import { fetchAllProductos } from "@/server/actions";
import Product from "@/types/Product";

export function useProductos() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProductos = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedProductos = await fetchAllProductos();
      setProductos(fetchedProductos);
    } catch (err) {
      setError("Error al cargar los productos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Ejecuta loadProductos cuando se monta el hook
  useEffect(() => {
    loadProductos();
  }, [loadProductos]);

  // Devuelve productos, estado de carga, error y la función refetch
  return { productos, loading, error, refetch: loadProductos };
}
