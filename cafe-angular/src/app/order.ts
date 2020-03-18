import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status.enum";
import { Review } from './review';
import {Customer} from './customer';
import {Address} from './address';

export class Order {
    id: number;
    customer: Customer;
    price: number;
    status: OrderStatus;
    orderItems: OrderItem[];
    review: Review;
    address: Address;
    orderTime: Date;
    lastActionTime: Date
}
