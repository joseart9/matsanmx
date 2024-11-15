"use client";
import { useState, useEffect } from "react";
import { Button, Spinner } from "@nextui-org/react";
import { addNovedades } from "@/server/actions";
import { Novedad, Novedades } from "@/types/Novedades";
import ImageUpload from "@/app/admin/components/ImageUpload";
import { useNovedades } from "@/hooks/useNovedades";
import { CustomImg } from "@/types/CustomImg";
import { uploadImageToImgBB } from "@/utils/UploadImgToDb";

export default function AdminNovedades() {
    const [loading, setLoading] = useState(false);
    const { novedades, loading: loadingNovedades, error: errorNovedades } = useNovedades();
    const [images, setImages] = useState<File[]>([null as any]);
    const [imagesSaved, setImagesSaved] = useState<CustomImg[]>([]);
    const [novedadesToSave, setNovedadesToSave] = useState<Novedad[]>([])

    useEffect(() => {
        setImagesSaved(novedades);
    }, [novedades]);

    const handleUpload = async () => {
        const uploadedImages = await Promise.all(
            images.map(async (image) => {
                if (image !== null) {
                    const imgData = await uploadImageToImgBB(image);
                    return { id: imgData.id, img: imgData.img } as CustomImg;
                }
                return null;
            })
        );

        // Filtrar imágenes válidas
        const validImages = uploadedImages.filter((img) => img !== null) as CustomImg[];
        if (images) {
            validImages.push(...imagesSaved);
        }

        // Crea un objeto con las novedades a guardar en la db usando las imagenes
        // ya guardadas y las nuevas
        setNovedadesToSave(validImages);

        try {
            setLoading(true);
            await addNovedades({ novedad: validImages as unknown as Novedad[] });
            setLoading(false);
        } catch (error) {
            console.error("Error al subir las novedades:", error);
            setLoading(false);
        }

    };

    console.log(novedadesToSave);

    if (loadingNovedades) return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Spinner color="warning" size="lg" aria-label="Loading..." />
        </div>
    );

    return (
        <section className="flex flex-col min-h-screen overflow-auto overflow-y-hidden w-full bg-primary">
            <h1 className="flex text-2xl mt-1 text-accent items-center justify-center">
                Novedades
            </h1>
            <ImageUpload images={images} setImages={setImages} imagesSaved={imagesSaved} setImagesSaved={setImagesSaved} />
            <div className="overflow-y-hidden pt-5 w-full flex justify-end pr-5">
                <Button className="text-primary" color="warning" onPress={handleUpload} isLoading={loading}>
                    Guardar
                </Button>
            </div>
        </section>
    );
}
