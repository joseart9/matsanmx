import React from "react";
import { Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    pedidoId: string;
}

export default function ConfirmationModal({ isOpen, onClose, pedidoId }: ConfirmationModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            placement="bottom-center"
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            hideCloseButton
            isDismissable={false}
            className="bg-[#FFF9F0]"
        >
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">
                    </ModalHeader>
                    <ModalBody>
                        <img src="./confirmation.svg" alt="Pedido confirmado" className="w-1/2 mx-auto" />

                        <p className="flex items-center justify-center w-full text-center text-accent">¡Gracias! Tu pedido ha sido procesado correctamente.</p>

                        <Divider />

                        <p className="flex items-center justify-center w-full text-center text-accent">
                            Tu número de pedido es: {pedidoId}
                        </p>

                        <p className="flex font-bold items-center justify-center w-full text-center text-accent">
                            No olvides guardar este número para futuras referencias.
                        </p>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onPress={onClose}>
                            Regresar
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}
