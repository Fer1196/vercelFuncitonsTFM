// api/read.ts

import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "GET") {
    const { id } = req.query;
    // Lógica para leer un recurso (ej. obtener de una base de datos)
    res.status(200).json({ message: "Recurso leído por Vercel READINN NO MORE", id });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
