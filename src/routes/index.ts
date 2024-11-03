import express from "express";
import ProductController from "../controllers/ProductController"; // Asegúrate de la ruta correcta

const router = express.Router();

// router.get("/products", async (req: express.Request, res: express.Response) => {
//   return await ProductController.getAllProducts(req, res);
// });

// Definir la ruta para editar un producto
router.put("/products/:id", ProductController.editProduct);

router.delete("/products/:id", ProductController.deleteProduct);

router.get("/products", ProductController.filterProducts);

router.post("/products", ProductController.insertProduct);

export default router;
