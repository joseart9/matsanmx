"use server";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import db from "@/db";
import { Cart } from "@/types/Cart";
import { Pedido } from "@/types/Pedido";
import Product from "@/types/Product";
import { Novedad, Novedades } from "@/types/Novedades";

const firestore = getFirestore(db);

export async function addPedido(pedido: Pedido) {
  try {
    // Referencia a la colección "pedidos"
    const pedidosCollection = collection(firestore, "pedidos");

    // Agrega el documento a Firestore
    const docRef = await addDoc(pedidosCollection, pedido);

    return docRef.id; // Devuelve el ID del documento agregado si es necesario
  } catch (error) {}
}

export async function addProducto(producto: Product) {
  try {
    // Referencia a la colección "productos"
    const productosCollection = collection(firestore, "productos");

    // Agrega el documento a Firestore
    const docRef = await addDoc(productosCollection, producto);

    return docRef.id; // Devuelve el ID del documento agregado si es necesario
  } catch (error) {
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function fetchAllProductos(): Promise<Product[]> {
  try {
    // Referencia a la colección "productos"
    const productosCollection = collection(firestore, "productos");

    // Obtén todos los documentos de la colección
    const querySnapshot = await getDocs(productosCollection);

    // Mapea los documentos a objetos de tipo Product
    const productos = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as Product[];

    return productos;
  } catch (error) {
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

    return pedidos;
  } catch (error) {
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function updateProducto(producto: Product) {
  try {
    // Referencia a la colección "productos"
    const productosCollection = collection(firestore, "productos");

    // Busca el producto por productId en la colección
    const productQuery = query(
      productosCollection,
      where("productId", "==", producto.productId)
    );
    const querySnapshot = await getDocs(productQuery);

    if (!querySnapshot.empty) {
      // Obtén el primer documento que coincida con el productId
      const productDoc = querySnapshot.docs[0];

      // Sobreescribe el documento con los nuevos datos de producto
      await setDoc(doc(firestore, "productos", productDoc.id), producto);
    } else {
      console.error(`Producto con ID ${producto.productId} no encontrado.`);
      throw new Error("Producto no encontrado en la base de datos.");
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function addNovedades(novedades: Novedades) {
  try {
    const novedadesCollection = collection(firestore, "novedades");

    // Elimina todos los documentos en la colección de novedades
    const snapshot = await getDocs(novedadesCollection);
    const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Agrega cada novedad recibida como un nuevo documento
    for (const novedad of novedades.novedad) {
      const docRef = await addDoc(novedadesCollection, novedad);
    }
  } catch (error) {
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function deleteProducto(producto: Product) {
  try {
    // Referencia a la colección "productos"
    const productosCollection = collection(firestore, "productos");

    // Busca el producto en Firestore usando el productId
    const productQuery = query(
      productosCollection,
      where("productId", "==", producto.productId)
    );
    const querySnapshot = await getDocs(productQuery);

    if (!querySnapshot.empty) {
      // Obtén el primer documento que coincida con el productId y elimínalo
      const productDoc = querySnapshot.docs[0];
      await deleteDoc(doc(firestore, "productos", productDoc.id));
    } else {
      console.error(`Producto con ID ${producto.productId} no encontrado.`);
      throw new Error("Producto no encontrado en la base de datos.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}

export async function fetchAllNovedades(): Promise<Novedad[]> {
  try {
    // Referencia a la colección "novedades"
    const novedadesCollection = collection(firestore, "novedades");

    // Obtén todos los documentos de la colección
    const querySnapshot = await getDocs(novedadesCollection);

    // Mapea los documentos a objetos de tipo Novedad
    const novedades = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Novedad[];
    return novedades;
  } catch (error) {
    console.error("Error al obtener las novedades:", error);
    throw error; // Lanza el error para manejo adicional si es necesario
  }
}
