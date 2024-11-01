"use client";
import { useState } from "react";
import { Input, Textarea, Checkbox, Button } from "@nextui-org/react";
import Product from "@/types/Product";
import ProductCard from "@/app/admin/components/ProductCard";
import { addProducto } from "@/server/actions"; // Asegúrate de que addProducto esté correctamente importado

export default function AdminProductos() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreviewURL, setImagePreviewURL] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function generateRandomId() {
        const randomPart = Math.floor(Math.random() * 1e8).toString(16);
        return `prod-${Date.now().toString(16)}-${randomPart}`;
    }

    const [product, setProduct] = useState<Product>({
        productId: generateRandomId(),
        name: "Nombre del Producto",
        description: "Descripción del Producto",
        price: 10,
        img: "",
        discount: 0,
        hasDiscount: false
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setImagePreviewURL(previewURL);
        }
    };

    const uploadImageToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_KEY}`, {
                method: "POST",
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw new Error("Error al subir la imagen a ImgBB");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const handleSave = async () => {
        if (!imageFile) {
            setError("Selecciona una imagen primero.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Primero sube la imagen y obtiene la URL
            const imageUrl = await uploadImageToImgBB(imageFile);

            // Actualiza el producto con el URL de la imagen
            const newProduct = { ...product, img: imageUrl };

            // Envía el producto completo a la base de datos
            await addProducto(newProduct);

            // Resetea el formulario y la imagen
            setProduct({
                productId: "",
                name: "Nombre del Producto",
                description: "Descripción del Producto",
                price: 10,
                img: "",
                discount: 0,
                hasDiscount: false
            });
            setImageFile(null);
            setImagePreviewURL(null);
        } catch (err) {
            setError("Error al guardar el producto. Inténtalo de nuevo.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: name === "price" ? parseFloat(value) : value }));
    };

    return (
        <div className="flex flex-col min-h-screen w-screen bg-primary">
            <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="fileInput"
            />
            <div className="flex w-full flex-col items-center justify-center mt-6">
                <div className="flex w-[200px]">
                    <ProductCard
                        product={{ ...product, img: imagePreviewURL || product.img }}
                        onImageClick={() => document.getElementById("fileInput")?.click()}
                    />
                </div>

                <section className="flex flex-col gap-4 p-4 w-full max-w-md">
                    <Input
                        label="Nombre"
                        name="name"
                        value={product.name}
                        onChange={handleInputChange}
                        size="lg"
                        color="warning"
                    />
                    <Textarea
                        label="Descripción"
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        minRows={3}
                        size="lg"
                        color="warning"
                    />
                    <Input
                        label="Precio"
                        name="price"
                        type="number"
                        value={product.price.toString()}
                        onChange={handleInputChange}
                        size="lg"
                        color="warning"
                    />
                    <div className="flex items-center gap-2">
                        <Checkbox checked={product.hasDiscount} onChange={() =>
                            setProduct((prev) => ({
                                ...prev,
                                hasDiscount: !prev.hasDiscount
                            }))
                        } />
                        <label className="text-accent">¿Tiene descuento?</label>
                    </div>
                    {product.hasDiscount && (
                        <Input
                            label="Descuento"
                            name="discount"
                            type="number"
                            value={(product.discount ?? 0).toString()}
                            onChange={handleInputChange}
                            size="lg"
                            color="warning"
                        />
                    )}
                    <Button
                        onClick={handleSave}
                        disabled={loading}
                        color="secondary"
                        isLoading={loading}
                    >
                        Guardar
                    </Button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </section>
            </div>
        </div>
    );
}
