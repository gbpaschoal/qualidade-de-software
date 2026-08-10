import { describe, it, expect, beforeEach } from "vitest";
import { OrderService, OrderRequest } from "./performance";

describe("Testes de Desempenho - Processamento de Pedido", () => {
  let orderService: OrderService;

  const SLA_MAX_MS = 2000;

  beforeEach(() => {
    orderService = new OrderService();
  });

  it("deve processar um pedido em menos de 2 segundos", async () => {
    const order: OrderRequest = {
      customerId: "usr_001",
      items: [{ productId: "prod_99", quantity: 1 }],
      totalAmount: 150,
    };

    const start = performance.now();
    const result = await orderService.placeOrder(order);
    const duration = performance.now() - start;

    expect(result.status).toBe("CONFIRMED");
    expect(duration).toBeLessThan(SLA_MAX_MS);
  }, 3000);

  it("deve processar 50 pedidos simultâneos com P95 abaixo de 2 segundos", async () => {
    const TOTAL_REQUESTS = 50;

    const orders: OrderRequest[] = Array.from(
      { length: TOTAL_REQUESTS },
      (_, i) => ({
        customerId: `user_${i}`,
        items: [{ productId: "prod_1", quantity: 2 }],
        totalAmount: 100,
      }),
    );

    const results = await Promise.all(
      orders.map(async (order) => {
        const start = performance.now();
        const response = await orderService.placeOrder(order);
        const duration = performance.now() - start;

        return { response, duration };
      }),
    );

    results.forEach(({ response, duration }) => {
      expect(response.status).toBe("CONFIRMED");
      expect(duration).toBeLessThan(SLA_MAX_MS);
    });

    const durations = results
      .map(({ duration }) => duration)
      .sort((a, b) => a - b);

    const p95Index = Math.ceil(durations.length * 0.95) - 1;
    const p95 = durations[p95Index];

    expect(p95).toBeLessThan(SLA_MAX_MS);
  }, 5000);
});
