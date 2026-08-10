export interface ItemMenu {
  id: string;
  nome: string;
  preco: number;
}

export interface ItemCarrinho {
  produtoId: string;
  quantidade: number;
}

export interface FilialRestaurante {
  id: string;
  nome: string;
  aberta: boolean;
  taxaEntregaFixa: number;
}

export class ProcessadorPedidoService {
  private cardapio: Map<string, ItemMenu> = new Map([
    ["prato_1", { id: "prato_1", nome: "Prato Nordestino", preco: 30.0 }],
    ["bebida_1", { id: "bebida_1", nome: "Suco Natural", preco: 10.0 }],
  ]);

  calcularTotalPedido(
    itens: ItemCarrinho[],
    filial: FilialRestaurante,
    cupom?: string,
  ) {
    if (!filial.aberta) {
      throw new Error("A filial selecionada está fechada no momento.");
    }

    if (itens.length === 0) {
      throw new Error("O carrinho não pode estar vazio.");
    }

    const subtotal = itens.reduce((acc, item) => {
      const produto = this.cardapio.get(item.produtoId);

      if (!produto) {
        throw new Error(`Produto ${item.produtoId} indisponível.`);
      }

      return acc + produto.preco * item.quantidade;
    }, 0);

    let desconto = 0;

    if (cupom === "REDE10") {
      desconto = subtotal * 0.1;
    }

    const taxaEntrega = filial.taxaEntregaFixa;
    const totalFinal = subtotal - desconto + taxaEntrega;

    return {
      subtotal,
      desconto,
      taxaEntrega,
      totalFinal,
    };
  }
}
