import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { PaymentService } from "./integration";

describe("PaymentService - Testes de Integração", () => {
  let paymentService: PaymentService;

  const baseUrl = "https://api.mock-pagamentos.com";
  const apiKey = "test_sk_12345";

  beforeEach(() => {
    paymentService = new PaymentService(baseUrl, apiKey);
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("deve processar um pagamento aprovado", async () => {
    const responseData = {
      transactionId: "tx_abc123",
      status: "APPROVED",
    };

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => responseData,
    } as Response);

    const request = {
      amount: 150,
      currency: "BRL",
      paymentMethodId: "pm_card_visa",
    };

    const result = await paymentService.processPayment(request);

    expect(result).toEqual(responseData);

    expect(fetchSpy).toHaveBeenCalledWith(`${baseUrl}/v1/charges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(request),
    });
  });

  it("deve lançar erro quando o pagamento for recusado", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({
        message: "Insufficient funds",
      }),
    } as Response);

    await expect(
      paymentService.processPayment({
        amount: 9999,
        currency: "BRL",
        paymentMethodId: "pm_card_declined",
      }),
    ).rejects.toThrow("Insufficient funds");
  });

  it("deve propagar erro quando ocorrer uma falha de rede", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValueOnce(
      new TypeError("Failed to fetch"),
    );

    await expect(
      paymentService.processPayment({
        amount: 50,
        currency: "BRL",
        paymentMethodId: "pm_card_visa",
      }),
    ).rejects.toThrow("Failed to fetch");
  });
});
