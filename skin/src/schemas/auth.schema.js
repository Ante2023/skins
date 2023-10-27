import { z } from "zod";

export const schema = z.object({
  email: z
    .string({ required_error: "Email es requerido" })
    .email({ message: "Formato de Email incorrecto" }),
  password: z
    .string({ required_error: "Password es requerido" })
    .min(6, { message: "El Password tendrá 6 caracteres como mínimo" }),
});
