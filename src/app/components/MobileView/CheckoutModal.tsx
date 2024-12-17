"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/providers/CartContext";
import ConfirmationModal from "../ConfirmationModal";
import { addPedido } from "@/server/actions";
import { Cart } from "@/types/Cart";
import { updateStockFromCart } from "@/server/actions";

import { IoClose } from "react-icons/io5";


export default function CheckoutModal({ modalIsOpen, setIsOpen }: any) {
    const [confirmationNumber, setConfirmationNumber] = useState("");

    const envioOptions = [
        {
            label: "Recoger en Tienda",
            key: "tienda"
        },
        {
            label: "Recoger en Área Médica",
            key: "universidad"
        }
    ];

    let scrollPosition = 0;

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
        event.preventDefault();
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
            closeModal(); // Cierra el modal de confirmación de pedido
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
        const pedidoToSave = { id: customId, ...formData, carrito };
    };

    useEffect(() => {
        Modal.setAppElement("body");
    }, []);

    useEffect(() => {
        if (modalIsOpen) {
            scrollPosition = window.scrollY;

            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollPosition);
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            window.scrollTo(0, scrollPosition);
        };
    }, [modalIsOpen]);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
        },
        content: {
            inset: "auto",
            border: "none",
            background: "none",
        },
    };

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <AnimatePresence>
                {modalIsOpen && (
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Animated Modal"
                        className={{
                            base: " w-full outline-none z-50 h-dvh",
                            afterOpen: "",
                            beforeClose: "",
                        }}
                    >
                        {/* Main Content */}
                        <motion.div
                            initial={{ y: "100dvh", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100dvh", opacity: 0 }} // Agrega la animación de salida
                            transition={{ duration: 1, ease: "anticipate" }}
                            className="md:max-w-md md:absolute md:right-0 w-full bg-[#FFF9F0] h-full outline-none overflow-y-auto mt-[62px] pb-16"
                        >
                            <div className="p-8 relative">
                                <Button
                                    isIconOnly
                                    color="warning"
                                    variant="light"
                                    onPress={closeModal}
                                    className="absolute top-2 right-4 text-gray-600 hover:text-gray-900"
                                >
                                    <IoClose className="size-7 text-secondary" />
                                </Button>


                                <form onSubmit={onSave} className="flex flex-col space-y-2">
                                    <h1 className="text-secondary p-4">Datos personales</h1>
                                    <Input
                                        variant="bordered"
                                        color="warning"
                                        name="primerNombre"
                                        label="Nombre"
                                        isRequired
                                        required
                                        value={formData.primerNombre}
                                        onChange={handleInputChange}
                                        size="lg"
                                        classNames={{
                                            inputWrapper: [
                                                "border-primary",
                                                "hover:border-primary",
                                                "focus:border-primary"
                                            ]
                                        }}
                                    />
                                    <Input
                                        variant="bordered"
                                        color="warning"
                                        name="segundoNombre"
                                        label="Segundo Nombre"
                                        value={formData.segundoNombre}
                                        onChange={handleInputChange}
                                        size="lg"
                                        classNames={{
                                            inputWrapper: [
                                                "border-primary",
                                                "hover:border-primary",
                                                "focus:border-primary"
                                            ]
                                        }}
                                    />
                                    <Input
                                        variant="bordered"
                                        color="warning"
                                        name="primerApellido"
                                        label="Apellido Paterno"
                                        isRequired
                                        value={formData.primerApellido}
                                        onChange={handleInputChange}
                                        size="lg"
                                        required
                                        classNames={{
                                            inputWrapper: [
                                                "border-primary",
                                                "hover:border-primary",
                                                "focus:border-primary"
                                            ]
                                        }}
                                    />
                                    <Input
                                        variant="bordered"
                                        color="warning"
                                        name="segundoApellido"
                                        label="Apellido Materno"
                                        isRequired
                                        value={formData.segundoApellido}
                                        onChange={handleInputChange}
                                        size="lg"
                                        required
                                        classNames={{
                                            inputWrapper: [
                                                "border-primary",
                                                "hover:border-primary",
                                                "focus:border-primary"
                                            ]
                                        }}
                                    />
                                    <Input
                                        variant="bordered"
                                        color="warning"
                                        name="telefono"
                                        label="Teléfono"
                                        isRequired
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        size="lg"
                                        required
                                        classNames={{
                                            inputWrapper: [
                                                "border-primary",
                                                "hover:border-primary",
                                                "focus:border-primary"
                                            ]
                                        }}
                                    />
                                    <h1 className="text-secondary p-4">Entrega</h1>
                                    <Select
                                        label="Tipo de entrega"
                                        variant="bordered"
                                        isRequired
                                        color="warning"
                                        size="lg"
                                        selectedKeys={[formData.envio]}
                                        onSelectionChange={(keys) => {
                                            const selectedKey = Array.from(keys)[0] as string;
                                            setFormData({ ...formData, envio: selectedKey });
                                        }}
                                        required
                                        classNames={{
                                            listboxWrapper: [
                                                "border-primary",
                                                "hover:border-primary",
                                                "focus:border-primary"
                                            ],
                                        }}
                                    >
                                        {envioOptions.map((option) => (
                                            <SelectItem key={option.key}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                    <div className="flex flex-row justify-between w-full pt-4">
                                        <Button radius="full" color="primary" variant="flat" onPress={closeModal} className="text-secondary font-semibold">
                                            Cancelar
                                        </Button>
                                        <Button className="font-semibold text-accent/80" radius="full" color="secondary" type="submit" onPress={onSave} isLoading={loading}>
                                            Continuar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </Modal>
                )}
            </AnimatePresence>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                pedidoId={confirmationNumber}
            />
        </>
    );
}
