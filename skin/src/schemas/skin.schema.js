import { z } from "zod";

export const skinSchema = z.object({
  nombre: z
    .string({ required_error: "El nombre es requerido" })
    .max(100, { message: "El nombre debe tener menos de 100 caracteres" }),
  tipo: z
    .string({ required_error: "El tipo es requerido" })
    .max(100, { message: "El tipo debe tener menos de 100 caracteres" }),
  precio: z
    .number({ required_error: "El precio es requerido" })
    .nonnegative(),
  color: z.string().optional(),
});

export const skinBuySchema = z.object({
    id_skin: z
    .number({ required_error: "El id de skin es requerido" })
    .nonnegative(),
});
