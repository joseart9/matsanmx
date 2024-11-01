"use server";

import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import db from "@/db";
import { Cart } from "@/types/Cart";
import { Pedido } from "@/types/Pedido";
import Product from "@/types/Product";

const firestore = getFirestore(db);

export async function addPedido(pedido: Pedido) {
  try {
    // Referencia a la colección "pedidos"
    const pedidosCollection = collection(firestore, "pedidos");

    // Agrega el documento a Firestore
    const docRef = await addDoc(pedidosCollection, pedido);

    console.log("Pedido agregado con ID:", docRef.id);
    return docRef.id; // Devuelve el ID del documento agregado si es necesario
  } catch (error) {
    console.error("Error al agregar el pedido:", error);
  }
}

export async function addProducto(producto: Product) {
  try {
    // Referencia a la colección "productos"
    const productosCollection = collection(firestore, "productos");

    // Agrega el documento a Firestore
    const docRef = await addDoc(productosCollection, producto);

    console.log("Producto agregado con ID:", docRef.id);
    return docRef.id; // Devuelve el ID del documento agregado si es necesario
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function fetchAllProductos(): Promise<Product[]> {
  try {
    // Referencia a la colección "productos"
    const productosCollection = collection(firestore, "productos");

    // Obtén todos los documentos de la colección
    const querySnapshot = await getDocs(productosCollection);

    console.log("Cantidad de documentos obtenidos:", querySnapshot.size);

    // Mapea los documentos a objetos de tipo Product
    const productos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Product[];

    console.log("Productos obtenidos:", productos);
    return productos;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function fetchAllPedidos(): Promise<Pedido[]> {
  try {
    // Referencia a la colección "pedidos"
    const pedidosCollection = collection(firestore, "pedidos");

    // Obtén todos los documentos de la colección
    const querySnapshot = await getDocs(pedidosCollection);

    // Mapea los documentos a objetos de tipo Pedido
    const pedidos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Pedido[];

    console.log("Pedidos obtenidos:", pedidos);
    return pedidos;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}
