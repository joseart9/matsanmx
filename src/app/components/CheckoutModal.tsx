"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { addPedido } from "@/server/actions";
import { useCart } from "@/providers/CartContext";
import { Cart } from "@/types/Cart";
import ConfirmationModal from "@/app/components/ConfirmationModal";
import { updateStockFromCart } from "@/server/actions";

export default function CheckOutModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const modalBodyRef = useRef<HTMLDivElement>(null);
    const [confirmationNumber, setConfirmationNumber] = useState("");

    const envioOptions = [
        {
            label: "Recoger en Tienda",
            key: "tienda"
        },
        {
            label: "Recoger en Facultad de Medicina",
            key: "universidad"
        }
    ];

    // Desplazamiento suave al hacer foco en un input
    useEffect(() => {
        if (isOpen && modalBodyRef.current) {
            const inputs = modalBodyRef.current.querySelectorAll("input, textarea, select");

            inputs.forEach((input) => {
                input.addEventListener("focus", () => {
                    // Espera a que el teclado se abra y centra el input en pantalla
                    setTimeout(() => {
                        input.scrollIntoView({
                            behavior: "auto",
                            block: "center",
                            inline: "center",

                        });
                    }, 100);
                });
            });

            // Limpia los listeners al cerrar el modal
            return () => {
                inputs.forEach((input) => input.removeEventListener("focus", () => { }));
            };
        }
    }, [isOpen]);

    const { cart, clearCart } = useCart();
    const [formData, setFormData] = useState({
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        telefono: "",
        calle: "",
        numero: "",
        colonia: "",
        estado: "",
        ciudad: "",
        cp: "",
        finalizado: false,
        envio: ""
    });
    const [loading, setLoading] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

    function generateCustomId() {
        const randomPart = Math.floor(Math.random() * 1e10).toString().padStart(10, '0');
        return `ms0${randomPart}`;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSave = async (event: any) => {
        const customId = generateCustomId();
        setLoading(true);

        const carrito: Cart = {
            items: cart.map((item) => ({
                product: item.product,
                quantity: item.quantity
            })),
        };

        try {
            setConfirmationNumber(customId);
            const pedidoToSave = { id: customId, ...formData, carrito };
            await addPedido(pedidoToSave);

            // Quitar stock de los productos en el carrito

            await updateStockFromCart(carrito);

            clearCart(); // Limpia el carrito después de confirmar
            onClose(); // Cierra el modal de confirmación de pedido
            setIsConfirmationOpen(true); // Abre el modal de confirmación

            setFormData({
                primerNombre: "",
                segundoNombre: "",
                primerApellido: "",
                segundoApellido: "",
                telefono: "",
                calle: "",
                numero: "",
                colonia: "",
                estado: "",
                ciudad: "",
                cp: "",
                finalizado: false,
                envio: ""
            });
        } catch (error) {
            console.error("Error al enviar el pedido:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                placement="bottom-center"
                onOpenChange={(open) => {
                    if (!open) onClose();
                }}
                scrollBehavior="inside"
                isDismissable={false}
                size="sm"
                hideCloseButton
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        <h1 className="text-secondary font-bold">Confirmar Pedido</h1>
                    </ModalHeader>
                    <ModalBody>
                        <div ref={modalBodyRef}>


                            <form onSubmit={onSave} className="flex flex-col space-y-2">
                                <h1 className="text-secondary p-4">Datos personales</h1>
                                <Input
                                    variant="bordered"
                                    color="warning"
                                    name="primerNombre"
                                    label="Nombre"
                                    value={formData.primerNombre}
                                    onChange={handleInputChange}
                                    size="lg"
                                />
                                <Input
                                    variant="bordered"
                                    color="warning"
                                    name="segundoNombre"
                                    label="Segundo Nombre"
                                    value={formData.segundoNombre}
                                    onChange={handleInputChange}
                                    size="lg"
                                />
                                <Input
                                    variant="bordered"
                                    color="warning"
                                    name="primerApellido"
                                    label="Apellido Paterno"
                                    value={formData.primerApellido}
                                    onChange={handleInputChange}
                                    size="lg"
                                />
                                <Input
                                    variant="bordered"
                                    color="warning"
                                    name="segundoApellido"
                                    label="Apellido Materno"
                                    value={formData.segundoApellido}
                                    onChange={handleInputChange}
                                    size="lg"
                                />
                                <Input
                                    variant="bordered"
                                    color="warning"
                                    name="telefono"
                                    label="Telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    size="lg"
                                />
                                <h1 className="text-secondary p-4">Envío</h1>
                                <Select
                                    label="Selecciona el tipo de envio"
                                    variant="bordered"
                                    color="warning"
                                    selectedKeys={[formData.envio]}
                                    onChange={(e) => setFormData({ ...formData, envio: (e.target as HTMLSelectElement).value })}
                                >
                                    {envioOptions.map((option) => (
                                        <SelectItem key={option.key}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="flat" onPress={onClose} className="text-secondary">
                            Cancelar
                        </Button>
                        <Button color="secondary" type="submit" onPress={onSave} isLoading={loading} className="text-accent">
                            Continuar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                pedidoId={confirmationNumber}
            />
        </>
    );
}
