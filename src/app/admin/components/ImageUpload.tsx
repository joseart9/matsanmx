import { CustomImg } from '@/types/CustomImg';
import { Button, Image } from '@nextui-org/react';

export default function ImageUpload({ images, setImages, imagesSaved, setImagesSaved }: { images: any[]; setImages: any; imagesSaved?: CustomImg[]; setImagesSaved?: any }) {
    const displayImages = imagesSaved && imagesSaved.length > 0 && imagesSaved[0] !== null ? [...imagesSaved] : imagesSaved;

    function handleUpload(index: number) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            if (e.target) {
                setTimeout(() => {
                    const newImages = Array.from((e.target as HTMLInputElement).files || []);
                    if (newImages.length > 0) {
                        setImages((prevImages: any) => {
                            const updatedImages = [...prevImages];
                            updatedImages[index] = newImages[0];
                            return updatedImages;
                        });
                        addNewUpload();
                    }
                }, 100); // Puedes ajustar el tiempo de espera según sea necesario
            }
        };
        input.click();
        input.remove(); // Esto fuerza al navegador a refrescar el input y sus eventos
        input.value = ''; // Esto asegura que el cambio sea detectado cada vez
    }

    function addNewUpload() {
        setImages((prevImages: any) => [null as any, ...prevImages]);
    }

    function handleDelete(index: any, isImgSaved?: boolean) {
        if (isImgSaved) {
            setImagesSaved((prevImages: any[]) => prevImages.filter((image) => image.id !== index));
        } else {
            setImages((prevImages: any[]) => prevImages.filter((_: any, i: number) => i !== index));
        }
    }

    if (imagesSaved) {
        return (
            <div className="flex flex-row md:flex-wrap min-w-full overflow-x-auto gap-5 md:gap-5 md:space-x-0 p-2 pr-5">
                {images.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0 items-center">
                        {image ? (
                            <Image
                                className="object-cover w-[200px] h-[200px]"
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                            />
                        ) : (
                            <Button
                                onPress={() => handleUpload(index)}
                                color='primary'
                                variant='solid'
                                className="w-[200px] h-[200px] flex items-center justify-center border-3 border-accent border-dashed"
                            >
                                <p className="flex flex-col items-center space-y-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="text-accent w-6 h-6"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <span className="text-accent">Subir Imagen</span>
                                </p>
                            </Button>
                        )}
                        {image && (
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute z-50 -top-2 -right-3 font-bold bg-[#fc0303] text-white rounded-full p-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 p-[2px] text-[#fff]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
                {displayImages?.map((image, index) => (
                    <div key={index} className="relative flex-shrink-0 items-center">
                        {image &&
                            <Image
                                className="object-cover w-[200px] h-[200px]"
                                src={image.img}
                                alt={`Preview ${index + 1}`}
                            />}
                        {image && (
                            <button
                                onClick={() => handleDelete(image.id, true)}
                                className="absolute z-50 -top-2 -right-3 font-bold bg-[#fc0303] text-white rounded-full p-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 p-[2px] text-[#fff]"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-row md:flex-wrap min-w-full overflow-x-auto space-x-4 md:gap-5 md:space-x-0 p-2">
            {images.map((image, index) => (
                <div key={index} className="relative flex-shrink-0 items-center">
                    {image ? (
                        <img
                            className="object-cover w-[200px] h-[200px]"
                            src={URL.createObjectURL(image)}
                            alt={`Preview ${index + 1}`}
                        />
                    ) : (
                        <Button
                            onPress={() => handleUpload(index)}
                            className="w-[200px] h-[200px] bg-gray-100 flex items-center justify-center border-3 border-gray-300 border-dashed"
                        >
                            <p className="flex flex-col items-center space-y-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="text-primary w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <span className="text-primary">Subir Imagen</span>
                            </p>
                        </Button>
                    )}
                    {image && (
                        <button
                            onClick={() => handleDelete(index)}
                            className="absolute -top-2 -right-3 font-bold bg-red-500 text-white rounded-full p-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 p-[2px]"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}