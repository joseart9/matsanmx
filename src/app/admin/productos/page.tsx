"use client";

import { useState } from "react";
import { useProductos } from "@/hooks/useProductos";
import ProductCardEdit from "@/app/admin/components/ProductCardEdit";
import EditModal from "@/app/admin/components/EditModal";
import { CircularProgress } from "@nextui-org/react";
import Product from "@/types/Product";

export default function AdminProductos() {
    const { productos, loading, error, refetch } = useProductos();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    if (loading) return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <CircularProgress color="warning" size="lg" aria-label="Loading..." />
        </div>
    );

    const handleOpenEditModal = (producto: Product) => {
        setSelectedProduct(producto);
    };

    const handleCloseEditModal = () => {
        setSelectedProduct(null);
        refetch(); // Actualiza los productos al cerrar el modal
    };

    return (
        <section className="flex flex-col min-h-screen w-screen bg-primary">
            <h1 className="flex text-2xl mt-1 text-accent items-center justify-center">
                Productos
            </h1>
            <div className="p-2 gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 w-full">
                {productos.map((producto) => (
                    <ProductCardEdit
                        key={producto.productId}
                        product={producto}

                        refetch={refetch}
                    />
                ))}
            </div>

            {/* Modal para editar producto */}
            {selectedProduct && (
                <EditModal
                    isOpen={!!selectedProduct}
                    onClose={handleCloseEditModal}
                    producto={selectedProduct}
                    refetch={refetch}
                />
            )}
        </section>
    );
}
