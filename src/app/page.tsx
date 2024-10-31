import ProductCard from "@/app/components/ProductCard";
import Product from "@/types/Product";
import NovedadesCaroussel from "@/app/components/NovedadesCaroussel";
import Navbar from '@/app/components/Navbar'

export default function Home() {
  const products = [
    {
      productId: "1",
      name: "Orange",
      description: "Fresh orange",
      img: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
      price: 350,
      discount: 100,
      hasDiscount: true,
    },
    {
      productId: "2",
      name: "Apple",
      description: "Fresh Apple",
      img: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
      price: 1000,
      discount: 0,
      hasDiscount: false,
    },
  ];

  const productsTendencia = [
    {
      img: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
    {
      img: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI",
    },
  ]
  return (
    <main className="flex min-h-screen w-screen flex-col items-center p-2 bg-slate-100">
      <Navbar />
      <section className="flex flex-col w-full h-full">
        <h1 className="text-xl text-center font-bold p-1">Novedades</h1>
        <NovedadesCaroussel productsTendencia={productsTendencia} />
      </section>
      <section className="flex flex-col w-full h-full">
        <h1 className="text-xl text-center font-bold p-4">Productos</h1>
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 w-full">
          {products.map((product, index) => (
            <ProductCard key={index} product={product as Product} />
          ))}
        </div>
      </section>
    </main>
  )
}
