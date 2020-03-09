import { Order } from './order';

export class Customer {
    id: number;
    first: String;
    last: String;
    stars: number;
    orders: Order[];
}
