export interface OrderRequest {
  customerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  totalAmount: number;
}

export interface OrderResponse {
  status: "CONFIRMED";
}

export class OrderService {
  async placeOrder(order: OrderRequest): Promise<OrderResponse> {
    return { status: "CONFIRMED" };
  }
}
