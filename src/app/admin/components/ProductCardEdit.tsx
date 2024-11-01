"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Product from "@/types/Product";
import EditModal from "./EditModal";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const [loading, setLoading] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const discountedPrice = product.hasDiscount
        ? (product.price - (product.discount ?? 0)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
        : product.price.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    return (
        <>
            <Card shadow="sm" radius="sm" className="w-full" isPressable onPress={(e) => setIsConfirmationOpen(true)}>
                <CardBody className="overflow-visible p-0 w-full">
                    <Image
                        shadow="md"
                        radius="none"
                        width="100%"
                        alt={product.name}
                        className="w-full h-[140px] object-cover"
                        src={product.img || "https://via.placeholder.com/150"}
                    />
                    <div className="grid grid-cols-2 w-full h-full p-2">
                        <div>
                            <p className="text-sm font-bold line-clamp-3 text-accent">
                                {product.name}
                            </p>
                            <div className="flex items-center space-x-1">
                                {product.hasDiscount && (
                                    <p className="text-red line-through text-md">
                                        ${product.price.toFixed(0)}
                                    </p>
                                )}
                                <p className="text-default-800">
                                    ${discountedPrice}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardBody>
                <CardFooter className="text-small">
                    <b className="text-md line-clamp-4 text-secondary">{product.description}</b>
                </CardFooter>
            </Card>
            <EditModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                producto={product}
            />
        </>
    );
}