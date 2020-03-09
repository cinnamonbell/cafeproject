import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status.enum";
import { Review } from './review';
import {Customers} from './customers';
import {Address} from './address';

export class Order {
    customer: Customers;
    price: number;
    status: OrderStatus;
    orderItems: OrderItem[];
    review: Review;
    address: Address;
}
