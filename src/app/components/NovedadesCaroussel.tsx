"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
// import Swiper from 'swiper/bundle';
import { Autoplay } from 'swiper/modules';
import { ProductsTendencia } from '@/types/ProductsTendencia';
import { Novedad } from '@/types/Novedades';

export default function NovedadesCaroussel({ productsTendencia }: { productsTendencia: Novedad[] }) {
    console.log("Novedades:", productsTendencia);
    return (
        <div className="w-full h-full">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="w-full rounded-md object-cover"
            >
                {productsTendencia.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="h-52 w-[400px] rounded-md"
                            src={product.img}
                            alt={`Novedad ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
