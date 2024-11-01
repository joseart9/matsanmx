"use client";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { addNovedades } from "@/server/actions";
import { Novedad } from "@/types/Novedades";

export default function AdminNovedades() {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [novedades, setNovedades] = useState<Novedad[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedFiles(files);

        const filePreviews = files.map((file) => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const uploadImageToImgBB = async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMG_BB_KEY}`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw new Error("Error al subir la imagen a ImgBB");
            }
        } catch (error) {
            console.error("Error al subir la imagen:", error);
            throw error;
        }
    };

    const handleUpload = async () => {
        setLoading(true);
        const novedadesList: Novedad[] = [];

        try {
            for (const file of selectedFiles) {
                const imageUrl = await uploadImageToImgBB(file);
                const novedad: Novedad = {
                    id: `nov${Date.now()}`,
                    img: imageUrl,
                };
                novedadesList.push(novedad);
            }

            await addNovedades({ novedad: novedadesList });
            setNovedades([...novedades, ...novedadesList]);
            setSelectedFiles([]);
            setPreviews([]);
        } catch (error) {
            console.error("Error al subir novedades:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="flex flex-col min-h-screen w-screen bg-primary">
            <h1 className="flex text-2xl mt-1 text-accent items-center justify-center">
                Novedades
            </h1>
            <h2 className="flex w-full text-center">
                Cada que se suban imagenes aqui, se eliminaran las anteriores y se subiran las nuevas.
            </h2>
            <div className="p-4 gap-2 flex flex-col w-full max-w-md mx-auto">
                <label htmlFor="fileInput" className="cursor-pointer text-blue-500 underline">
                    Seleccionar imágenes
                </label>
                <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    multiple
                    className="hidden"
                />
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative">
                            <img src={preview} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
                        </div>
                    ))}
                </div>
                <Button
                    onClick={handleUpload}
                    disabled={loading || selectedFiles.length === 0}
                    className={`mt-4 ${loading ? "opacity-50" : ""}`}
                    color="warning"
                >
                    {loading ? "Subiendo..." : "Guardar Novedades"}
                </Button>
            </div>
        </section>
    );
}
