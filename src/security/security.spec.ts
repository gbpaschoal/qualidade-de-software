import { describe, it, expect } from "vitest";
import { loginSchema } from "./security";

describe("Segurança da Validação de Schema (Login)", () => {
  it("deve aceitar um payload válido e normalizar o e-mail", () => {
    const validPayload = {
      email: "  USER.TESTE@Domain.com ",
      password: "Password123",
    };

    const result = loginSchema.safeParse(validPayload);

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("user.teste@domain.com");
    }
  });
});
