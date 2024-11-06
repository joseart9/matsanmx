"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import { Novedad } from '@/types/Novedades';

export default function NovedadesCaroussel({ productsTendencia }: { productsTendencia: Novedad[] }) {
    return (
        <div className="w-full h-full">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay]}
                className="w-full h-full rounded-md"
            >
                {productsTendencia.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="h-52 w-full rounded-md object-cover"
                            src={product.img}
                            alt={`Novedad ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
