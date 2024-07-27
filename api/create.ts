// api/create.ts

import { VercelRequest, VercelResponse } from "@vercel/node";

export default (req: VercelRequest, res: VercelResponse) => {
  if (req.method === "POST") {
    const data = req.body;
    // Lógica para crear un recurso (ej. guardar en una base de datos)
    res
      .status(201)
      .json({ message: "Recurso creado Vercel modificado ahora mismos", data });
  } else {
    res.status(405).json({ message: "Método no permitido" });
  }
};
