export class TelaCardapioMobile {
  quantidadeSacola = 0;

  itens = [
    { id: "smash-burger", nome: "Smash Burger" },
    { id: "batata", nome: "Batata" },
    { id: "refrigerante", nome: "Refrigerante" },
    { id: "milkshake", nome: "Milkshake" },
    { id: "cheeseburger", nome: "Cheeseburger" },
    { id: "nuggets", nome: "Nuggets" },
  ];

  adicionarItem() {
    this.quantidadeSacola++;
  }

  carregarMaisItens() {
    this.itens.push({
      id: `produto-${this.itens.length + 1}`,
      nome: "Novo produto",
    });
  }

  tipoTecladoTelefone() {
    return "phone-pad";
  }
}
