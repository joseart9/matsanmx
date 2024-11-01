import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Checkbox } from "@nextui-org/react";
import Product from "@/types/Product";
import { updateProducto } from "@/server/actions";

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
                    <ModalFooter>
                        <Button color="primary" variant="flat" onPress={onClose} disabled={loading}>
                            Cancelar
                        </Button>
                        <Button color="secondary" onPress={handleSave} isLoading={loading}>
                            Guardar
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}