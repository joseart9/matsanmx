import { useEffect, useState } from "react";
import { fetchAllProductos } from "@/server/actions";
import Product from "@/types/Product";

export function useProductos() {
  const [productos, setProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        setLoading(true);
        const fetchedProductos = await fetchAllProductos();
        setProductos(fetchedProductos);
        console.log("Productos cargados por hook:", fetchedProductos);
      } catch (err) {
        setError("Error al cargar los productos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProductos();
  }, []);

  return { productos, loading, error };
}
