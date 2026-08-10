import { describe, test, expect, beforeEach } from "vitest";
import {
  ProcessadorPedidoService,
  FilialRestaurante,
  ItemCarrinho,
} from "./regression";

describe("Regressão: Regras de Negócio do Checkout de Pedidos", () => {
  let service: ProcessadorPedidoService;
  let filialAtiva: FilialRestaurante;

  beforeEach(() => {
    service = new ProcessadorPedidoService();

    filialAtiva = {
      id: "filial_centro",
      nome: "Unidade Centro",
      aberta: true,
      taxaEntregaFixa: 8.0,
    };
  });

  test("Deve manter o cálculo do total com cupom e taxa de entrega", () => {
    const carrinho: ItemCarrinho[] = [
      { produtoId: "prato_1", quantidade: 2 },
      { produtoId: "bebida_1", quantidade: 1 },
    ];

    const resultado = service.calcularTotalPedido(
      carrinho,
      filialAtiva,
      "REDE10",
    );

    expect(resultado.subtotal).toBe(70.0);
    expect(resultado.desconto).toBe(7.0);
    expect(resultado.taxaEntrega).toBe(8.0);
    expect(resultado.totalFinal).toBe(71.0);
  });

  test("Deve impedir pedidos quando a filial estiver fechada", () => {
    const filialFechada: FilialRestaurante = {
      ...filialAtiva,
      aberta: false,
    };

    const carrinho: ItemCarrinho[] = [{ produtoId: "burger_1", quantidade: 1 }];

    expect(() =>
      service.calcularTotalPedido(carrinho, filialFechada),
    ).toThrowError("A filial selecionada está fechada no momento.");
  });
});
