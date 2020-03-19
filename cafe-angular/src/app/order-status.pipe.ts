import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus } from './order-status.enum';

@Pipe({
  name: 'ostatus'
})
export class OrderStatusPipe implements PipeTransform {

  transform(status: OrderStatus): string {
    let retStr = "Unknown";
    switch (status){
      case OrderStatus.Pending:
        retStr = "Order received and pending";
        break;
      case OrderStatus.Ready:
        retStr = "Order ready for pick-up/delivery";
        break;
      case OrderStatus.Completed:
        retStr = "Order successfully completed";
        break;
      case OrderStatus.Cancelled:
        retStr = "Order was cancelled";
        break;
    }

    return retStr;
  }

}
