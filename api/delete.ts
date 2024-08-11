// api/delete.ts

import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "DELETE") {
    const { id } = req.query;
    // Lógica para borrar un recurso (ej. eliminar de una base de datos)
    res.status(200).json({ message: "Recurso eliminado por Vercel", id });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
