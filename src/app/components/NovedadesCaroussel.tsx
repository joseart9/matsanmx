"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Novedad } from '@/types/Novedades';

export default function NovedadesCaroussel({ productsTendencia }: { productsTendencia: Novedad[] }) {
    return (
        <div className="w-full h-full">
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay, Pagination]}
                pagination={{ clickable: true, dynamicBullets: true }}
                className="w-full h-full rounded-sm custom-swiper"
            >
                {productsTendencia.map((product, index) => (
                    <SwiperSlide key={index}>
                        <img
                            className="h-60 w-full object-cover rounded-sm object-center lg:h-full"
                            src={product.img}
                            alt={`Novedad ${index + 1}`}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
