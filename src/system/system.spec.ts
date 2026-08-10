import { describe, it, expect, beforeEach } from "vitest";
import { RestaurantSystem } from "./system";

describe("Teste de Sistema - Fluxo Completo de Pedido", () => {
  let system: RestaurantSystem;

  beforeEach(() => {
    system = new RestaurantSystem();
  });

  it("deve concluir um pedido do início ao fim", async () => {
    const product = system.getProduct("burger");

    expect(product).toBeDefined();

    const order = await system.createOrder("customer_001", ["burger", "fries"]);

    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(45);
    expect(order.paymentStatus).toBe("APPROVED");
    expect(order.status).toBe("CONFIRMED");
  });

  it("deve cancelar o pedido quando o pagamento for recusado", async () => {
    system.setPaymentResult("DECLINED");

    const order = await system.createOrder("customer_002", ["burger"]);

    expect(order.paymentStatus).toBe("DECLINED");
    expect(order.status).toBe("CANCELLED");
  });
});
