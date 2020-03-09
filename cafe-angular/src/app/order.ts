import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status.enum";
import { Review } from './review';

export class Order {
    customer: Customer;
    price: number;
    status: OrderStatus;
    orderItems: OrderItem[];
    review: Review;
}
