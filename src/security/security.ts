import { z } from "zod";

export const loginSchema = z
  .object({
    email: z
      .string({ required_error: "E-mail é obrigatório" })
      .trim()
      .toLowerCase()
      .email("Formato de e-mail inválido")
      .max(255, "E-mail excede o limite máximo permitido"),
    password: z
      .string({ required_error: "Senha é obrigatória" })
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .max(128, "Senha excede o limite máximo permitido")
      .regex(/[A-Z]/, "Senha deve conter ao menos uma letra maiúscula")
      .regex(/[a-z]/, "Senha deve conter ao menos uma letra minúscula")
      .regex(/[0-9]/, "Senha deve conter ao menos um número"),
  })
  .strict();

export type LoginInput = z.infer<typeof loginSchema>;
