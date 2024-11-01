import { useEffect, useState } from "react";
import { fetchAllPedidos } from "@/server/actions";
import { Pedido } from "@/types/Pedido";

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedidos = async () => {
      try {
        setLoading(true);
        const fetchedPedidos = await fetchAllPedidos();
        setPedidos(fetchedPedidos);
      } catch (err) {
        setError("Error al cargar los pedidos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadPedidos();
  }, []);

  return { pedidos, loading, error };
}
