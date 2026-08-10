import { describe, test, expect, beforeEach } from "vitest";
import { TelaCardapioMobile } from "./mobile";

describe("Testes Mobile - Gestos e Comportamento", () => {
  let tela: TelaCardapioMobile;

  beforeEach(() => {
    tela = new TelaCardapioMobile();
  });

  test("deve adicionar item ao realizar toque no card", () => {
    tela.adicionarItem();

    expect(tela.quantidadeSacola).toBe(1);
  });

  test("deve carregar mais produtos ao realizar scroll", () => {
    tela.carregarMaisItens();

    expect(tela.itens.length).toBeGreaterThan(6);
  });

  test("deve utilizar teclado apropriado para telefone", () => {
    expect(tela.tipoTecladoTelefone()).toBe("phone-pad");
  });
});
