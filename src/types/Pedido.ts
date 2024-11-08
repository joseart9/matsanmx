import { Cart } from "./Cart";

export interface Pedido {
  id: string;
  primerNombre?: string;
  segundoNombre?: string;
  primerApellido?: string;
  segundoApellido?: string;
  calle?: string;
  colonia?: string;
  estado?: string;
  ciudad?: string;
  numero?: string;
  cp?: string;
  telefono?: string;
  carrito?: Cart;
  finalizado?: boolean;
  envio?: string;
}
