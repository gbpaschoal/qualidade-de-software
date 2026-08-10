export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Order {
  customerId: string;
  items: Product[];
  total: number;
  paymentStatus: "APPROVED" | "DECLINED";
  status: "CONFIRMED" | "CANCELLED";
}

export class RestaurantSystem {
  private products: Product[] = [
    { id: "burger", name: "Smash Burger", price: 30 },
    { id: "fries", name: "Batata Frita", price: 15 },
  ];

  private paymentApproved = true;

  getProduct(id: string) {
    return this.products.find((product) => product.id === id);
  }

  setPaymentResult(status: "APPROVED" | "DECLINED"): void {
    this.paymentApproved = status === "APPROVED";
  }

  async createOrder(customerId: string, productIds: string[]): Promise<Order> {
    const items = productIds.map((id) => this.getProduct(id));

    if (items.some((item) => !item)) {
      throw new Error("Product not found");
    }

    const products = items as Product[];
    const total = products.reduce((sum, product) => sum + product.price, 0);

    const paymentStatus = this.paymentApproved ? "APPROVED" : "DECLINED";

    return {
      customerId,
      items: products,
      total,
      paymentStatus,
      status: paymentStatus === "APPROVED" ? "CONFIRMED" : "CANCELLED",
    };
  }
}
