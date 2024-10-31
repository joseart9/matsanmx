import { Cart } from "./Cart";

interface Pedidos {
  id: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  calle?: string;
  colonia?: string;
  numero?: string;
  cp?: string;
  telefono?: string;
  carrito?: Cart;
}
