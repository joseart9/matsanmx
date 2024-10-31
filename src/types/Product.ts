export default interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  img?: string;
  discount?: number;
  hasDiscount?: boolean;
}
