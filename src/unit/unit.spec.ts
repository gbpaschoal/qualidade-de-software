import { describe, it, expect } from "vitest";

const totalPedido = (preco: number, taxaEntrega: number) => preco + taxaEntrega;

describe("Pedido", () => {
  it("calcula o total com taxa de entrega", () => {
    expect(totalPedido(30, 5)).toBe(35);
  });
});

const selecionarUnidade = (pedido: any, unidade: any) => {
  if (!unidade.disponivel) throw new Error("Unidade indisponível");
  return { ...pedido, unidade };
};

describe("Selecionar franquia/unidade", () => {
  it("deve associar a unidade disponível ao pedido", () => {
    const pedido = { id: "P001" };
    const unidade = { id: "U001", nome: "Franquia Centro", disponivel: true };

    const resultado = selecionarUnidade(pedido, unidade);

    expect(resultado.unidade).toEqual(unidade);
  });
});

const validarEstoque = (estoque: number, quantidade: number) => {
  if (quantidade > estoque) {
    throw new Error("Estoque insuficiente");
  }

  return true;
};

describe("Estoque insuficiente", () => {
  it("rejeita pedido quando a quantidade solicitada é maior que o estoque", () => {
    expect(() => validarEstoque(1, 2)).toThrow("Estoque insuficiente");
  });
});
