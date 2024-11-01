import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox } from "@nextui-org/react";
import Product from "@/types/Product";
import { updateProducto, deleteProducto } from "@/server/actions";


interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    producto: Product;
    refetch: () => void;
}

export default function EditModal({ isOpen, onClose, producto, refetch }: EditModalProps) {
    const [editedProduct, setEditedProduct] = useState<Product>(producto);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedProduct((prev) => ({
            ...prev,
            [name]: name === "price" || name === "discount" ? parseFloat(value) : value,
        }));
    };

    const handleCheckboxChange = () => {
        setEditedProduct((prev) => ({
            ...prev,
            hasDiscount: !prev.hasDiscount,
            discount: !prev.hasDiscount ? prev.discount : 0, // Si se desactiva, setea el descuento a 0
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateProducto(editedProduct);
            refetch(); // Llama a refetch después de guardar el producto
            onClose();
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        } finally {
            setLoading(false);
        }
    };

    async function handleDeleteProduct(e: any): Promise<void> {
        setLoading(true);
        try {
            await deleteProducto(producto);
            refetch();
            onClose();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            hideCloseButton
            isDismissable={false}
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">
                    </ModalHeader>
                    <ModalBody>
                        <form className="flex flex-col gap-4">
                            <Input
                                label="ID del Producto"
                                value={editedProduct.productId}
                                name="productId"
                                disabled
                                size="lg"
                                color="warning"
                            />
                            <Input
                                label="Nombre"
                                name="name"
                                value={editedProduct.name}
                                onChange={handleInputChange}
                                size="lg"
                                color="warning"
                            />
                            <Input
                                label="Descripción"
                                name="description"
                                value={editedProduct.description}
                                onChange={handleInputChange}
                                size="lg"
                                color="warning"
                            />
                            <Input
                                label="Precio"
                                type="number"
                                name="price"
                                value={editedProduct.price.toString()}
                                onChange={handleInputChange}
                                size="lg"
                                color="warning"
                            />
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    isSelected={editedProduct.hasDiscount}
                                    onChange={handleCheckboxChange}
                                />
                                <label>¿Tiene descuento?</label>
                            </div>
                            {editedProduct.hasDiscount && (
                                <Input
                                    label="Descuento"
                                    type="number"
                                    name="discount"
                                    value={(editedProduct.discount ?? 0).toString()}
                                    onChange={handleInputChange}
                                    size="lg"
                                    color="warning"
                                />
                            )}
                        </form>
                    </ModalBody>
                    <ModalFooter className="flex w-full flex-row justify-between items-center">
                        <Button onPress={handleDeleteProduct} color="danger" isIconOnly className="bg-transparent rounded-full text-red">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </Button>
                        <div className="flex flex-row space-x-3">
                            <Button color="primary" variant="flat" onPress={onClose} disabled={loading}>
                                Cancelar
                            </Button>
                            <Button color="secondary" onPress={handleSave} isLoading={loading}>
                                Guardar
                            </Button>
                        </div>

                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
