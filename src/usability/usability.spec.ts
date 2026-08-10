import { describe, test, expect } from "vitest";
import { interfaceCardapio } from "./usability";

describe("Testes de Usabilidade e Acessibilidade", () => {
  const TAMANHO_MINIMO_ALVO_TOQUE_DP = 48;

  test("botão deve ter área mínima de toque de 48x48dp", () => {
    expect(interfaceCardapio.botaoFinalizar.altura).toBeGreaterThanOrEqual(
      TAMANHO_MINIMO_ALVO_TOQUE_DP,
    );

    expect(interfaceCardapio.botaoFinalizar.largura).toBeGreaterThanOrEqual(
      TAMANHO_MINIMO_ALVO_TOQUE_DP,
    );
  });

  test("imagem do produto deve possuir descrição acessível", () => {
    expect(interfaceCardapio.imagemSmashBurger.accessibilityLabel).toBe(
      "Hambúrguer artesanal Smash com duas carnes, queijo cheddar derretido e pão brioche",
    );
  });

  test("botão de remoção deve informar ação e contexto", () => {
    expect(interfaceCardapio.botaoRemover.accessibilityRole).toBe("button");

    expect(interfaceCardapio.botaoRemover.accessibilityLabel).toBe(
      "Remover Smash Burger do carrinho",
    );

    expect(interfaceCardapio.botaoRemover.accessibilityHint).toBe(
      "Dê um duplo toque para excluir este item",
    );
  });
});
