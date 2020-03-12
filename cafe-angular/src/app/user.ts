import { Customer } from './customer';
import { Employee } from './employee';

export class User {
    id: number;
    customer:Customer;
    employee:Employee;
    username: String;
    password: String;
}
