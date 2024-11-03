import { IProduct, ProductModel } from "../db/products"; // Asegúrate de que la ruta es correcta
import express, { Request, Response } from "express";

interface IProductRequest {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
export interface IProductS {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

class ProductController {
  // Método para obtener todos los productos
  getAllProducts = async (
    request: express.Request,
    response: express.Response,
  ): Promise<any> => {
    try {
      const products = await ProductModel.find();
      console.log(`products`);

      return response.status(200).json({ products });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Failed to retrieve products" });
    }
  };

  editProduct = async (request: Request, response: Response): Promise<any> => {
    const { id } = request.params; // Obtiene el ID del producto desde los parámetros de la URL
    const updates = request.body; // Obtiene los datos del producto desde el cuerpo de la solicitud

    try {
      const updatedProduct = await ProductModel.findOneAndUpdate(
        { id: Number(id) },
        updates, // Solo se actualizarán los campos que se envían en la solicitud
        { new: true, runValidators: true }, // Devuelve el producto actualizado y valida los campos
      );

      if (!updatedProduct) {
        return response.status(404).json({ message: "Product not found" });
      }

      return response.status(200).json({ product: updatedProduct });
    } catch (error) {
      return response.status(500).json({ error: "Failed to update product" });
    }
  };

  deleteProduct = async (
    request: Request,
    response: Response,
  ): Promise<any> => {
    const { id } = request.params; // Obtiene el ID de la URL

    try {
      const deletedProduct = await ProductModel.findOneAndDelete({
        id: Number(id),
      }); // Busca y elimina el producto por el campo `id`

      if (!deletedProduct) {
        return response.status(404).json({ message: "Product not found" });
      }

      return response
        .status(200)
        .json({ message: "Product deleted successfully" });
    } catch (error) {
      return response.status(500).json({ error: "Failed to delete product" });
    }
  };

  filterProducts = async (
    request: Request,
    response: Response,
  ): Promise<any> => {
    const { category, price, searchWord } = request.query; // Obtiene los parámetros de la query

    const filters: any = {}; // Crea un objeto vacío para los filtros

    // Verifica si la categoría está presente y la agrega al objeto de filtros
    if (category) {
      filters.category = category; // Filtra por categoría
    }

    // Verifica si el precio está presente y lo agrega al objeto de filtros
    if (price) {
      filters.price = { $lte: Number(price) }; // Filtra por precio menor o igual
    }

    // Verifica si la palabra de búsqueda está presente y la agrega al objeto de filtros
    if (typeof searchWord === "string" && searchWord.trim() !== "") {
      const regex = new RegExp(searchWord, "i"); // Crea una expresión regular (sin distinción de mayúsculas y minúsculas)
      filters.$or = [
        { title: regex },
        { description: regex },
        { brand: regex },
      ]; // Filtra por coincidencias en title, description o brand
    }

    try {
      // Busca productos según los filtros
      const products = await ProductModel.find(filters);

      // Devuelve los productos encontrados
      return response.status(200).json({ products });
    } catch (error) {
      return response
        .status(500)
        .json({ error: "Failed to retrieve products" });
    }
  };

  insertProduct = async (
    request: Request<{}, {}, IProductRequest>,
    response: Response,
  ): Promise<any> => {
    // Obtiene los datos del producto desde el cuerpo de la solicitud
    const productData: IProductS = {
      id: request.body.id,
      title: request.body.title,
      description: request.body.description,
      price: request.body.price,
      discountPercentage: request.body.discountPercentage,
      rating: request.body.rating,
      stock: request.body.stock,
      brand: request.body.brand,
      category: request.body.category,
      thumbnail: request.body.thumbnail,
      images: request.body.images,
    };

    // Crea un nuevo objeto de producto utilizando la interfaz
    const newProduct = new ProductModel(productData);

    try {
      // Guarda el nuevo producto en la base de datos
      const savedProduct = await newProduct.save();

      // Devuelve el producto insertado con un estado 201
      return response.status(201).json(savedProduct);
    } catch (error) {
      return response.status(500).json({ error: "Failed to insert product" });
    }
  };
}

export default new ProductController();
