import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status.enum";

export class Order {
    customer: Customer;
    price: number;
    status: OrderStatus;
    orderItems: OrderItem[];
}
