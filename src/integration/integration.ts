export interface PaymentRequest {
  amount: number;
  currency: string;
  paymentMethodId: string;
}

export interface PaymentResponse {
  transactionId: string;
  status: "APPROVED" | "DECLINED";
  message?: string;
}

export class PaymentService {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    const response = await fetch(`${this.baseUrl}/v1/charges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw new Error(
        errorData.message || `Payment failed with status ${response.status}`,
      );
    }

    return (await response.json()) as PaymentResponse;
  }
}
