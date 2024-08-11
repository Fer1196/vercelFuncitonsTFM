// api/update.ts

import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "PUT") {
    const { id } = req.query;
    const data = req.body;
    // Lógica para actualizar un recurso (ej. actualizar en una base de datos)
    res.status(200).json({ message: "Recurso actualizado ahora now", id, data });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
