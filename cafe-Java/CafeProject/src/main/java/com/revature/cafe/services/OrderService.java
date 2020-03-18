package com.revature.cafe.services;

import com.revature.cafe.beans.Order;
import java.util.List;


public interface OrderService {
    List<Order> getPendingOrders();
    Order updateOrder(Order order);
}
